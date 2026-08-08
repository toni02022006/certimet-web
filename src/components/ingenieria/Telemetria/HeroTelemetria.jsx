import React from 'react';
import { Link } from 'react-router-dom';
import './HeroTelemetria.css';

// --- IMPORTACIÓN DE IMÁGENES EXACTAS ---
import imgFondo from '../../../image/ingenieria/telemetria/telemetria.webp';
import imgPersona from '../../../image/ingenieria/telemetria/componente1.png';

const HeroTelemetria = () => {
  return (
    <div className="ht-container-main">
      
      {/* ================= SECCIÓN BANNER HERO ================== */}
      <section 
        className="ht-hero-banner" 
        style={{ 
          // Degradado azul elegante de izquierda a derecha sobre la imagen
          backgroundImage: `linear-gradient(90deg, rgba(0, 45, 94, 0.27) 0%, rgba(0, 76, 147, 0.24) 50%, rgba(0, 102, 204, 0.2) 100%), url(${imgFondo})` 
        }}
      >
        <div className="ht-hero-content">
          <h1 className="ht-title">
            <span className="ht-text-green">Sistemas de Telemetría</span><br />
            <span className="ht-text-green">Industrial 4.0</span> en Perú
          </h1>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="ht-intro-section">
        <div className="ht-intro-container">
          
          {/* Columna Izquierda: Imagen */}
          <div className="ht-image-col">
            <img 
              src={imgPersona} 
              alt="Ingeniero en planta industrial" 
              className="ht-intro-img" 
            />
          </div>

          {/* Columna Derecha: Textos y Botón */}
          <div className="ht-text-col">
            <h2 className="ht-intro-title">
              ¿Su planta aun<br />
              depende de<br />
              <span className="ht-text-blue-bold">supervisión local?</span>
            </h2>
            
            <p className="ht-description">
              En muchas operaciones industriales, el monitoreo insitu
              genera tiempos muertos, pérdida de información crítica y
              altos costos de mantenimiento. La supervisión atrapada
              en pantallas locales limita la capacidad de respuesta ante
              fallas y reduce la eficiencia operativa fuera de la planta.
            </p>
            
            <Link to="/contacto" className="ht-btn-solicitar">
              Solicita una evaluación técnica <span className="arrow">→</span>
            </Link>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroTelemetria;