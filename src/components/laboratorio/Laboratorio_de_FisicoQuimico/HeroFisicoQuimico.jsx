import React from 'react';
import { Link } from 'react-router-dom';
import './HeroFisicoQuimico.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/FisicoQuimico.png';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/FisQuim.jpeg';

const HeroFisicoQuimico = () => {
  return (
    <div className="fq-container-main">
      <section 
        className="fq-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="fq-hero-content">
          <h1 className="fq-title">
            Laboratorio de <br />
            <span className="text-neon-green">Físico-Químico</span>
          </h1>
        </div>
      </section>

      <section className="fq-intro-section">
        <div className="fq-intro-container">
          <div className="fq-text-col">
            <p className="fq-description">
              <span className="text-blue-bold">
                El laboratorio de fisicoquímica CERTIMET
              </span>{' '}
              calibra equipos para el análisis de calidad del agua, aplicando procedimientos normalizados para medir parámetros como pH, conductividad, oxígeno disuelto, turbidez y redox. Contamos con tecnología avanzada para proporcionar servicios de calibración que usted necesite. Conoce algunos de los instrumentos que podemos atender.
            </p>
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>
          <div className="fq-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Físico-Químico" className="fq-scientist-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroFisicoQuimico;