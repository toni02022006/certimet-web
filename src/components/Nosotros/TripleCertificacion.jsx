import React from 'react';
import { motion } from 'framer-motion';
import './TripleCertificacion.css';

// Importación de las homologaciones inferiores
import imgBureau from '../../image/homologations/BUREAU.webp';
import imgEin from '../../image/homologations/EIN-gris.png';
import imgHodelpe from '../../image/homologations/HODELPE.webp';
import imgSgs from '../../image/homologations/SGS.webp';

// Importación de los sellos ISO
import imgIso9001 from '../../image/homologations/ISO 9001.png';
import imgIso14001 from '../../image/homologations/ISO 14001.png';
import imgIso45001 from '../../image/homologations/ISO 45001.png'; 

const TripleCertificacion = () => {
  const logoVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
    })
  };

  // NUEVO: Animación infinita tipo moneda/casino
  const casinoVariants = {
    hidden: { opacity: 0, x: 30 }, 
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotateY: [0, 360], // Hace que dé una vuelta completa de 360 grados
      transition: {
        // La aparición inicial (opacidad y posición)
        opacity: { duration: 0.8, delay: i * 0.2 },
        x: { duration: 0.8, delay: i * 0.2 },
        
        // El bucle infinito del giro
        rotateY: {
          delay: 1 + (i * 0.3), // Empieza a girar en cascada después de aparecer
          duration: 1.5,        // Tarda 1.5 segundos en dar la vuelta
          repeat: Infinity,     // INFINITO
          repeatDelay: 4,       // Se detiene 4 segundos (para que se pueda leer) y vuelve a girar
          ease: "easeInOut"     // Hace que el giro acelere y desacelere suavemente
        }
      }
    })
  };

  return (
    <>
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
            
            <div className="triple-cert-header-wrapper">
              
              {/* LÍNEA 1: "Triple" + Medallas ISO en bucle infinito */}
              <div className="title-top-line">
                <h2>Triple</h2>
                <div className="iso-small-container">
                  {[imgIso9001, imgIso14001, imgIso45001].map((src, index) => (
                    <motion.div
                      key={index}
                      className="inline-sello-wrapper"
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                      variants={casinoVariants}
                      whileHover={{ scale: 1.15 }} // Al pasar el mouse crece un poquito
                    >
                      <img src={src} alt={`Sello ISO ${index}`} className="inline-sello-img" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* LÍNEA 2: "Certificación ISO" */}
              <h2 className="title-bottom-line">Certificación ISO</h2>
            </div>

            <p>
              La calidad en <strong className="text-blue-certimet">CERTIMET</strong> no es una promesa, es un sistema. Gracias al cofinanciamiento del Concurso Mypyme de Calidad de ProInnóvate y a nuestro compromiso con la mejora continua, <span className="highlight-blue">hemos alcanzado la triple certificación ISO</span> que respalda cada uno de nuestros procesos:
            </p>
            <a href="#" className="btn-outline-blue">
              Nuestras ISOS &rarr;
            </a>
          </motion.div>

        </div>
      </section>

      {/* SECCIÓN HOMOLOGACIONES */}
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
                custom={index}
                variants={logoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }} 
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TripleCertificacion;