import React from 'react';
import { Link } from 'react-router-dom';
import './HeroFotometriaAcustica.css';

import laboratorioImg from '../../../image/laboratorio/sublaboratorios/Fotometria_Acustica.png';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/Fotometria.jpeg';

const HeroFotometriaAcustica = () => {
  return (
    <div className="foa-container-main">
      <section 
        className="foa-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="foa-hero-content">
          <h1 className="foa-title">
            Laboratorio de <br />
            <span className="text-neon-green">Fotometría y Acústica</span>
          </h1>
        </div>
      </section>

      <section className="foa-intro-section">
        <div className="foa-intro-container">
          <div className="foa-text-col">
            <p className="foa-description">
              <span className="text-blue-bold">
                El laboratorio de Fotometría y Acústica CERTIMET
              </span>{' '}
              contamos con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en el control de iluminación, ruido y vibraciones. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>
          <div className="foa-image-col">
            <img src={laboratorioImg} alt="Laboratorio de Fotometría y Acústica" className="foa-scientist-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroFotometriaAcustica;