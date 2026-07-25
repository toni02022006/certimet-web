import React from 'react';
import { Link } from 'react-router-dom';
import './HeroHumedad.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/Humedad.png';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/humedad.jpeg';

const HeroHumedad = () => {
  return (
    <div className="hum-container-main">
      <section 
        className="hum-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="hum-hero-content">
          <h1 className="hum-title">
            Laboratorio de <br />
            <span className="text-neon-green">Humedad</span>
          </h1>
        </div>
      </section>

      <section className="hum-intro-section">
        <div className="hum-intro-container">
          <div className="hum-text-col">
            <p className="hum-description">
              <span className="text-blue-bold">
                El laboratorio de Humedad CERTIMET
              </span>{' '}
              cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición de humedad en gases, sólidos y líquidos para diversos sectores industriales. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>
          <div className="hum-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Humedad" className="hum-scientist-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroHumedad;