import React from 'react';
import './DescargasBanner.css';

// Importamos la nueva imagen combinada que creaste
import descarga3 from '../../image/descarga3.png';

const DescargasBanner = () => {
  return (
    <section className="descargas-section">
      <div className="descargas-banner">
        
        {/* Lado Izquierdo: Texto */}
        <div className="descargas-text">
          <h2>
            Todo sobre <span className="text-green">CERTIMET,</span><br />
            listo para descargar.
          </h2>
        </div>

        {/* Lado Derecho: Imagen Única ya recortada y rotada */}
        <div className="descargas-images">
          <img 
            src={descarga3} 
            alt="Catálogos de CERTIMET" 
            className="img-combined" 
          />
        </div>

      </div>
    </section>
  );
};

export default DescargasBanner;