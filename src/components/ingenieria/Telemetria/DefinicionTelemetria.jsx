import React from 'react';
import './DefinicionTelemetria.css';

// --- IMPORTACIÓN DE IMÁGENES ---
import imgPersona from '../../../image/ingenieria/img1.webp';
import imgBrochure from '../../../image/descarga3.webp';

const DefinicionTelemetria = () => {
  const caracteristicas = [
    {
      id: 1,
      titulo: "Sensores y Data Loggers",
      descripcion: "Captura de variables físicas en campo."
    },
    {
      id: 2,
      titulo: "Gateways IoT & Comunicaciones",
      descripcion: "Transmisión segura vía MQTT, 4G, LoRaWAN."
    },
    {
      id: 3,
      titulo: "Dashboards & Nube",
      descripcion: "Visualización y análisis centralizado."
    }
  ];

  return (
    <section className="dt-section">
      
      {/* =========================================================
          PARTE SUPERIOR: TEXTOS E IMAGEN
          ========================================================= */}
      <div className="dt-container">
        
        {/* Columna Izquierda: Textos y Lista */}
        <div className="dt-text-col">
          <h2 className="dt-title">
            ¿Qué es la<br />
            Telemetría Industrial<br />
            y por qué es clave<br />
            en la Industria 4.0?
          </h2>
          
          <p className="dt-description">
            La telemetría industrial es una tecnología que permite
            recopilar, transmitir y monitorear datos en tiempo real
            desde sensores y equipos ubicados en campo hacia
            plataformas centralizadas para su análisis y gestión.
          </p>

          <div className="dt-features-list">
            {caracteristicas.map((item) => (
              <div className="dt-feature-item" key={item.id}>
                <div className="dt-icon-circle">
                  {/* Icono de apretón de manos / tecnología simplificado */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="dt-feature-text">
                  <h4 className="dt-feature-title">{item.titulo}</h4>
                  <p className="dt-feature-desc">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Imagen */}
        <div className="dt-img-col">
          <img 
            src={imgPersona} 
            alt="Ingeniero en planta - Telemetría" 
            className="dt-img" 
          />
        </div>
      </div>

      {/* =========================================================
          PARTE INFERIOR: BANNER DE DESCARGA
          ========================================================= */}
      <div className="dt-banner-wrapper">
        <div className="dt-banner">
          <div className="dt-banner-content">
            <h3 className="dt-banner-title">
              Descarga nuestro brochure de <br />
              <span className="dt-text-green">Sistemas de Telemetría</span>
            </h3>
          </div>
          
          <img 
            src={imgBrochure} 
            alt="Brochure Sistemas de Telemetría" 
            className="dt-banner-brochure-img" 
          />
        </div>
      </div>

    </section>
  );
};

export default DefinicionTelemetria;