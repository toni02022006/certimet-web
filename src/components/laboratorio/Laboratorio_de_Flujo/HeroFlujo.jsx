import React from 'react';
import { Link } from 'react-router-dom';
import './HeroFlujo.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/Flujo.webp';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/flujofondo.webp';

const HeroFlujo = () => {
  return (
    <div className="flujo-container-main">
      <section 
        className="flujo-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="flujo-hero-content">
          <h1 className="flujo-title">
            Laboratorio de <br />
            <span className="text-neon-green">Flujo</span>
          </h1>
        </div>
      </section>

      <section className="flujo-intro-section">
        <div className="flujo-intro-container">
          <div className="flujo-text-col">
            <p className="flujo-description">
              <span className="text-blue-bold">
                El laboratorio de Flujo CERTIMET
              </span>{' '}
              cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de caudal y volumen en diversos sectores. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>
          <div className="flujo-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Flujo" className="flujo-scientist-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroFlujo;