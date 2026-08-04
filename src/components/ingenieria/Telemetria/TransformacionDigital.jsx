import React from 'react';
import './TransformacionDigital.css';

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
        
        {/* ================= COLUMNA IZQUIERDA (Bloque o Imagen) ================= */}
        <div className="td-media-col">
          {/* Este es el bloque azul sólido de tu diseño */}
          <div className="td-blue-block"></div>
          
          {/* NOTA: Si más adelante quieres poner una imagen en lugar del cuadro azul, 
              borra el div de arriba y usa esto:
              <img src={tuImagen} alt="Transformación Digital" className="td-img" /> 
          */}
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