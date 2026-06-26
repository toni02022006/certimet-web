import React from 'react';
import { motion } from 'framer-motion';
import './WhyCalibrate.css';

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
        
        {/* Lado Izquierdo: Imagen con marco desplazado */}
        <motion.div 
          className="why-calibrate-image-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} // Se repite al hacer scroll
          variants={imageReveal}
          style={{ perspective: 1000 }}
        >
          <img 
            /* 👇 Nueva imagen: Técnico de automatización trabajando en campo */
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" 
            alt="Ingeniería y Mantenimiento Industrial" 
            className="why-calibrate-image"
          />
        </motion.div>

        {/* Lado Derecho: Contenido de Texto */}
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
            ¿Cuándo vence tu<br />próxima calibración?
          </motion.h2>
          
          <motion.p variants={textReveal} className="why-calibrate-description">
            CERTIMET es un laboratorio especializado en calibración y reparación de 
            instrumentación de prueba, medición y control, respaldado por técnicos 
            altamente calificados y el cumplimiento de la Norma Técnica ISO/IEC 
            17025:2017 bajo triple estándar ISO.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyCalibrate;