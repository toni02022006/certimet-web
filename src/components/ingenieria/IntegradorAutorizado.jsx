import React from 'react';
import { Link } from 'react-router-dom';
import './IntegradorAutorizado.css';

// Importación de las imágenes exactas con tus rutas
import imgPersona from '../../image/ingenieria/img3.png';
import imgLogo from '../../image/ingenieria/img5.png';

const IntegradorAutorizado = () => {
  return (
    <section className="ia-section">
      <div className="ia-container">
        
        {/* COLUMNA IZQUIERDA: Imagen del Ingeniero */}
        <div className="ia-left">
          <img 
            src={imgPersona} 
            alt="Ingeniero operando panel de control" 
            className="ia-main-img" 
          />
        </div>

        {/* COLUMNA DERECHA: Textos y Logo */}
        <div className="ia-right">
          {/* Logo WEG (img5.png) */}
          <img src={imgLogo} alt="Logo WEG Integradores Oficiales" className="ia-logo" />
          
          <h2 className="ia-title">
            <span className="ia-title-light">Integrador Autorizado</span><br />
            <span className="ia-title-bold">WEG PERU</span>
          </h2>
          
          <p className="ia-desc">
            <span className="ia-text-bold">WEG</span> es una empresa global y está considerada como uno de
            los principales fabricantes mundiales de motores eléctricos
            energéticamente eficientes, automatización, transmisión de
            energía, tecnologías de recursos renovables, generación de
            energía solar, biomasa y eólica, equipos de distribución y recu-
            brimientos y barnices industriales.
          </p>
          
          {/* Botón */}
          <Link to="/certificado" className="ia-btn">
            Conoce nuestro certificado <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default IntegradorAutorizado;