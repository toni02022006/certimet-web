import React from 'react';
import { motion } from 'framer-motion';
import './WhyCalibrate.css';

// Importación de tu nueva imagen
import calibracionImg from '../../image/calibracioninicio.jpeg';

// 1. ANIMACIÓN PARA LA IMAGEN (Entra desde la izquierda)
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

// 2. ANIMACIÓN PARA LOS TEXTOS (Entran desde la derecha en cascada)
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
        
        {/* Lado Izquierdo: Imagen limpia con bordes redondeados */}
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

        {/* Lado Derecho: Contenido de Texto Actualizado */}
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
        </motion.div>

      </div>
    </section>
  );
};

export default WhyCalibrate;