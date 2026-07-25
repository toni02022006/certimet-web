import React from 'react';
import { Link } from 'react-router-dom';
import './HeroMasa.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/masa.png';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/Masafondo.jpeg';
import inacalLogo from '../../../image/laboratorio/nlds/inacal.webp';

const HeroMasa = () => {
  return (
    <div className="masa-container-main">
      
      {/* ================= SECCIÓN BANNER CON IMAGEN DE FONDO ================= */}
      <section 
        className="masa-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="masa-hero-content">
          <h1 className="masa-title">
            Laboratorio de <br />
            <span className="text-neon-green">Masa</span>
          </h1>
          <div className="masa-logo-container">
            <img src={inacalLogo} alt="Acreditación INACAL" className="inacal-logo" />
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="masa-intro-section">
        <div className="masa-intro-container">
          
          {/* Columna Izquierda: Texto y Botón */}
          <div className="masa-text-col">
            <p className="masa-description">
              <span className="text-blue-bold">
                El laboratorio de Masa CERTIMET ofrece mantenimiento siguiendo los lineamientos de ISO/IEC 17025
              </span>{' '}
              y cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de masa y pesaje en diversos sectores. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="masa-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Masa" className="masa-scientist-img" />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroMasa;