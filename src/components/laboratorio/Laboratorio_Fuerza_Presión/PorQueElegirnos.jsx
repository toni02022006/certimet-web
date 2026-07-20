import React from 'react';
import { Link } from 'react-router-dom';
import './PorQueElegirnos.css';

// Ruta de tu imagen del mensaje 3D
import imgMensaje from '../../../image/laboratorio/msdefyp.png';

const stepsData = [
  {
    id: "01",
    title: "Recepción y verificación",
    text: "Registro de tu instrumento con número de serie, condición inicial y alcance de calibración requerido."
  },
  {
    id: "02",
    title: "Calibración en laboratorio",
    text: "Ejecución por personal técnico competente usando patrones trazables al SI con incertidumbre documentada."
  },
  {
    id: "03",
    title: "Revisión metrológica",
    text: "El certificado es revisado por el metrólogo responsable antes de ser emitido con firma y sello acreditado."
  },
  {
    id: "04",
    title: "Entrega y seguimiento",
    text: "Recibes el certificado digital y físico, con acceso al historial de calibraciones de tu equipo."
  }
];

const PorQueElegirnos = () => {
  return (
    <section className="pqe-section">
      <div className="pqe-container">
        
        {/* ==========================================
            1. BANNER: ¿No encuentra su equipo?
            ========================================== */}
        <div className="pqe-banner-wrapper">
          <div className="pqe-banner">
            <div className="pqe-banner-content">
              <h3>¿No encuentra su equipo?</h3>
              <Link to="/contacto" className="btn-consulte">
                Consulte aquí &rarr;
              </Link>
            </div>
            
            {/* Imagen 3D sobresaliendo */}
            <img src={imgMensaje} alt="Consulte aquí" className="pqe-banner-img" />
          </div>
        </div>

        {/* ==========================================
            2. TARJETAS: ¿Por qué elegirnos?
            ========================================== */}
        <div className="pqe-header">
          <h2 className="pqe-title">
            ¿Por qué <span className="text-green">elegirnos?</span>
          </h2>
        </div>

        {/* Grilla de 4 Pasos adaptada de tu código */}
        <div className="pqe-grid">
          {stepsData.map((step, index) => (
            <div className="pqe-card" key={index}>
              <h3 className="pqe-number">{step.id}</h3>
              <h4 className="pqe-card-title">{step.title}</h4>
              <p className="pqe-card-text">{step.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PorQueElegirnos;