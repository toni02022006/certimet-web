import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importación de imágenes locales
import fondo1 from '../image/FONDO1.jpg.jpeg';

// IMPORTACIÓN DEL ÍCONO DE WHATSAPP NUEVO
import iconWp from '../image/icons/whatsapp.webp';

// IMPORTACIÓN EXACTA DE COMPONENTES
import ClientesCarousel from '../components/home/ClientesCarousel'; 
import QuienesSomos from '../components/layout/QuienesSomos';
import Certifications from '../components/home/Certifications';
import Solutions from '../components/home/Solutions';
import WhyCalibrate from '../components/home/WhyCalibrate';
import Methodology from '../components/home/Methodology';
import Logos from '../components/home/Logos';
import DescargasBanner from '../components/home/DescargasBanner';
import BlogCarousel from '../components/home/BlogCarousel';

// Importación de Estilos
import './Home.css';

// =====================================================================
// COMPONENTE PARA ANIMAR LETRA POR LETRA CON CAMBIO DE COLOR
// =====================================================================
const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  
  // Usamos el nuevo verde luminoso #00ff3c
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
// COMPONENTE PRINCIPAL HOME
// =====================================================================
const Home = () => {
  const [bgIndex, setBgIndex] = useState(0);
  
  // 🔥 TRUCO: Usamos la misma imagen dos veces para que el carrusel cicle y repita el efecto
  const heroImages = [fondo1, fondo1];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [bgIndex, heroImages.length]);

  const nextSlide = () => setBgIndex((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setBgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="home-master-wrapper">
      
      {/* SECCIÓN HERO PRINCIPAL */}
      <section className="hero-section">
        
        <div className="hero-bg-wrapper">
          <AnimatePresence mode="wait">
            <motion.img
              key={bgIndex}
              src={heroImages[bgIndex]}
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

        {/* 🔥 FLECHAS RESTAURADAS 🔥 */}
        <button className="carousel-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

        <AnimatePresence mode="wait">
          <motion.div 
            key={bgIndex} /* ESTA LLAVE HACE QUE EL EFECTO DE TEXTO SE REPITA EN CADA SLIDE */
            className="hero-text-container-absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* El overlay está oculto por CSS, no te preocupes */}
            <div className="hero-gradient-overlay"></div>
            
            <div className="hero-content">
              <div className="hero-text-box">
                <motion.h1 
                  className="hero-title"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }} 
                >
                  <AnimatedWord text="Precisión" isGreen={false} /> <br />
                  <AnimatedWord text="que " isGreen={false} />
                  <AnimatedWord text="certifica," isGreen={true} /> <br />
                  <AnimatedWord text="Ingeniería" isGreen={false} /> <br />
                  <AnimatedWord text="que " isGreen={false} />
                  <AnimatedWord text="transforma" isGreen={true} />
                </motion.h1>

                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                </motion.p>

                {/* BOTONES */}
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

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-progress-track">
          <motion.div 
            key={bgIndex}
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