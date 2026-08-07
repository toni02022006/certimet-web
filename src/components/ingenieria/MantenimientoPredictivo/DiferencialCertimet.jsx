import React from 'react';
import './DiferencialCertimet.css';

// --- IMPORTACIÓN DE IMÁGENES EXACTAS ---
import descarga3 from '../../../image/descarga3.webp';
import imgIngeniero from '../../../image/ingenieria/mantenimientopredictivo/componete5.webp';

const DiferencialCertimet = () => {
  return (
    <section className="dif-section">
      <div className="dif-container">
        
        {/* ================= BANNER DESCARGA (FLOTANTE) ================= */}
        <div className="dif-banner-container">
          <div className="dif-banner">
            <h2 className="dif-banner-text">
              Descarga nuestro brochure de<br />
              <span className="dif-text-green">Mantenimiento Preditivo</span>
            </h2>
            <img 
              src={descarga3} 
              alt="Brochure Mantenimiento Predictivo" 
              className="dif-banner-img" 
            />
          </div>
        </div>

        {/* ================= SECCIÓN EL DIFERENCIAL ================= */}
        <div className="dif-content">
          
          {/* Columna Izquierda: Textos y Lista */}
          <div className="dif-text-col">
            <h2 className="dif-title">
              <span className="dif-title-light">El Diferencial</span><br />
              <span className="dif-title-dark">CERTIMET</span>
            </h2>
            
            <ul className="dif-list">
              <li>Ingeniería especializada en activos críticos</li>
              <li>Integrador autorizado de soluciones industriales</li>
              <li>Implementación llave en mano</li>
              <li>Integración IoT y plataformas cloud</li>
              <li>Soporte técnico especializado</li>
              <li>Experiencia en minería, energía e industria pesada</li>
            </ul>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="dif-img-col">
            <img 
              src={imgIngeniero} 
              alt="Ingeniero en planta" 
              className="dif-img" 
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default DiferencialCertimet;