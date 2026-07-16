import React from 'react';
import { motion } from 'framer-motion'; // <-- Importamos Framer Motion
import './CertificadoAcreditacion.css';

// Importación de las imágenes
import certimetCer from '../../image/nosotros/certimetcer.jpg';
import coheteImg from '../../image/nosotros/cohete.png';

const CertificadoAcreditacion = () => {
  return (
    <>
      <section className="acreditacion-section">
        <div className="acreditacion-container">
          
          <div className="acreditacion-top-grid">
            {/* Animación: Entra desde la izquierda */}
            <motion.div 
              className="acreditacion-text-col"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <h2 className="acreditacion-title">
                <span className="title-light-blue">
                  Precisión<br />
                  reconocida,<br />
                  resultados<br />
                  confiables.<br />
                </span>
                <span className="title-dark-blue">
                  Acreditados<br />
                  por INACAL
                </span>
              </h2>
              <a href="#" className="btn-outline-blue">
                Nuestro alcance &rarr;
              </a>
            </motion.div>

            {/* Animación: Entra con un ligero zoom y difuminado */}
            <motion.div 
              className="acreditacion-img-col"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img 
                src={certimetCer} 
                alt="Certificado de Acreditación INACAL" 
                className="certificado-img"
              />
            </motion.div>
          </div>

          {/* Animación: Entra desde abajo */}
          <motion.div 
            className="acreditacion-bottom-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <p>
              Detrás de cada certificado de calibración hay un proceso riguroso, trazable y respaldado por la máxima autoridad metrológica del país. <span className="text-highlight-blue">INACAL nos ha acreditado bajo la norma ISO/IEC 17025:2017</span> en las magnitudes de <span className="text-highlight-blue">Masa, Temperatura, y Presión y Vacío,</span> reconociendo nuestra competencia técnica y la confiabilidad de nuestros resultados. Cada medición que entregamos cumple con procedimientos nacionales e internacionales bajo triple estándar ISO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 2: PROPÓSITO */}
      <section className="proposito-section">
        {/* Animación: El banner crece desde el centro */}
        <motion.div 
          className="proposito-banner"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="proposito-content">
            <h3>¿Nuestro Propósito?</h3>
            <p>
              Existimos para que la industria peruana opere con <span className="text-highlight-green">precisión, seguridad y confianza.</span> Cada servicio que brindamos contribuye a que las empresas alcancen estándares más altos.
            </p>
          </div>
          
          {/* Animación: El cohete vuela desde la esquina inferior izquierda y luego flota */}
          <motion.div
            className="cohete-wrapper" // Contenedor para la animación de entrada
            initial={{ opacity: 0, x: -150, y: 150 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img 
              src={coheteImg} 
              alt="Cohete espacial" 
              className="cohete-img float-animation" // Le agregamos la clase para que flote
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default CertificadoAcreditacion;