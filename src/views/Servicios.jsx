import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Servicios.css';

// =====================================================================
// IMPORTACIÓN DE IMÁGENES
// =====================================================================
import bannerServicios from '../image/baners/baners_inicio/Servicios.webp';
import fondoNosotros from '../image/nosotros/nosotrosfondo.webp';
import SolucionesEspecializadas from '../components/servicios/SolucionesEspecializadas';
import ListaServicios from '../components/servicios/ListaServicios';
import BeneficiosServicios from '../components/servicios/BeneficiosServicios';
import GestionCalibraciones from '../components/laboratorio/GestionCalibraciones';

// =====================================================================
// COMPONENTE ANIMACIÓN LETRA POR LETRA (IDÉNTICO A HOME)
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
// SLIDES DE SERVICIOS
// =====================================================================
const slides = [
  {
    image: bannerServicios,
    titleParts: [
      { text: "Soporte técnico ", isGreen: true, lineBreak: true },
      { text: "integral ", isGreen: false },
      { text: "para tu ", isGreen: false, lineBreak: true },
      { text: "industria", isGreen: false }
    ],
    subtitle: "Garantizamos la máxima operatividad y confiabilidad operacional de sus equipos a través de servicios técnicos especializados e integrales.",
    buttonText: "Cotizar Servicios",
    overlay: 'right',      // gradiente de derecha a izquierda
    textPosition: 'right'  // texto alineado a la derecha
  },
  {
    image: fondoNosotros,
    titleParts: [
      { text: "Mantenimiento ", isGreen: false },
      { text: "especializado", isGreen: true, lineBreak: true },
      { text: "y diagnóstico", isGreen: false }
    ],
    subtitle: "Contamos con personal altamente capacitado y tecnología de vanguardia para asegurar la continuidad de tus procesos.",
    buttonText: "Contáctanos",
    overlay: 'left',
    textPosition: 'left'
  }
];

// =====================================================================
// COMPONENTE PRINCIPAL
// =====================================================================
const Servicios = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="servicios-page">
      <section className="hero-servicios-section">
        
        {/* ============================================================
            FONDO ANIMADO CON EFECTO CINEMÁTICO (FLUIDO TIPO VIDEO)
            ============================================================ */}
        <div className="hero-servicios-bg-wrapper">
          {/* Eliminamos mode="wait" para fundido cruzado continuo */}
          <AnimatePresence>
            <motion.img
              key={slideIndex}
              src={currentSlide.image}
              alt="Certimet Servicios"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" }
              }}
              className="hero-servicios-bg-img"
            />
          </AnimatePresence>
        </div>

        {/* ============================================================
            FLECHAS (ESTILO HOME)
            ============================================================ */}
        <button className="carousel-arrow left-arrow" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>
          &#10095;
        </button>

        {/* ============================================================
            CONTENIDO TEXTUAL CON ANIMACIÓN
            ============================================================ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            className="hero-servicios-text-container-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Overlay con dirección dinámica */}
            <div
              className={`hero-servicios-gradient-overlay 
                ${currentSlide.overlay === 'right' ? 'overlay-right' : ''} 
                ${currentSlide.overlay === 'none' ? 'overlay-none' : ''}`}
            ></div>

            {/* Contenedor del texto (usa las mismas clases que Home) */}
            <div
              className={`hero-content ${currentSlide.textPosition === 'right' ? 'hero-content-right' : 'hero-content-left'}`}
            >
              <div className="hero-text-box">
                <motion.h1
                  className="hero-servicios-title"
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
                  className="hero-servicios-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {currentSlide.subtitle}
                </motion.p>

                <motion.div
                  className="hero-buttons-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <a href="/contacto" className="hero-btn hero-btn-primary">
                    {currentSlide.buttonText} &rarr;
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ============================================================
            BARRA DE PROGRESO INFERIOR (CON ANIMACIÓN)
            ============================================================ */}
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

      {/* Aquí irán los demás componentes de Servicios (si los hay) */}
      <SolucionesEspecializadas />
      <ListaServicios />
      <BeneficiosServicios />
      <GestionCalibraciones />
    </div>
  );
};

export default Servicios;