import React from 'react';
import { motion } from 'framer-motion';
import './MisionVision.css';

// Importación de las imágenes 3D
import imgMision from '../../image/nosotros/MISION.png';
import imgVision from '../../image/nosotros/VISION.png';

const MisionVision = () => {
  return (
    <section className="mision-vision-section">
      <div className="mision-vision-container">
        
        {/* ================= BLOQUE 1: MISIÓN ================= */}
        <div className="mv-row">
          {/* Texto de la Misión (Entra desde la izquierda) */}
          <motion.div 
            className="mv-text-col"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="mv-title">Misión</h2>
            <p className="mv-desc">
              Brindamos soluciones tecnológicas en medición e ingeniería que impulsan la confiabilidad y competitividad de nuestros clientes mediante metrología, instrumentación y soporte técnico especializado. 
            </p>
          </motion.div>

          {/* Imagen de la Misión (Entra desde la derecha y luego flota) */}
          <motion.div 
            className="mv-image-col"
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img 
              src={imgMision} 
              alt="Misión CERTIMET - Diana 3D" 
              className="mv-img float-3d-delay-1" 
            />
          </motion.div>
        </div>

        {/* ================= BLOQUE 2: VISIÓN ================= */}
        <div className="mv-row reverse-row">
          {/* Imagen de la Visión (Entra desde la izquierda y luego flota) */}
          <motion.div 
            className="mv-image-col"
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img 
              src={imgVision} 
              alt="Visión CERTIMET - Foco 3D" 
              className="mv-img float-3d-delay-2" 
            />
          </motion.div>

          {/* Texto de la Visión (Entra desde la derecha) */}
          <motion.div 
            className="mv-text-col"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="mv-title">Visión</h2>
            <p className="mv-desc">
              Ser el socio estratégico de confianza en soluciones tecnológicas industriales, metrología e ingeniería, impulsando la innovación, la productividad y la competitividad en Latinoamérica.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MisionVision;