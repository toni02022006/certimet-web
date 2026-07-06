import React from 'react';
import './Methodology.css';

// Textos actualizados según el nuevo diseño
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

const Methodology = () => {
  return (
    <section className="methodology-section">
      <div className="methodology-container">
        
        {/* Encabezado Izquierdo */}
        <div className="methodology-header">
          <span className="methodology-tag">METODOLOGÍA</span>
          <h2 className="methodology-title">
            Del Instrumento al certificado,<br />
            sin complicaciones
          </h2>
        </div>

        {/* Grilla de 4 Pasos */}
        <div className="methodology-grid">
          {stepsData.map((step, index) => (
            <div className="methodology-card" key={index}>
              <h3 className="methodology-number">{step.id}</h3>
              <h4 className="methodology-card-title">{step.title}</h4>
              <p className="methodology-card-text">{step.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Methodology;