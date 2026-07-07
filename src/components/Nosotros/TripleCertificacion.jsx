import React from 'react';
import { motion } from 'framer-motion';
import './TripleCertificacion.css';

// Importación de las nuevas imágenes de homologaciones
import imgBureau from '../../image/homologations/BUREAU.webp';
import imgEin from '../../image/homologations/EIN-gris.png';
import imgHodelpe from '../../image/homologations/HODELPE.webp';
import imgSgs from '../../image/homologations/SGS.webp';

const TripleCertificacion = () => {
  // Variantes para la animación en cascada de los logos
  const logoVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Cada logo entra un poco después del anterior
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      {/* SECCIÓN 1: TRIPLE CERTIFICACIÓN */}
      <section className="triple-cert-section">
        <div className="triple-cert-container">
          
          {/* COLUMNA IZQUIERDA: Video */}
          <motion.div 
            className="triple-cert-video-col"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="video-responsive">
              <iframe 
                src="https://www.youtube.com/embed/yGzRN6klB0M" 
                title="CERTIMET Certificación Trinorma" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: Texto */}
          <motion.div 
            className="triple-cert-text-col"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2>
              Triple<br />
              Certificación ISO
            </h2>
            <p>
              {/* CORRECCIÓN: Palabra CERTIMET en azul */}
              La calidad en <strong className="text-blue-certimet">CERTIMET</strong> no es una promesa, es un sistema. Gracias al cofinanciamiento del Concurso Mypyme de Calidad de ProInnóvate y a nuestro compromiso con la mejora continua, <span className="highlight-blue">hemos alcanzado la triple certificación ISO</span> que respalda cada uno de nuestros procesos:
            </p>
            <a href="#" className="btn-outline-blue">
              Nuestro alcance &rarr;
            </a>
          </motion.div>

        </div>
      </section>

      {/* SECCIÓN 2: HOMOLOGACIONES */}
      <section className="homologaciones-section">
        <div className="homologaciones-container">
          <motion.h3 
            className="homologaciones-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.8 }}
          >
            Nuestras Homologaciones
          </motion.h3>

          <div className="homologaciones-grid">
            {[imgBureau, imgEin, imgHodelpe, imgSgs].map((src, index) => (
              <motion.img 
                key={index}
                src={src} 
                alt={`Homologación ${index + 1}`} 
                className="homologacion-logo"
                custom={index} // Se usa para calcular el delay de la cascada
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }} // Efecto al pasar el mouse
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TripleCertificacion;