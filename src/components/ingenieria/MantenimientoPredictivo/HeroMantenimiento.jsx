import React from 'react';
import { Link } from 'react-router-dom';
import './HeroMantenimiento.css';

// --- IMPORTACIÓN DE IMÁGENES EXACTAS ---
import imgFondo from '../../../image/laboratorio/FuerzapresiónMS.jpeg';
import imgPersona from '../../../image/ingenieria/img1.png';

const HeroMantenimiento = () => {
  return (
    <div className="hm-container-main">
      
      {/* ================= SECCIÓN BANNER HERO ================= */}
      <section 
        className="hm-hero-banner" 
        style={{ 
          // Degradado azul elegante de izquierda a derecha sobre la imagen
          backgroundImage: `linear-gradient(90deg, rgba(0, 45, 94, 0.27) 0%, rgba(0, 76, 147, 0.24) 50%, rgba(0, 102, 204, 0.2) 100%), url(${imgFondo})` 
        }}
      >
        <div className="hm-hero-content">
          <h1 className="hm-title">
            <span className="hm-text-green">Mantenimiento Predictivo Industrial</span><br />
            en Perú para Activos Críticos
          </h1>
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="hm-intro-section">
        <div className="hm-intro-container">
          
          {/* Columna Izquierda: Imagen */}
          <div className="hm-image-col">
            <img 
              src={imgPersona} 
              alt="Ingeniero en planta industrial" 
              className="hm-intro-img" 
            />
          </div>

          {/* Columna Derecha: Textos y Botón */}
          <div className="hm-text-col">
            <h2 className="hm-intro-title">
              Una falla inesperada<br />
              puede <span className="hm-text-blue-bold">detener<br />toda su operación</span>
            </h2>
            
            <p className="hm-description">
              En industrias como minería, energía y manufactura, una
              falla en motores, transformadores o sistemas eléctricos
              puede generar pérdidas económicas significativas, ries-
              gos operativos y tiempos de inactividad no planificados.
            </p>

            <p className="hm-text-green-italic">
              El mantenimiento reactivo<br />ya no es suficiente.
            </p>
            
            <Link to="/contacto" className="hm-btn-solicitar">
              Solicita una evaluación técnica <span className="arrow">→</span>
            </Link>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroMantenimiento;