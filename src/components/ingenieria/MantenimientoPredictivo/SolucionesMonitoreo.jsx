import React from 'react';
import './SolucionesMonitoreo.css';

// --- IMPORTACIÓN DE IMÁGENES EXACTAS ---
import imgTermografico from '../../../image/ingenieria/mantenimientopredictivo/componete3.webp';
import imgRotativas from '../../../image/ingenieria/mantenimientopredictivo/componente4.webp';

const SolucionesMonitoreo = () => {
  return (
    <section className="sm-section">
      <div className="sm-container">
        
        {/* ================= TÍTULO PRINCIPAL ================= */}
        <h2 className="sm-main-title">
          <span className="sm-title-light">Soluciones </span>
          <span className="sm-title-dark">Inteligentes de Monitoreo</span>
        </h2>

        {/* ================= SECCIÓN 1: TERMOGRÁFICO ================= */}
        <div className="sm-row">
          
          {/* Columna Izquierda: Imagen */}
          <div className="sm-col-img sm-img-left">
            <img 
              src={imgTermografico} 
              alt="Monitoreo y Análisis Termográfico" 
              className="sm-img" 
            />
          </div>

          {/* Columna Derecha: Textos y Lista */}
          <div className="sm-col-text">
            <h3 className="sm-title">
              Monitoreo y Análisis<br />Termográfico
            </h3>
            
            <ul className="sm-list">
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Detección de puntos calientes en tableros eléctricos
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Sistemas de cámara termográfica IoT
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Alertas automáticas ante desviaciones
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Monitoreo térmico continuo
              </li>
            </ul>
          </div>

        </div>

        {/* ================= SECCIÓN 2: MÁQUINAS ROTATIVAS ================= */}
        <div className="sm-row sm-row-reverse">
          
          {/* Columna Izquierda (en desktop): Textos y Lista */}
          <div className="sm-col-text">
            <h3 className="sm-title">
              Monitoreo Online de<br />Máquinas Rotativas
            </h3>
            
            <p className="sm-description">
              Equipos que pueden ser monitoreados: Motores eléctri-
              cos, Bombas, Compresores, Reductores, Ventiladores, 
              Fajas transportadoras, Molinos, Cojinetes.
            </p>

            <ul className="sm-list">
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Medición de vibración hasta 16 g
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Frecuencia espectral hasta 13.3 kHz
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Protección IP66 / IP67
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Plataforma en la nube para análisis predictivo
              </li>
              <li className="sm-list-item">
                <span className="sm-arrow">→</span>
                Comunicación Bluetooth 5
              </li>
            </ul>
          </div>

          {/* Columna Derecha (en desktop): Imagen */}
          <div className="sm-col-img sm-img-right">
            <img 
              src={imgRotativas} 
              alt="Monitoreo Online de Máquinas Rotativas" 
              className="sm-img" 
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default SolucionesMonitoreo;