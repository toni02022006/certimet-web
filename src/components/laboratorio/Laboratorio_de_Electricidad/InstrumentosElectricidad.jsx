import React, { useState } from 'react';
import './InstrumentosElectricidad.css';

// Datos de la lista (tomados de la imagen)
const calibracionData = [
  "Amperímetros",
  "Analizador de respuesta de frecuencia de barrido",
  "Analizadores de calidad de energía",
  "Bobina de tensión",
  "Calibradores de proceso eléctricos",
  "Calibradores multifunción",
  "Cargas resistivas y reactivas",
  "Comprobadores de válvulas de lazo y de aislamiento",
  "Detectores de tensión sin contacto",
  "Fuentes de alimentación DC y AC",
  "Generadores de señales eléctricas",
  "Medidores de aislamiento y de energía eléctrica",
  "Medidores de potencia monofásicos y trifásicos",
  "Megohmetros",
  "Microhímetros",
  "Multímetros digitales y analógicos",
  "Osciloscopios",
  "Óhmetros",
  "Pinzas amperimétricas",
  "Potenciómetro de mesa",
  "Registradores de datos eléctricos",
  "Relés de protección",
  "Sartén eléctrica volcable",
  "Tacómetros electrónicos",
  "Transformadores de corriente y potencial",
  "Variadores de frecuencia",
  "Vatímetros"
];

// Ícono SVG con doble círculo verde (igual que en Fuerza)
const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosElectricidad = () => {
  // Estado para el acordeón (inicialmente abierto)
  const [openCalibracion, setOpenCalibracion] = useState(true);

  return (
    <section className="inst-section">
      <div className="inst-container">

        {/* Título principal */}
        <h2 className="inst-main-title">
          Equipos e instrumentos <span className="text-green">que calibramos</span>
        </h2>

        {/* Único grupo de acordeón: Servicios de calibración */}
        <div className="inst-accordion-group">
          {/* Cabecera clickeable */}
          <div
            className="inst-accordion-header"
            onClick={() => setOpenCalibracion(!openCalibracion)}
          >
            <h3>Nuestros servicios de calibración</h3>
            <span className="inst-toggle-icon">{openCalibracion ? '−' : '+'}</span>
          </div>

          {/* Contenido desplegable */}
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

export default InstrumentosElectricidad;