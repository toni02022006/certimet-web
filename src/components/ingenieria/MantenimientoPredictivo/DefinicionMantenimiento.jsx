import React from 'react';
import './DefinicionMantenimiento.css';

// Reutilizamos la imagen del ingeniero de la sección "Quiénes Somos / Soluciones Integrales"
import imgDefinicion from '../../../image/nosotros/quienssms.png';

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
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="dm-img-col">
            <img 
              src={imgDefinicion} 
              alt="Ingeniero realizando mantenimiento predictivo" 
              className="dm-img" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DefinicionMantenimiento;