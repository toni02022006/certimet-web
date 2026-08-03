import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BeneficiosServicios.css';

// RUTAS DE IMÁGENES (Ajusta si están en otras carpetas)
import imgMensaje from '../../image/laboratorio/msdefyp.webp';
import imgCientifico from '../../image/servicios/servicio2.webp';

const BeneficiosServicios = () => {
  return (
    <section className="bs-section">
      <div className="bs-container">
        
        {/* ==========================================
            1. BANNER SUPERIOR CON IMAGEN 3D
            ========================================== */}
        <div className="bs-banner-wrapper">
          <div className="bs-banner">
            <div className="bs-banner-content">
              <h3>¿Necesitas soporte técnico especializado?<br/>
              <span className="bs-banner-light">En CERTIMET podemos ayudarte</span></h3>
              <Link to="/contacto" className="btn-consulte">
                Consulte aquí &rarr;
              </Link>
            </div>
            
            {/* Imagen 3D sobresaliendo */}
            <img src={imgMensaje} alt="Consulte aquí" className="bs-banner-img" />
          </div>
        </div>

        {/* ==========================================
            2. SECCIÓN INFERIOR: IMAGEN Y TEXTO
            ========================================== */}
        <div className="bs-content-split">
          
          {/* Columna Izquierda: Imagen del Científico */}
          <motion.div 
            className="bs-image-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={imgCientifico} 
              alt="Especialista Certimet" 
              className="bs-img-fade" 
            />
          </motion.div>

          {/* Columna Derecha: Textos y Botón */}
          <motion.div 
            className="bs-text-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="bs-title">
              ¿Necesitas calibrar<br />
              tus instrumentos<br />
              de medición?
            </h2>
            
            <p className="bs-description">
              Conoce nuestro Laboratorio de Metrología y Calibración, acreditado por INACAL bajo la norma ISO/IEC 17025:2017.
            </p>
            
            <Link to="/laboratorio" className="btn-outline-blue">
              Todos nuestros laboratorios &rarr;
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default BeneficiosServicios;