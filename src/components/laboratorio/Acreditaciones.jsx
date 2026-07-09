import React from 'react';
import './Acreditaciones.css';

const Acreditaciones = () => {
  return (
    <section className="acreditaciones">
      <div className="acreditaciones-container">
        <div className="acreditaciones-badge">
          <h3>INACAL</h3>
          <p>DA - Perú</p>
          <p>Laboratorio de Calibración Acreditado</p>
        </div>
        <div className="acreditaciones-text">
          <p className="acreditaciones-desc">
            Garantía de trazabilidad y confianza en cada medición que entregamos.
          </p>
          <p className="acreditaciones-registro">INACAL Registro N° LC-097</p>
        </div>
      </div>
    </section>
  );
};

export default Acreditaciones;