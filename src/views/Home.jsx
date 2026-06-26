import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importación de imágenes locales
import fondo1 from '../image/FONDO1.jpg.jpeg';
import bannerAcreditacion from '../image/banner-web-acreditacion copia.webp';

// IMPORTACIÓN EXACTA DE COMPONENTES
import QuienesSomos from '../components/layout/QuienesSomos';
import Certifications from '../components/home/Certifications';
import Solutions from '../components/home/Solutions';
import WhyCalibrate from '../components/home/WhyCalibrate';
import Methodology from '../components/home/Methodology';
import Logos from '../components/home/Logos';

// Importación de Estilos
import './Home.css';

// =====================================================================
// COMPONENTE PARA ANIMAR LETRA POR LETRA CON CAMBIO DE COLOR
// =====================================================================
const AnimatedWord = ({ text, isGreen }) => {
  const letters = Array.from(text);
  
  const variants = isGreen
    ? {
        hidden: { opacity: 0, y: 15, color: "#ffffff" }, 
        visible: { opacity: 1, y: 0, color: "#1cff57", transition: { duration: 0.4 } } 
      }
    : {
        hidden: { opacity: 0, y: 15, color: "#1cff57" }, 
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
  const heroImages = [fondo1, bannerAcreditacion];

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
              style={{ objectFit: bgIndex === 0 ? "cover" : "contain" }}
            />
          </AnimatePresence>
        </div>

        <button className="carousel-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

        <AnimatePresence>
          {bgIndex === 0 && (
            <motion.div 
              className="hero-text-container-absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                </div>
              </div>
            </motion.div>
          )}
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

      {/* CONTENEDOR EN BLOQUE PARA EVITAR QUE EL FOOTER SE SUBA */}
      <main className="home-body-flow">
        
        {/* NUESTRA NUEVA SECCIÓN */}
        <QuienesSomos />
        
        {/* CREDENCIALES */}
        <Certifications />
        {/* NUESTRAS SOLUCIONES */}
        <Solutions />
        {/* ⬅️ POR QUÉ CALIBRAR */}
        <WhyCalibrate />
        {/* ⬅️ NUEVA METODOLOGÍA */}
        <Methodology />
        {/* ⬅️ NUESTRAS ALIANZAS */}
        <Logos />

      </main>
      
    </div>
  );
};

export default Home;