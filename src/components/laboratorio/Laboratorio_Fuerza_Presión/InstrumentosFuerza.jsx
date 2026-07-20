import React, { useState } from 'react';
import './InstrumentosFuerza.css';

const acreditadosData = [
  {
    titulo: "Vacuómetro analógico",
    alcance: "-0,9 bar a 700 bar",
    clase: "≥ 0,2 %F.S."
  },
  {
    titulo: "Manómetro analógico",
    alcance: "-0,9 bar a 700 bar",
    clase: "≥ 0,2 %F.S."
  },
  {
    titulo: "Manovacuómetro analógico",
    alcance: "-0,9 bar a 700 bar",
    clase: "≥ 0,2 %F.S."
  }
];

const calibracionData = [
  "Bancos de calibración de torque",
  "Barómetros",
  "Bombas de presión",
  "Bombas de vacío",
  "Bombas de succión",
  "Calibradores e indicadores de presión",
  "Controladores de presión",
  "Dinamómetros mecánicos y digitales",
  "Estaciones Meteorológicas",
  "Medidor de presión",
  "Medidor de vacío",
  "Prensas y pistones hidráulicas y neumáticas",
  "Registradores y transductor de presión",
  "Sensores de presión absoluta, fuerza, diferencial y relativa",
  "Termocupla",
  "Torquímetro",
  "Transductores de presión",
  "Transductores de torque"
];

// Ícono SVG para las viñetas (Círculo doble verde)
const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="#00d859"/>
  </svg>
);

const InstrumentosFuerza = () => {
  // Estados inicializados en 'true' para que se muestren abiertos al cargar
  const [openAcreditados, setOpenAcreditados] = useState(true);
  const [openCalibracion, setOpenCalibracion] = useState(true);

  return (
    <section className="inst-section">
      <div className="inst-container">
        
        {/* Título Principal */}
        <h2 className="inst-main-title">
          Equipos e instrumentos <span className="text-green">que calibramos</span>
        </h2>

        {/* =========================================================
            SECCIÓN 1: SERVICIOS ACREDITADOS
            ========================================================= */}
        <div className="inst-accordion-group">
          {/* Cabecera Clickable */}
          <div 
            className="inst-accordion-header" 
            onClick={() => setOpenAcreditados(!openAcreditados)}
          >
            <h3>Nuestros servicios acreditados</h3>
            <span className="inst-toggle-icon">{openAcreditados ? '-' : '+'}</span>
          </div>

          {/* Contenido Desplegable */}
          <div className={`inst-collapse ${openAcreditados ? 'open' : ''}`}>
            <div className="inst-inner">
              <div className="inst-cards-container">
                {acreditadosData.map((item, index) => (
                  <div key={index} className="inst-card">
                    <h4 className="card-title">{item.titulo}</h4>
                    
                    <div className="card-info">
                      <p><strong>Alcance de calibración:</strong><br/>{item.alcance}</p>
                      <p><strong>Clase de exactitud:</strong><br/>{item.clase}</p>
                    </div>

                    <div className="card-footer">
                      <em>SERVICIO ACREDITADO</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECCIÓN 2: SERVICIOS DE CALIBRACIÓN
            ========================================================= */}
        <div className="inst-accordion-group">
          {/* Cabecera Clickable */}
          <div 
            className="inst-accordion-header" 
            onClick={() => setOpenCalibracion(!openCalibracion)}
          >
            <h3>Nuestros servicios de calibración</h3>
            <span className="inst-toggle-icon">{openCalibracion ? '-' : '+'}</span>
          </div>

          {/* Contenido Desplegable */}
          <div className={`inst-collapse ${openCalibracion ? 'open' : ''}`}>
            <div className="inst-inner">
              <ul className="inst-list">
                {calibracionData.map((item, index) => (
                  <li key={index} className="inst-list-item">
                    <BulletIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstrumentosFuerza;