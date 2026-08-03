import React from 'react';
import { Link } from 'react-router-dom';
import './HeroElectricidad.css';

// --- IMPORTACIONES DE IMÁGENES ---
import laboratorioImg from '../../../image/laboratorio/sublaboratorios/electricidad.webp';
import fondoHeroImg from '../../../image/laboratorio/sublaboratorios/electricidadfondo.webp'; 

const HeroElectricidad = () => {
  return (
    <div className="elec-container-main">
      
      {/* ================= SECCIÓN BANNER CON IMAGEN DE FONDO ================= */}
      <section 
        className="elec-hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 75, 147, 0.5) 0%, rgba(0, 26, 59, 0.6) 100%), url(${fondoHeroImg})` 
        }}
      >
        <div className="elec-hero-content">
          <h1 className="elec-title">
            Laboratorio de <br />
            <span className="text-neon-green">Electricidad</span>
          </h1>
          {/* Contenedor del logo INACAL eliminado según las especificaciones */}
        </div>
      </section>

      {/* ================= SECCIÓN INTRODUCCIÓN ================= */}
      <section className="elec-intro-section">
        <div className="elec-intro-container">
          
          {/* Columna Izquierda: Texto y Botón */}
          <div className="elec-text-col">
            <p className="elec-description">
              <span className="text-blue-bold">
                El laboratorio de Electricidad CERTIMET
              </span>{' '}
              ofrece mantenimiento y cuenta con triple certificación ISO para la verificación de mediciones, asegurando trazabilidad a patrones internacionales. También realiza análisis de incertidumbre, ajustes y reparaciones, garantizando precisión en la medición y control de variables eléctricas en diversos sectores industriales. Cuenta con tecnología avanzada para proporcionar los servicios de calibración que necesite. Conozca algunos de los instrumentos que podemos atender.
            </p>
            
            <Link to="/contacto" className="btn-solicitar-servicio">
              Solicita este servicio <span className="arrow">→</span>
            </Link>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="elec-image-col">
            <img src={laboratorioImg} alt="Técnico en Laboratorio de Electricidad" className="elec-scientist-img" />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default HeroElectricidad;