import React, { useState } from 'react';
import './InstrumentosFisicoQuimico.css';

const calibracionData = [
  "Medidor de pH",
  "Conductímetro",
  "Potenciómetro",
  "Medidor de TDS",
  "Colorímetro",
  "Turbidímetro",
  "Medidor de CO2",
  "Alcohólimetros",
  "Medidor de CO2",
  "Detectores portátil de gases",
  "Multiparámetro",
  "Salinómetro",
  "Refractómetro (Brix)",
  "Medidor de Cloro",
  "Viscosímetro",
  "Medidor de ORP",
  "Olla Washington"
];

const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosFisicoQuimico = () => {
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

export default InstrumentosFisicoQuimico;