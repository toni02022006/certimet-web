import React from 'react';
import { Link } from 'react-router-dom';
import './HeroTemperatura.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/Temperatura.webp';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/temperaturafondo.webp';
import inacalLogo from '../../../image/laboratorio/nlds/inacal.webp';

const HeroTemperatura = () => {
  return (
    <div className="temp-container-main">
      
      {/* ================= BANNER CON LOGO INACAL ================= */}
      <section 
        className="temp-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="temp-hero-content">
          <h1 className="temp-title">
            Laboratorio de <br />
            <span className="text-neon-green">Temperatura</span>
          </h1>
          <div className="temp-logo-container">
            <img src={inacalLogo} alt="Acreditación INACAL" className="inacal-logo" />
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="temp-intro-section">
        <div className="temp-intro-container">
          <div className="temp-text-col">
            <p className="temp-description">
              <span className="text-blue-bold">
                El laboratorio de Temperatura CERTIMET ofrece mantenimiento siguiendo los lineamientos de ISO/IEC 17025
              </span>{' '}
              y cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición y control de temperatura en diversos sectores industriales. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender:
            </p>
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>
          <div className="temp-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Temperatura" className="temp-scientist-img" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HeroTemperatura;