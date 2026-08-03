import React from 'react';
import { Link } from 'react-router-dom';
import './HeroTiempoFrecuencia.css';

// --- IMPORTACIONES DE IMÁGENES ---
import laboratorioImg from '../../../image/laboratorio/sublaboratorios/Tiempo_Frecuencia.webp';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/tiempo.webp';

const HeroTiempoFrecuencia = () => {
  return (
    <div className="tf-container-main">
      
      {/* ================= SECCIÓN BANNER CON IMAGEN DE FONDO ================= */}
      <section 
        className="tf-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="tf-hero-content">
          <h1 className="tf-title">
            Laboratorio de <br />
            <span className="text-neon-green">Tiempo y Frecuencia</span>
          </h1>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="tf-intro-section">
        <div className="tf-intro-container">
          
          {/* Columna Izquierda: Texto y Botón */}
          <div className="tf-text-col">
            <p className="tf-description">
              <span className="text-blue-bold">
                El laboratorio de Tiempo y Frecuencia CERTIMET
              </span>{' '}
              cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de intervalos de tiempo y señales de frecuencia. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="tf-image-col">
            <img src={laboratorioImg} alt="Técnico en Laboratorio de Tiempo y Frecuencia" className="tf-scientist-img" />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroTiempoFrecuencia;