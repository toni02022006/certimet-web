import React, { useState } from 'react';
import './InstrumentosTiempoFrecuencia.css';

// Datos extraídos de la imagen para Tiempo y Frecuencia
const calibracionData = [
  "Agitador magnético",
  "Alineador de poleas",
  "Analizador de vibración",
  "Analizadores de espectro",
  "Analizadores de fase y más",
  "Anemómetro",
  "Combustión mecha",
  "Centrífugas",
  "Conductómetro",
  "Correntómetro",
  "Cronómetro digital y analógico",
  "Estroboscopios",
  "Explosímetros",
  "Frecuencímetro",
  "Frecuencímetros",
  "Luxómetro",
  "Medidor de caudal",
  "Multiplicadores de frecuencia",
  "Pistola radar de velocidad",
  "Registradores",
  "Reloj comparador",
  "Tacómetros",
  "Temporizador y contador de tiempo",
  "Vibrómetro"
];

// Ícono SVG con doble círculo verde (igual que en los otros laboratorios)
const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#00d859" />
  </svg>
);

const InstrumentosTiempoFrecuencia = () => {
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

export default InstrumentosTiempoFrecuencia;