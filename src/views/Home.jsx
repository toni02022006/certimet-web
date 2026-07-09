import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importación de imágenes locales
import fondo1 from '../image/FONDO1.jpg.jpeg';
import inacalImg from '../image/baners/baners_inicio/inacal.jpg.jpeg';
import laboraImg from '../image/baners/baners_inicio/Labora.jpg.jpeg';
import ecommerceImg from '../image/baners/baners_inicio/Ecommerce.jpg.jpeg';
import serviciosImg from '../image/baners/baners_inicio/Servicios.jpg.jpeg';
import qrImg from '../image/baners/baners_inicio/Objeto inteligente vectorial.png';

// ÍCONO DE WHATSAPP
import iconWp from '../image/icons/whatsapp.webp';

// Componentes
import ClientesCarousel from '../components/home/ClientesCarousel'; 
import QuienesSomos from '../components/layout/QuienesSomos';
import Certifications from '../components/home/Certifications';
import Solutions from '../components/home/Solutions';
import WhyCalibrate from '../components/home/WhyCalibrate';
import Methodology from '../components/home/Methodology';
import Logos from '../components/home/Logos';
import DescargasBanner from '../components/home/DescargasBanner';
import BlogCarousel from '../components/home/BlogCarousel';

import './Home.css';

// =====================================================================
// COMPONENTE ANIMACIÓN LETRA POR LETRA
// =====================================================================
const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  const variants = isGreen
    ? {
        hidden: { opacity: 0, y: 15, color: "#ffffff" },
        visible: { opacity: 1, y: 0, color: "#00ff3c", transition: { duration: 0.4 } }
      }
    : {
        hidden: { opacity: 0, y: 15, color: "#00ff3c" },
        visible: { opacity: 1, y: 0, color: "#ffffff", transition: { duration: 0.4 } }
      };

  return (
    <span style={{ display: "inline-block", whiteSpace: "pre" }} className={isGreen ? "text-green-light" : ""}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={variants} style={{ display: "inline-block" }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// =====================================================================
// DEFINICIÓN DE SLIDES
// =====================================================================
const slides = [
  {
    image: fondo1,
    titleParts: [
      { text: "Precisión", isGreen: false, lineBreak: true },
      { text: "que ", isGreen: false },
      { text: "certifica,", isGreen: true, lineBreak: true },
      { text: "Ingeniería", isGreen: false, lineBreak: true },
      { text: "que ", isGreen: false },
      { text: "transforma", isGreen: true }
    ],
    subtitle: "Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
    showButtons: true,
    textPosition: 'left',
    overlay: 'left',   // gradiente de izquierda a derecha
    qrImage: null
  },
  {
    image: inacalImg,
    titleParts: [
      { text: "Excelencia", isGreen: true, lineBreak: false },
      { text: " de siempre, ahora", isGreen: false, lineBreak: true },
      { text: "Acreditados", isGreen: true, lineBreak: false },
      { text: " por INACAL con la", isGreen: false, lineBreak: true },
      { text: "NTP-ISO/IEC 17025:2017", isGreen: false }
    ],
    subtitle: "Garantizamos el cumplimiento de estándares de calidad reconocidos a nivel nacional e internacional",
    showButtons: false,     // SIN BOTONES
    textPosition: 'left',
    overlay: 'left',
    qrImage: qrImg          // QR CON FONDO BLANCO
  },
  {
    image: laboraImg,
    titleParts: [
      { text: "Precisión", isGreen: true, lineBreak: false },
      { text: " acreditada", isGreen: false, lineBreak: true },
      { text: "en cada medición", isGreen: true, lineBreak: false }
    ],
    subtitle: "Conoce nuestros servicios",
    showButtons: true,
    textPosition: 'left',
    overlay: 'left',
    qrImage: null
  },
  {
    image: ecommerceImg,
    titleParts: [
      { text: "Equipa", isGreen: true, lineBreak: false },
      { text: " tu industria", isGreen: false, lineBreak: true },
      { text: "con los mejores", isGreen: true, lineBreak: false },
      { text: " instrumentos", isGreen: false }
    ],
    subtitle: "Descubre nuestro catálogo",
    showButtons: true,
    textPosition: 'right',   // TEXTO A LA DERECHA
    overlay: 'none',         // SIN OVERLAY (fondo transparente)
    qrImage: null
  },
  {
    image: serviciosImg,
    titleParts: [
      { text: "Garantizamos", isGreen: true, lineBreak: false },
      { text: " el cumplimiento", isGreen: false, lineBreak: true },
      { text: "de estándares", isGreen: true, lineBreak: false },
      { text: " de calidad", isGreen: false }
    ],
    subtitle: "Reconocidos a nivel nacional e internacional",
    showButtons: true,
    textPosition: 'right',   // TEXTO A LA DERECHA
    overlay: 'right',        // GRADIENTE DE DERECHA A IZQUIERDA
    qrImage: null
  }
];

// =====================================================================
// COMPONENTE PRINCIPAL HOME
// =====================================================================
const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[slideIndex];

  return (
    <div className="home-master-wrapper">
      
      {/* SECCIÓN HERO */}
      <section className="hero-section">
        
        <div className="hero-bg-wrapper">
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={currentSlide.image}
              alt="Certimet Carrusel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="hero-bg-img"
              style={{ objectFit: "cover" }}
            />
          </AnimatePresence>
        </div>

        {/* FLECHAS */}
        <button className="carousel-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

        <AnimatePresence mode="wait">
          <motion.div 
            key={slideIndex}
            className="hero-text-container-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* OVERLAY CON DIRECCIÓN DINÁMICA */}
            <div className={`hero-gradient-overlay 
              ${currentSlide.overlay === 'right' ? 'hero-gradient-overlay-right' : ''} 
              ${currentSlide.overlay === 'none' ? 'hero-gradient-overlay-none' : ''}`}>
            </div>
            
            <div className={`hero-content ${currentSlide.textPosition === 'right' ? 'hero-content-right' : 'hero-content-left'}`}>
              <div className="hero-text-box">
                <motion.h1 
                  className="hero-title"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }} 
                >
                  {currentSlide.titleParts.map((part, idx) => (
                    <React.Fragment key={idx}>
                      <AnimatedWord text={part.text} isGreen={part.isGreen} />
                      {part.lineBreak && <br />}
                    </React.Fragment>
                  ))}
                </motion.h1>

                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* QR (solo si existe) */}
                {currentSlide.qrImage && (
                  <div className="hero-qr-container">
                    <img src={currentSlide.qrImage} alt="QR" className="hero-qr-img" />
                  </div>
                )}

                {/* BOTONES (condicional) */}
                {currentSlide.showButtons && (
                  <motion.div 
                    className="hero-buttons-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                  >
                    <button className="hero-btn hero-btn-primary">
                      Agenda una visita &rarr;
                    </button>
                    <button className="hero-btn hero-btn-secondary">
                      <img src={iconWp} alt="WhatsApp" />
                      Escríbenos &rarr;
                    </button>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-progress-track">
          <motion.div 
            key={slideIndex}
            className="hero-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </section>

      <ClientesCarousel />

      <main className="home-body-flow">
        <QuienesSomos />
        <Certifications />
        <Solutions />
        <WhyCalibrate />
        <Methodology />
        <Logos />
        <BlogCarousel />
        <DescargasBanner />
      </main>
      
    </div>
  );
};

export default Home;