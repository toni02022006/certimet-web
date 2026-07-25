import React, { useState } from 'react';
import './InstrumentosHumedad.css';

const calibracionData = [
  "Analizadores de humedad por infrarrojo",
  "Balanzas de humedad (termogravimétricas)",
  "Barotermohigrómetro",
  "Cámaras climáticas",
  "Cámara de refrigeración vertical",
  "Cartuchos generadores de humedad",
  "Celdas patrón de humedad",
  "Equipos de calibración de humedad para laboratorios",
  "Estufas de secado para determinación de humedad",
  "Generadores de humedad",
  "Higrómetros capacitivos",
  "Higrómetros de espejo enfriado",
  "Higrómetros de punto de rocío",
  "Hidrómetro",
  "Medidores de humedad en aceites",
  "Medidores de humedad en combustibles",
  "Medidores de humedad en madera",
  "Medidores de humedad en materiales de construcción",
  "Medidores de humedad en papel y cartón",
  "Medidores de humedad en productos farmacéuticos",
  "Medidores de humedad en solventes",
  "Medidores de humedad en suelos",
  "Medidores de humedad para granos",
  "Multiparámetro de condiciones ambientales",
  "Psicrómetros de aspersión",
  "Psicrómetros digitales",
  "Registradores de humedad",
  "Sensores de humedad para aplicaciones meteorológicas",
  "Sensores de humedad relativa",
  "Termohigrómetros"
];

const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosHumedad = () => {
  const [open, setOpen] = useState(true);
  return (
    <section className="inst-section">
      <div className="inst-container">
        <h2 className="inst-main-title">
          Equipos e instrumentos <span className="text-green">que calibramos</span>
        </h2>
        <div className="inst-accordion-group">
          <div className="inst-accordion-header" onClick={() => setOpen(!open)}>
            <h3>Nuestros servicios de calibración</h3>
            <span className="inst-toggle-icon">{open ? '−' : '+'}</span>
          </div>
          <div className={`inst-collapse ${open ? 'open' : ''}`}>
            <div className="inst-inner">
              <ul className="inst-list">
                {calibracionData.map((item, i) => (
                  <li key={i} className="inst-list-item">
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

export default InstrumentosHumedad;