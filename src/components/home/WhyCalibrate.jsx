import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WhyCalibrate.css';

import calibracionImg from '../../image/calibracioninicio.webp';

// Animaciones LIGERAS y FLUIDAS (sin blur, sin 3D)
// Optimizadas para ejecutarse varias veces (once: false) sin causar lag.
const imageSlide = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const textFadeSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const WhyCalibrate = () => {
  return (
    <section className="why-calibrate-section">
      <div className="why-calibrate-container">
        
        {/* COLUMNA IZQUIERDA (Imagen) - SOLO VISIBLE EN ESCRITORIO */}
        <motion.div 
          className="why-calibrate-image-wrapper desktop-only"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} /* Efecto activo al subir y bajar */
          variants={imageSlide}
        >
          <img 
            src={calibracionImg} 
            alt="Calibración Certimet" 
            className="why-calibrate-image"
          />
        </motion.div>

        {/* COLUMNA DERECHA (Texto, Imagen Móvil y Botón) */}
        <motion.div 
          className="why-calibrate-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} /* Efecto activo al subir y bajar */
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.span variants={textFadeSlide} className="why-calibrate-tag">
            POR QUÉ CALIBRAR
          </motion.span>
          
          <motion.h2 variants={textFadeSlide} className="why-calibrate-title">
            ¿Cuándo vence tu próxima calibración?
          </motion.h2>

          {/* IMAGEN INTERCALADA - SOLO VISIBLE EN MÓVIL */}
          <motion.div 
            className="why-calibrate-image-wrapper mobile-only"
            variants={imageSlide}
          >
            <img 
              src={calibracionImg} 
              alt="Calibración Certimet" 
              className="why-calibrate-image"
            />
          </motion.div>
          
          <motion.p variants={textFadeSlide} className="why-calibrate-description">
            Mantener tus instrumentos calibrados a tiempo es clave para garantizar la precisión de tus 
            procesos y el cumplimiento normativo. En CERTIMET te ayudamos a gestionar y cumplir 
            con tus periodos de calibración, respaldados por nuestra acreditación INACAL y técnicos 
            altamente calificados.
          </motion.p>

          <motion.div variants={textFadeSlide} className="why-calibrate-button-wrapper">
            <Link to="/laboratorio" className="why-calibrate-btn">
              Explora nuestro laboratorio &rarr;
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default WhyCalibrate;