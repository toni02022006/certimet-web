import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Imagen
import fondoNosotros from '../image/nosotros/nosotrosfondo.jpeg';

// ✅ Importación del componente separado ¿Quiénes somos?
import QuienesSomos from '../components/Nosotros/QuienesSomos';
import CertificadoAcreditacion from '../components/nosotros/CertificadoAcreditacion';
import TripleCertificacion from '../components/nosotros/TripleCertificacion';
import MisionVision from '../components/nosotros/MisionVision';
import NuestrosValores from '../components/nosotros/NuestrosValores';
// Estilos
import './Nosotros.css';

// ✅ Animación igual a HeroTienda
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
            transformOrigin: "center"
          }}
          className={isGreen ? "text-green" : "text-white"}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ✅ Componente con ORDEN EXACTO igual a la imagen
const Nosotros = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const heroImages = [fondoNosotros, fondoNosotros];

  useEffect(() => {
    const timer = setInterval(() => setBgIndex(p => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const next = () => setBgIndex(p => (p + 1) % heroImages.length);
  const prev = () => setBgIndex(p => (p - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="nosotros-master-wrapper">
      <section className="nosotros-hero-section">

        {/* Fondo */}
        <div className="nosotros-hero-bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={bgIndex}
              src={heroImages[bgIndex]}
              alt="Nosotros Certimet"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
              className="nosotros-hero-img"
            />
          </AnimatePresence>
        </div>

        {/* Flechas */}
        <button className="carousel-arrow left" onClick={prev}>&#10094;</button>
        <button className="carousel-arrow right" onClick={next}>&#10095;</button>

        {/* Texto con orden y salto de línea EXACTO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            className="nosotros-hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="nosotros-hero-title">
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
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Barra de progreso */}
        <div className="nosotros-progress">
          <motion.div
            key={bgIndex}
            className="nosotros-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>

      </section>

      {/* ✅ Se agrega el componente separado al final */}
      <QuienesSomos />
      <CertificadoAcreditacion />
      <TripleCertificacion />
      <MisionVision />
      <NuestrosValores />
    </div>
  );
};

export default Nosotros;