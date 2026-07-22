import React from 'react';
import './IntegradoresWeg.css';

// Importación de las imágenes según las rutas que proporcionaste
import imgWeg from '../../image/ingenieria/img5.png';
import imgInsignia from '../../image/laboratorio/acredti.png';

const IntegradoresWeg = () => {
  return (
    <section className="weg-section">
      <div className="weg-banner">
        
        {/* IMAGEN IZQUIERDA (Logo WEG) */}
        <div className="weg-left-img">
          <img src={imgWeg} alt="Integradores Oficiales WEG" />
        </div>

        {/* TEXTO CENTRAL */}
        <div className="weg-content">
          <h2 className="weg-title">
            Integradores <br />
            oficiales de <span className="weg-bold">WEG</span> en Perú
          </h2>
          <p className="weg-subtitle">
            Soluciones integrales en Ingeniería, Automatización, Medición 
            y Control Industrial para la Optimización de Procesos <br />
            WEG PERÚ y CERTIMET
          </p>
        </div>

        {/* IMAGEN DERECHA (Insignia 3D) */}
        <div className="weg-right-img">
          <img src={imgInsignia} alt="Insignia de Certificación" />
        </div>

      </div>
    </section>
  );
};

export default IntegradoresWeg;