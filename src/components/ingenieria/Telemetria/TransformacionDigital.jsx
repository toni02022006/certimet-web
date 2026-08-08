import React from 'react';
import './TransformacionDigital.css';

// --- IMPORTACIÓN DE LA IMAGEN EXACTA ---
import imgTransformacion from '../../../image/ingenieria/telemetria/componente3.jpg';

const TransformacionDigital = () => {
  const listaItems = [
    "Internet de las Cosas (IoT) y sensorización avanzada",
    "Redes de comunicación industrial (LoRaWAN, 4G/5G, Satelital)",
    "Gestión inteligente de activos en tiempo real",
    "Plataformas de monitoreo remoto centralizadas",
    "Sistemas de análisis y mantenimiento predictivo",
    "Infraestructura basada en la nube (AWS, Azure)"
  ];

  return (
    <section className="td-section">
      <div className="td-container">
        
        {/* ================= COLUMNA IZQUIERDA (Imagen) ================= */}
        <div className="td-media-col">
          <img 
            src={imgTransformacion} 
            alt="Ingeniero en centro de monitoreo de telemetría" 
            className="td-img" 
          />
        </div>

        {/* ================= COLUMNA DERECHA (Textos y Lista) ================= */}
        <div className="td-text-col">
          <h2 className="td-title">
            Transformación digital<br />
            industrial mediante <span className="td-title-bold">IoT</span><br />
            <span className="td-title-bold">y monitoreo remoto</span>
          </h2>

          <p className="td-description">
            En el marco de la Industria 4.0, la telemetría cumple un rol
            clave al integrar el entorno físico con plataformas digitales,
            permitiendo una gestión inteligente de activos y operacio-
            nes.
          </p>

          <ul className="td-list">
            {listaItems.map((item, index) => (
              <li key={index} className="td-list-item">
                <span className="td-arrow">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default TransformacionDigital;