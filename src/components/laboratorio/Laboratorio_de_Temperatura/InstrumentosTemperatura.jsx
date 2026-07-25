import React, { useState } from 'react';
import './InstrumentosTemperatura.css';

// --- SERVICIOS ACREDITADOS (tarjetas) ---
const acreditadosData = [
  {
    titulo: "Termómetro digital",
    alcance: "-30 °C a 80 °C"
  }
  // Si hubiera más, se agregan aquí
];

// --- SERVICIOS DE CALIBRACIÓN (lista) ---
const calibracionData = [
  "Autoclaves con control de temperatura",
  "Baños de temperatura",
  "Bloques secos de calibración",
  "Cámaras climáticas",
  "Cámaras termográficas",
  "Celdas patrón de temperatura",
  "Chiller de laboratorio",
  "Data loggers de temperatura",
  "Estufas de secado",
  "Higrómetros con medición de temperatura",
  "Hornos de calibración",
  "Incubadoras de laboratorio",
  "Medidores de temperatura en fluidos",
  "Prómetro",
  "Registradores de temperatura",
  "Sensores de temperatura ambientales",
  "Sensores de temperatura para procesos industriales",
  "Termoanemómetro",
  "Termocuplas tipo K, J, T, E, N, R, S, B",
  "Termómetros de contacto",
  "Termómetros de lectura de alta precisión",
  "Termómetros digitales",
  "Termómetros infrarrojos",
  "Termómetros industriales",
  "Termómetros patrón de referencia",
  "Termoresistencia",
  "Termostato",
  "Transmisores de temperatura y más"
];

// Ícono SVG para viñetas (círculo doble verde)
const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="#00d859"/>
  </svg>
);

const InstrumentosTemperatura = () => {
  const [openAcreditados, setOpenAcreditados] = useState(true);
  const [openCalibracion, setOpenCalibracion] = useState(true);

  return (
    <section className="inst-section">
      <div className="inst-container">

        {/* Título principal */}
        <h2 className="inst-main-title">
          Equipos e instrumentos <span className="text-green">que calibramos</span>
        </h2>

        {/* ============================================================
            SECCIÓN 1: SERVICIOS ACREDITADOS (tarjetas)
            ============================================================ */}
        <div className="inst-accordion-group">
          <div
            className="inst-accordion-header"
            onClick={() => setOpenAcreditados(!openAcreditados)}
          >
            <h3>Nuestros servicios acreditados</h3>
            <span className="inst-toggle-icon">{openAcreditados ? '−' : '+'}</span>
          </div>

          <div className={`inst-collapse ${openAcreditados ? 'open' : ''}`}>
            <div className="inst-inner">
              <div className="inst-cards-container">
                {acreditadosData.map((item, index) => (
                  <div key={index} className="inst-card">
                    <h4 className="card-title">{item.titulo}</h4>
                    <div className="card-info">
                      <p>
                        <strong>Alcance de calibración:</strong>
                        <br />
                        {item.alcance}
                      </p>
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

        {/* ============================================================
            SECCIÓN 2: SERVICIOS DE CALIBRACIÓN (lista)
            ============================================================ */}
        <div className="inst-accordion-group">
          <div
            className="inst-accordion-header"
            onClick={() => setOpenCalibracion(!openCalibracion)}
          >
            <h3>Nuestros servicios de calibración</h3>
            <span className="inst-toggle-icon">{openCalibracion ? '−' : '+'}</span>
          </div>

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

export default InstrumentosTemperatura;