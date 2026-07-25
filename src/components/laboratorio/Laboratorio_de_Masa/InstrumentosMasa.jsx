import React, { useState } from 'react';
import './InstrumentosMasa.css';

// --- SERVICIOS ACREDITADOS (5 tarjetas en el orden correcto) ---
const acreditadosData = [
  {
    titulo: "Balanzas analítica Clase I",
    alcance: "0,001 g a 10 200 g"
  },
  {
    titulo: "Balanzas analítica Clase II",
    alcance: "0,02 g a 35 000 g"
  },
  {
    titulo: "Balanzas analítica Clase III",
    alcance: "100 g a 600 g"
  },
  {
    titulo: "Pesas M2",
    alcance: "De 10 kg a 20 Kg"
  },
  {
    titulo: "Balanzas analítica Clase III",  // ← Quinta tarjeta (duplicada, como en la imagen)
    alcance: "100 g a 600 g"
  }
];

// --- SERVICIOS DE CALIBRACIÓN (lista) ---
const calibracionData = [
  "Balanzas de laboratorio con celdas de carga",
  "Balanzas de plataforma",
  "Balanzas de precisión",
  "Balanzas electrónicas",
  "Balanzas industriales",
  "Balanzas mecánicas",
  "Balanzas tipo estoca",
  "Básculas colgantes",
  "Básculas comerciales",
  "Básculas para pesaje de animales",
  "Celdas de carga para pesaje",
  "Densímetro",
  "Higrómetros gravimétricos",
  "Juegos de pesas calibradas",
  "Medidores de flujo másico",
  "Microbalanzas",
  "Pesas de acero inoxidable y latón",
  "Pesas de alta precisión para laboratorios",
  "Pesas patrón clase E1, E2, F1, F2, M1, M2",
  "Tolvas y más"
];

// Ícono SVG para viñetas (círculo doble verde)
const BulletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="list-bullet-icon">
    <circle cx="12" cy="12" r="9" stroke="#00d859" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="#00d859"/>
  </svg>
);

const InstrumentosMasa = () => {
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
            SECCIÓN 1: SERVICIOS ACREDITADOS (5 tarjetas)
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

export default InstrumentosMasa;