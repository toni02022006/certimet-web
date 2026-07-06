import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroTienda.css';

// Importa tu banner
import bannerWeg from '../../image/BANNER WEB PRODUCTOS WEG.webp';

// =====================================================================
// COMPONENTE PARA ANIMAR LETRA POR LETRA (Giro 360º)
// =====================================================================
const AnimatedLine360 = ({ text, delayOffset }) => {
  const letters = Array.from(text);
  
  return (
    <motion.div
      className="hero-tienda-line"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delayOffset } }
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, rotateY: 360, scale: 0.5 },
            visible: { 
              opacity: 1, 
              rotateY: 0, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" } 
            }
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL
// =====================================================================
const HeroTienda = () => {
  const [bgIndex, setBgIndex] = useState(0);
  
  // Duplicamos la imagen para crear el efecto de bucle
  const heroImages = [bannerWeg, bannerWeg];

  // Temporizador de 6 segundos
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroImages.length]);

  const nextSlide = () => setBgIndex((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setBgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="hero-tienda-section">
      
      {/* IMAGEN DE FONDO */}
      <div className="hero-tienda-bg-wrapper">
        <AnimatePresence mode="wait">
          <motion.img
            key={bgIndex}
            src={heroImages[bgIndex]}
            alt="Productos web"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.8 }}
            className="hero-tienda-bg-img"
          />
        </AnimatePresence>
      </div>

      {/* CONTROLES (Flechas) */}
      <button className="tienda-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="tienda-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

      {/* CONTENIDO (Textos y Botón) */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={bgIndex} // La llave hace que la animación se repita
          className="hero-tienda-content-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-tienda-text-box">
            
            <div className="hero-tienda-titles">
              <AnimatedLine360 text="Productos web para" delayOffset={0.2} />
              <AnimatedLine360 text="Sistemas de Automatización y" delayOffset={1.0} />
              <AnimatedLine360 text="Control de Procesos" delayOffset={2.2} />
            </div>

            <motion.button 
              className="hero-tienda-btn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
            >
              VER PRODUCTOS
            </motion.button>
            
          </div>
        </motion.div>
      </AnimatePresence>

      {/* BARRA DE PROGRESO AZUL CLARA */}
      <div className="hero-tienda-progress-track">
        <motion.div 
          key={bgIndex}
          className="hero-tienda-progress-fill"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

    </section>
  );
};

export default HeroTienda;