import React, { useState } from 'react';
import './InstrumentosLongitud.css';

// Datos extraídos de la imagen para Longitud
const calibracionData = [
  "Calibradores",
  "Cinta Métrica",
  "Cuenta hilos",
  "Deflexímetros",
  "Detector de fallas",
  "Distanciómetro",
  "Galgas",
  "Goniómetros",
  "Inclinómetro",
  "Medidor de cocada",
  "Medidor de espesor",
  "Medidor de espesores ultrasónicos",
  "Medidor nivel láser",
  "Micrómetros de exteriores e interiores",
  "Nivel de Precisión",
  "Niveles de burbujas",
  "Pie de Rey (Calibradores vernier)",
  "Perfilómetros",
  "Proyector de perfiles",
  "Reglas patrón",
  "Reloj comparador",
  "Rugosímetros",
  "Tamices y más"
];

const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosLongitud = () => {
  const [openCalibracion, setOpenCalibracion] = useState(true);

  return (
    <section className="inst-section">
      <div className="inst-container">

        <h2 className="inst-main-title">
          Equipos e instrumentos <span className="text-green">que calibramos</span>
        </h2>

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

export default InstrumentosLongitud;