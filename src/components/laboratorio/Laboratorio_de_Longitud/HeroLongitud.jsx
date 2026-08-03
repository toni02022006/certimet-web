import React from 'react';
import { Link } from 'react-router-dom';
import './HeroLongitud.css';

// --- IMPORTACIONES DE IMÁGENES ---
import laboratorioImg from '../../../image/laboratorio/sublaboratorios/longitud.webp';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/longitudfondo.webp';

const HeroLongitud = () => {
  return (
    <div className="long-container-main">
      
      {/* ================= SECCIÓN BANNER CON IMAGEN DE FONDO ================= */}
      <section 
        className="long-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="long-hero-content">
          <h1 className="long-title">
            Laboratorio de <br />
            <span className="text-neon-green">Longitud</span>
          </h1>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="long-intro-section">
        <div className="long-intro-container">
          
          {/* Columna Izquierda: Texto y Botón */}
          <div className="long-text-col">
            <p className="long-description">
              <span className="text-blue-bold">
                El laboratorio de Longitud CERTIMET
              </span>{' '}
              cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de dimensiones y geometría en diversos sectores. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="long-image-col">
            <img src={laboratorioImg} alt="Técnico en Laboratorio de Longitud" className="long-scientist-img" />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroLongitud;