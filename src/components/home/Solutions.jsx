import React from 'react';
import './Solutions.css';

const solutionsData = [
  {
    id: 1,
    title: "Metrología",
    subtitle: "Mantenimiento y Calibración",
    text: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
    btnText: "Ver especialidades \u2192"
  },
  {
    id: 2,
    title: "Ingeniería",
    subtitle: "Automatización y Proyectos",
    text: "sectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.",
    btnText: "Ver especialidades \u2192"
  },
  {
    id: 3,
    title: "Servicios",
    subtitle: "Instrumentos de Precisión",
    text: "a calidad Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    btnText: "Ver especialidades \u2192"
  },
  {
    id: 4,
    title: "Suministro de Equipos",
    subtitle: "Instrumentos de Precisión",
    text: "a calidad Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    btnText: "Encuentra tu equipo \u2192"
  }
];

const Solutions = () => {
  return (
    <section className="solutions-section">
      
      {/* Título de la sección */}
      <div className="solutions-header">
        <h2 className="title-light">Nuestras</h2>
        <h2 className="title-bold">Soluciones</h2>
      </div>

      {/* Grilla de Tarjetas */}
      <div className="solutions-grid">
        {solutionsData.map((item) => (
          <div key={item.id} className="solution-card">
            <div className="solution-icon-circle"></div>
            
            <h3 className="solution-title">{item.title}</h3>
            <h4 className="solution-subtitle">{item.subtitle}</h4>
            
            <p className="solution-text">{item.text}</p>
            
            <button className="solution-btn">
              {item.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Botón Principal Inferior */}
      <div className="solutions-footer">
        <button className="solutions-main-cta">Agenda una visita &rarr;</button>
      </div>

    </section>
  );
};

export default Solutions;