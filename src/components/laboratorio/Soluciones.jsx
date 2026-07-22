import React from 'react';
import '../../views/Laboratorio.css';
import laboratorioImg from '../../image/laboratorio/DSC08101.jpeg';

const Soluciones = () => {
  return (
    <section className="cert-lab-soluciones-section">
      <div className="cert-lab-soluciones-container">
        
        {/* Primera fila: título centrado */}
        <div className="cert-lab-soluciones-header">
          <h2 className="cert-lab-soluciones-title">
            <span className="cert-lab-title-light-thin">Soluciones de </span>
            <span className="cert-lab-title-dark-bold">metrología y calibración</span>
            <br />
            <span className="cert-lab-title-light-thin">a la medida de tu industria</span>
          </h2>
        </div>

        {/* Segunda fila: párrafo (izquierda) + imagen (derecha) */}
        <div className="cert-lab-soluciones-body">
          <div className="cert-lab-soluciones-text">
            <p className="cert-lab-soluciones-description">
              La medición es el proceso clave para garantizar la calidad de los productos y la eficiencia de los procesos industriales. Por ello, contar con instrumentos correctamente calibrados no es una opción, es una necesidad.<br/><br/>
              En el Laboratorio de Metrología y Calibración <span className="cert-lab-highlight">CERTIMET</span> ofrecemos servicios expertos de calibración, en instalaciones con condiciones ambientales controladas y <span className="cert-lab-highlight">procedimientos alineados a la norma ISO/IEC 17025</span>.
            </p>
            <button className="cert-lab-soluciones-btn">
              Contáctanos <span className="cert-lab-arrow">→</span>
            </button>
          </div>
          <div className="cert-lab-soluciones-image">
            <img src={laboratorioImg} alt="Laboratorio CERTIMET" className="cert-lab-soluciones-img" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Soluciones;