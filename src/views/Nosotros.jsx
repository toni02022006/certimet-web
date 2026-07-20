import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import fondoNosotros from '../image/nosotros/nosotrosfondo.jpeg';
import inacalImg from '../image/baners/baners_inicio/inacal.jpg.jpeg';
import qrImg from '../image/baners/baners_inicio/Objeto inteligente vectorial.png';

import QuienesSomos from '../components/Nosotros/QuienesSomos';
import CertificadoAcreditacion from '../components/nosotros/CertificadoAcreditacion';
import TripleCertificacion from '../components/nosotros/TripleCertificacion';
import MisionVision from '../components/nosotros/MisionVision';
import NuestrosValores from '../components/nosotros/NuestrosValores';
import TalentoCultura from '../components/Nosotros/TalentoCultura';
import CompromisoPoliticas from '../components/laboratorio/CompromisoPoliticas';
import ConoceLaboratorios from '../components/laboratorio/ConoceLaboratorios';

import './Nosotros.css';

// ============================================================
// ANIMACIÓN DEL SLIDE ORIGINAL (letras girando)
// ============================================================
const AnimatedLine360 = ({ text, delayOffset = 0, isGreen = false }) => {
  const letters = Array.from(text);

  return (
    <motion.span
      className="nosotros-line"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delayOffset } }
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, rotateY: 360, scale: 0.5 },
            visible: {
              opacity: 1,
              rotateY: 0,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            transformOrigin: "center",
            verticalAlign: "baseline"
          }}
          className={isGreen ? "text-green" : "text-white"}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============================================================
// ANIMACIÓN DEL SLIDE DE INACAL (con alineación vertical corregida)
// ============================================================
const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  const variants = isGreen
    ? {
        hidden: { opacity: 0, scale: 0.8, color: "#ffffff" },
        visible: { opacity: 1, scale: 1, color: "#00ff3c", transition: { duration: 0.4 } }
      }
    : {
        hidden: { opacity: 0, scale: 0.8, color: "#00ff3c" },
        visible: { opacity: 1, scale: 1, color: "#ffffff", transition: { duration: 0.4 } }
      };

  return (
    <span style={{ display: "inline-block", whiteSpace: "pre", verticalAlign: "baseline" }} className={isGreen ? "text-green" : "text-white"}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          style={{
            display: "inline-block",
            verticalAlign: "baseline",
            lineHeight: 1.2
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// ============================================================
// DEFINICIÓN DE SLIDES
// ============================================================
const slides = [
  {
    image: fondoNosotros,
    useLine360: true,
    subtitle: "",
    qrImage: null
  },
  {
    image: inacalImg,
    useLine360: false,
    subtitle: "Garantizamos el cumplimiento de estándares de calidad reconocidos a nivel nacional e internacional",
    qrImage: qrImg
  }
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
const Nosotros = () => {
  const location = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[slideIndex];

  return (
    <div className="nosotros-master-wrapper">
      <section className="nosotros-hero-section">

        <div className="nosotros-hero-bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={currentSlide.image}
              alt="Carrusel Nosotros"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
              className="nosotros-hero-img"
            />
          </AnimatePresence>
        </div>

        <button className="carousel-arrow left" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-arrow right" onClick={nextSlide}>&#10095;</button>

        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            className="nosotros-hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="nosotros-hero-title">
              {currentSlide.useLine360 ? (
                // Slide 1: original
                <>
                  <span className="line-block">
                    <AnimatedLine360 text="Más de " delayOffset={0.2} />
                    <AnimatedLine360 text="6 años" delayOffset={0.2} isGreen />
                  </span>
                  <span className="line-block">
                    <AnimatedLine360 text="impulsando la" delayOffset={1.0} />
                  </span>
                  <span className="line-block">
                    <AnimatedLine360 text="confianza en" delayOffset={1.8} />
                  </span>
                  <span className="line-block">
                    <AnimatedLine360 text="cada " delayOffset={2.6} />
                    <AnimatedLine360 text="medición." delayOffset={2.6} isGreen />
                  </span>
                </>
              ) : (
                // Slide 2: INACAL con líneas bien alineadas
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                  style={{ display: 'block' }}
                >
                  <span className="line-block">
                    <AnimatedWord text="Excelencia" isGreen={true} />
                    <AnimatedWord text=" de siempre, ahora" isGreen={false} />
                  </span>
                  <span className="line-block">
                    <AnimatedWord text="Acreditados" isGreen={true} />
                    <AnimatedWord text=" por INACAL con la" isGreen={false} />
                  </span>
                  <span className="line-block">
                    <AnimatedWord text="NTP-ISO/IEC 17025:2017" isGreen={false} />
                  </span>
                </motion.div>
              )}
            </h1>

            {currentSlide.subtitle && (
              <motion.p 
                className="nosotros-hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {currentSlide.subtitle}
              </motion.p>
            )}

            {currentSlide.qrImage && (
              <div className="nosotros-hero-qr-container">
                <img src={currentSlide.qrImage} alt="QR" className="nosotros-hero-qr-img" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="nosotros-progress">
          <motion.div
            key={slideIndex}
            className="nosotros-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </section>

      <QuienesSomos />
      <div id="acreditacion"><CertificadoAcreditacion /></div>
      <div id="triple"><TripleCertificacion /></div>
      <MisionVision />
      <NuestrosValores />
      <TalentoCultura />
      <CompromisoPoliticas />
      <ConoceLaboratorios />
    </div>
  );
};

export default Nosotros;