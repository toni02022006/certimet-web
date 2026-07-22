import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Ingenieria.css';

// =====================================================================
// IMPORTACIÓN DE IMÁGENES (Tus 2 fondos para Ingeniería)
// =====================================================================
import imgFondoBanner from '../image/ingenieria/imgfondobaner.jpeg';
import fondoNosotros from '../image/nosotros/nosotrosfondo.jpeg';

// =====================================================================
// IMPORTACIÓN DE COMPONENTES DE LA PÁGINA
// =====================================================================
import SolucionesIntegrales from '../components/ingenieria/SolucionesIntegrales';
import NuestrasSoluciones from '../components/ingenieria/NuestrasSoluciones';
import ServiciosIngenieria from '../components/ingenieria/ServiciosIngenieria';
import MarcasIngenieria from '../components/ingenieria/MarcasIngenieria';
import IntegradoresWeg from '../components/ingenieria/IntegradoresWeg';
import IntegradorAutorizado from '../components/ingenieria/IntegradorAutorizado';
import DescargasBanner from '../components/home/DescargasBanner';

// =====================================================================
// COMPONENTE ANIMACIÓN LETRA POR LETRA
// =====================================================================
const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  const variants = isGreen
    ? {
        hidden: { opacity: 0, y: 15, color: "#ffffff" },
        visible: { opacity: 1, y: 0, color: "#00e676", transition: { duration: 0.4 } } // Verde Certimet
      }
    : {
        hidden: { opacity: 0, y: 15, color: "#00e676" },
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
// DEFINICIÓN DE LOS 2 SLIDES PARA INGENIERÍA
// =====================================================================
// =====================================================================
// DEFINICIÓN DE LOS 2 SLIDES PARA INGENIERÍA
// =====================================================================
const slides = [
  {
    image: imgFondoBanner,
    titleParts: [
      { text: "Automatización", isGreen: false, lineBreak: true },
      { text: "que ", isGreen: false },
      { text: "impulsa", isGreen: true, lineBreak: true },
      { text: "tu industria", isGreen: true } // Ahora esto también es verde
    ],
    subtitle: "Optimizamos tus procesos industriales con tecnología de vanguardia, mejorando la eficiencia y el rendimiento de tu planta.",
    buttonText: "Contáctanos",
    overlay: 'left'
  },
  {
    image: fondoNosotros,
    titleParts: [
      { text: "Proyectos ", isGreen: false },
      { text: "integrales", isGreen: true, lineBreak: true },
      { text: "llave en mano", isGreen: false }
    ],
    subtitle: "Combinamos conocimiento técnico y experiencia estratégica para ofrecerte el ecosistema de soluciones más sólido del mercado.",
    buttonText: "Conoce nuestros servicios",
    overlay: 'left'
  }
];

const Ingenieria = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Scroll al tope al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Temporizador del carrusel (6 segundos)
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
    <div className="ingenieria-page">
      
      {/* =========================================================
          SECCIÓN HERO (Banner Carrusel Animado)
          ========================================================= */}
      <section className="hero-ing-section">
        
        {/* IMAGEN DE FONDO ANIMADA */}
        <div className="hero-ing-bg-wrapper">
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={currentSlide.image}
              alt="Certimet Ingeniería"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="hero-ing-bg-img"
            />
          </AnimatePresence>
        </div>

        {/* FLECHAS DE NAVEGACIÓN */}
        <button className="ing-carousel-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
        <button className="ing-carousel-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

        {/* CONTENEDOR DEL TEXTO */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={slideIndex}
            className="hero-ing-text-container-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* CAPA DE GRADIENTE AZUL SUPERPUESTA */}
            <div className={`hero-ing-gradient-overlay ${currentSlide.overlay === 'left' ? '' : 'overlay-right'}`}></div>
            
            <div className="hero-ing-content">
              <div className="hero-ing-text-box">
                
                {/* TÍTULO ANIMADO */}
                <motion.h1 
                  className="hero-ing-title"
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

                {/* SUBTÍTULO */}
                <motion.p 
                  className="hero-ing-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* BOTÓN */}
                <motion.div 
                  className="hero-ing-buttons-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <a href="/contacto" className="hero-ing-btn hero-ing-btn-primary">
                    {currentSlide.buttonText} &rarr;
                  </a>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BARRA DE PROGRESO INFERIOR */}
        <div className="hero-ing-progress-track">
          <motion.div 
            key={slideIndex}
            className="hero-ing-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </section>

      {/* =========================================================
          COMPONENTES DE LA PÁGINA INGENIERÍA
          ========================================================= */}
      <SolucionesIntegrales />
      <IntegradoresWeg />
      <NuestrasSoluciones />
      <ServiciosIngenieria />
      <MarcasIngenieria />
      <IntegradorAutorizado />
      <DescargasBanner />
      
    </div>
  );
};

export default Ingenieria;