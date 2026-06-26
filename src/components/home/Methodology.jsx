import React from 'react';
import './Methodology.css';

const stepsData = [
  {
    id: "01",
    title: "Mantenimiento y Calibración",
    text: "quat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accum"
  },
  {
    id: "02",
    title: "Mantenimiento y Calibración",
    text: "quat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accum"
  },
  {
    id: "03",
    title: "Mantenimiento y Calibración",
    text: "quat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accum"
  },
  {
    id: "04",
    title: "Mantenimiento y Calibración",
    text: "quat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accum"
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