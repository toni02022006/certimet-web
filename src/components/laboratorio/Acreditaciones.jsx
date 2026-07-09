import React from 'react';
import './Acreditaciones.css';
import inacalLogo from '../../image/laboratorio/inacal morado.webp';
import escarapelaImg from '../../image/laboratorio/acredti.png';

const Acreditaciones = () => {
  return (
    <section className="acreditaciones">
      <div className="acreditaciones-card">
        
        {/* Columna Izquierda: Logo INACAL */}
        <div className="acreditaciones-col left">
          <img src={inacalLogo} alt="Logo INACAL Registro N° LC-097" className="img-inacal" />
        </div>

        {/* Columna Central: Textos */}
        <div className="acreditaciones-col center">
          <h2 className="acreditaciones-title">
            <span className="title-blue">Acreditados por</span>
            <br />
            <span className="title-green">INACAL</span>
          </h2>
          <p className="acreditaciones-desc">
            Garantía de trazabilidad y confianza en<br />
            cada medición que entregamos.
          </p>
        </div>

        {/* Columna Derecha: Escarapela 3D */}
        <div className="acreditaciones-col right">
          <img src={escarapelaImg} alt="Sello de Acreditación" className="img-escarapela" />
        </div>

      </div>
    </section>
  );
};

export default Acreditaciones;