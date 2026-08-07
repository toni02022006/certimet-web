import React from 'react';
import './DefinicionMantenimiento.css';

// Importación exacta con la ruta que indicaste
import imgDefinicion from '../../../image/ingenieria/mantenimientopredictivo/componente2.webp';

const DefinicionMantenimiento = () => {
  return (
    <section className="dm-section">
      <div className="dm-container">
        
        {/* =========================================================
            BANNER FLOTANTE (Con corte de fondo mitad blanco/celeste)
            ========================================================= */}
        <div className="dm-banner">
          <p className="dm-banner-text">
            <i>"La automatización no reemplaza el talento, lo potencia."</i><br />
            Nuestros especialistas combinan tecnología de punta con <br className="dm-mobile-break" />
            <span className="dm-text-green">criterio técnico para lograr procesos más eficientes.</span>
          </p>
        </div>

        {/* =========================================================
            CONTENIDO (Dos columnas: Texto e Imagen)
            ========================================================= */}
        <div className="dm-content">
          
          {/* Columna Izquierda: Textos */}
          <div className="dm-text-col">
            <h2 className="dm-title">
              ¿Qué es el<br />
              mantenimiento<br />
              predictivo industrial?
            </h2>
            <p className="dm-description">
              Es una estrategia basada en el monitoreo continuo del
              estado real de los equipos, permitiendo anticipar fallas
              mediante el análisis de variables operativas críticas.
              Esto permite identificar patrones de degradación antes
              de que se produzca una falla mayor, cambiando el enfo-
              que de «reparar cuando se rompa» a «prevenir antes de
              que ocurra».
            </p>

            {/* SECCIÓN AÑADIDA: Parámetros Monitoreados (Acordeón) */}
            <div className="dm-parametros-container">
              <div className="dm-parametros-header">
                <span className="dm-parametros-title">Parámetros Monitoreados</span>
                <span className="dm-icon-plus">+</span>
              </div>
              <ol className="dm-parametros-list">
                <li>Vibración</li>
                <li>Corriente</li>
                <li>Resistencia de aislamiento</li>
                <li>Desempeño operativo</li>
                <li>Temperatura</li>
                <li>Voltaje</li>
                <li>Condiciones eléctricas</li>
                <li>Humedad</li>
              </ol>
            </div>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="dm-img-col">
            <img 
              src={imgDefinicion} 
              alt="Planta industrial de noche" 
              className="dm-img" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DefinicionMantenimiento;