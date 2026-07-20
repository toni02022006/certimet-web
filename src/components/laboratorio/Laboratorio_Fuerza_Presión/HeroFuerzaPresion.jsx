import React from 'react';
import { Link } from 'react-router-dom';
import './HeroFuerzaPresion.css';

// --- IMPORTACIONES DE IMÁGENES ---
import laboratorioImg from '../../../image/laboratorio/DSC08101.jpeg';
import inacalLogo from '../../../image/laboratorio/nlds/inacal.webp'; 
import fondoHeroImg from '../../../image/laboratorio/FuerzapresiónMS.jpeg'; // Nueva imagen de fondo

const HeroFuerzaPresion = () => {
  return (
    <div className="fp-container-main">
      
      {/* ================= SECCIÓN BANNER CON IMAGEN DE FONDO ================= */}
      <section 
        className="fp-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="fp-hero-content">
          <h1 className="fp-title">
            Laboratorio de <br />
            <span className="text-neon-green">Fuerza y presión</span>
          </h1>
          <div className="fp-logo-container">
            <img src={inacalLogo} alt="Acreditación INACAL" className="inacal-logo" />
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="fp-intro-section">
        <div className="fp-intro-container">
          
          {/* Columna Izquierda: Texto y Botón */}
          <div className="fp-text-col">
            <p className="fp-description">
              <span className="text-blue-bold">
                El laboratorio de Fuerza y Presión de CERTIMET ofrece mantenimiento siguiendo los lineamientos de la norma ISO/IEC 17025
              </span>{' '}
              y cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de fuerza y presión. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender:
            </p>
            
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="fp-image-col">
            <img src={laboratorioImg} alt="Científico en Laboratorio de Fuerza y Presión" className="fp-scientist-img" />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroFuerzaPresion;