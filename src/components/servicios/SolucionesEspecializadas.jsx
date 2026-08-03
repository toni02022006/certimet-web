import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SolucionesEspecializadas.css';

// Importamos la imagen desde la ruta que indicaste
import imgServicio from '../../image/servicios/servicio1.webp';

const SolucionesEspecializadas = () => {
  return (
    <section className="soluciones-especializadas-section">
      <div className="soluciones-especializadas-container">
        
        {/* ==========================================
            COLUMNA IZQUIERDA: TEXTO
            ========================================== */}
        <motion.div 
          className="soluciones-text-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="soluciones-title">
            Soluciones técnicas<br />
            integrales para <span className="soluciones-title-bold">el<br />
            cuidado de tu<br />
            instrumentación</span>
          </h2>
          
          <p className="soluciones-description">
            Más allá de la calibración, en CERTIMET acompañamos a 
            nuestros clientes con servicios especializados que garan
            tizan el correcto funcionamiento, la conservación y la tra
            zabilidad de sus equipos e instalaciones a lo largo del 
            tiempo.
          </p>
          
          <Link to="/contacto" className="soluciones-btn-outline">
            Contáctanos <span className="arrow-icon">&rarr;</span>
          </Link>
        </motion.div>

        {/* ==========================================
            COLUMNA DERECHA: IMAGEN
            ========================================== */}
        <motion.div 
          className="soluciones-image-content"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src={imgServicio} 
            alt="Ingeniero de Certimet realizando mantenimiento" 
            className="soluciones-img"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default SolucionesEspecializadas;