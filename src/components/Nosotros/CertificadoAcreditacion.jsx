import React from 'react';
import './CertificadoAcreditacion.css';

// Importación de la imagen según tu ruta
import certimetCer from '../../image/nosotros/certimetcer.jpg';

const CertificadoAcreditacion = () => {
  return (
    <section className="acreditacion-section">
      <div className="acreditacion-container">
        
        {/* PARTE SUPERIOR: Título + Botón y Certificado */}
        <div className="acreditacion-top-grid">
          
          <div className="acreditacion-text-col">
            <h2 className="acreditacion-title">
              {/* Azul Claro y Delgado */}
              <span className="title-light-blue">
                Precisión<br />
                reconocida,<br />
                resultados<br />
                confiables.<br />
              </span>
              {/* Azul Oscuro y Grueso */}
              <span className="title-dark-blue">
                Acreditados<br />
                por INACAL
              </span>
            </h2>
            <a href="#" className="btn-outline-blue">
              Nuestro alcance &rarr;
            </a>
          </div>

          <div className="acreditacion-img-col">
            <img 
              src={certimetCer} 
              alt="Certificado de Acreditación INACAL" 
              className="certificado-img"
            />
          </div>

        </div>

        {/* PARTE INFERIOR: Párrafo descriptivo en gris con resaltados azules */}
        <div className="acreditacion-bottom-text">
          <p>
            Detrás de cada certificado de calibración hay un proceso riguroso, trazable y respaldado por la máxima autoridad metrológica del país. <span className="text-highlight-blue">INACAL nos ha acreditado bajo la norma ISO/IEC 17025:2017</span> en las magnitudes de <span className="text-highlight-blue">Masa, Temperatura, y Presión y Vacío,</span> reconociendo nuestra competencia técnica y la confiabilidad de nuestros resultados. Cada medición que entregamos cumple con procedimientos nacionales e internacionales bajo triple estándar ISO.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CertificadoAcreditacion;