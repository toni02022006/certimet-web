import React, { useState } from 'react';
import './InstrumentosFlujo.css';

const calibracionData = [
  "Bancos de calibración de flujo",
  "Canales Parshall",
  "Caudalímetros Coriolis",
  "Caudalímetros de área variable (Rotámetros)",
  "Caudalímetros de desplazamiento positivo",
  "Caudalímetros de presión diferencial",
  "Caudalímetros de rueda dentada",
  "Caudalímetros electromagnéticos",
  "Caudalímetros Máscicos",
  "Caudalímetros turbina",
  "Caudalímetros tipo Vortex",
  "Caudalímetros ultrasónicos",
  "Medidores de flujo en tuberías abiertas",
  "Medidores de flujo básico térmico",
  "Patrones volumétricos",
  "Reguladores de flujo de gases",
  "Reguladores de flujo de líquidos",
  "Sensores de flujo",
  "Sensores de nivel de líquidos",
  "Tubos Pitot",
  "Rotámetros",
  "Válvulas de control de caudal"
];

const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosFlujo = () => {
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

export default InstrumentosFlujo;