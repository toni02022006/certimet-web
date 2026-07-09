import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import laboraImg from '../../image/baners/baners_inicio/Labora.jpg.jpeg';

const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  const variants = isGreen
    ? {
        hidden: { opacity: 0, y: 15, color: '#ffffff' },
        visible: { opacity: 1, y: 0, color: '#00ff3c', transition: { duration: 0.4 } }
      }
    : {
        hidden: { opacity: 0, y: 15, color: '#00ff3c' },
        visible: { opacity: 1, y: 0, color: '#ffffff', transition: { duration: 0.4 } }
      };

  return (
    <span style={{ display: 'inline-block', whiteSpace: 'pre' }} className={isGreen ? 'text-green-light' : ''}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={variants} style={{ display: 'inline-block' }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroLaboratorio = () => {
  const [index, setIndex] = useState(0);
  const slides = [laboraImg]; // Solo una imagen

  useEffect(() => {
    // Si quieres un carrusel con múltiples imágenes, aquí agregas lógica
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-wrapper">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index]}
            alt="Laboratorio CERTIMET"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="hero-bg-img"
            style={{ objectFit: 'cover' }}
          />
        </AnimatePresence>
      </div>

      <div className="hero-text-container-absolute">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-content hero-content-left">
          <div className="hero-text-box">
            <motion.h1
              className="hero-title"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            >
              <AnimatedWord text="Precisión" isGreen={false} /><br />
              <AnimatedWord text="acreditada" isGreen={true} /><br />
              <AnimatedWord text="en " isGreen={false} />
              <AnimatedWord text="cada" isGreen={false} /><br />
              <AnimatedWord text="medición" isGreen={true} />
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Laboratorio de metrología y calibración con acreditación INACAL NTP-ISO/IEC 17025
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLaboratorio;