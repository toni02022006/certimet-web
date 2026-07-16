import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // ← Importa Link
import './WhyCalibrate.css';

import calibracionImg from '../../image/calibracioninicio.jpeg';

// Animaciones (igual que antes)
const imageReveal = {
  hidden: { opacity: 0, x: -40, scale: 0.95, rotateY: -10, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const textReveal = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const WhyCalibrate = () => {
  return (
    <section className="why-calibrate-section">
      <div className="why-calibrate-container">
        
        {/* Imagen */}
        <motion.div 
          className="why-calibrate-image-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={imageReveal}
          style={{ perspective: 1000 }}
        >
          <img 
            src={calibracionImg} 
            alt="Calibración Certimet" 
            className="why-calibrate-image"
          />
        </motion.div>

        {/* Contenido de texto */}
        <motion.div 
          className="why-calibrate-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.span variants={textReveal} className="why-calibrate-tag">
            POR QUÉ CALIBRAR
          </motion.span>
          
          <motion.h2 variants={textReveal} className="why-calibrate-title">
            ¿Cuándo vence<br />tu próxima<br />calibración?
          </motion.h2>
          
          <motion.p variants={textReveal} className="why-calibrate-description">
            Mantener tus instrumentos calibrados a tiempo es clave para garantizar la precisión de tus 
            procesos y el cumplimiento normativo. En CERTIMET te ayudamos a gestionar y cumplir 
            con tus periodos de calibración, respaldados por nuestra acreditación INACAL y técnicos 
            altamente calificados.
          </motion.p>

          {/* NUEVO BOTÓN */}
          <motion.div variants={textReveal} className="why-calibrate-button-wrapper">
            <Link to="/laboratorio" className="why-calibrate-btn">
              Explora nuestro laboratorio
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default WhyCalibrate;