import React from 'react';
import './Soluciones.css';
import laboratorioImg from '../../image/laboratorio/DSC08101.jpeg';

const Soluciones = () => {
  return (
    <section className="soluciones">
      <div className="soluciones-container">
        {/* Primera fila: título centrado */}
        <div className="soluciones-header">
          <h2 className="soluciones-title">
            <span className="title-light-thin">Soluciones de </span>
            <span className="title-dark-bold">metrología y calibración</span>
            <br />
            <span className="title-light-thin">a la medida de tu industria</span>
          </h2>
        </div>

        {/* Segunda fila: párrafo (izquierda) + imagen (derecha) */}
        <div className="soluciones-body">
          <div className="soluciones-text">
            <p className="soluciones-description">
              La medición es el proceso clave para garantizar la calidad de los productos y la eficiencia de los procesos industriales. Por ello, contar con instrumentos correctamente calibrados no es una opción, es una necesidad.<br/><br/>
              En el Laboratorio de Metrología y Calibración <span className="highlight">CERTIMET</span> ofrecemos servicios expertos de calibración, en instalaciones con condiciones ambientales controladas y <span className="highlight">procedimientos alineados a la norma ISO/IEC 17025</span>.
            </p>
            <button className="soluciones-btn">
              Contáctanos <span className="arrow">→</span>
            </button>
          </div>
          <div className="soluciones-image">
            <img src={laboratorioImg} alt="Laboratorio CERTIMET" className="soluciones-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Soluciones;