import React from 'react';
import { Link } from 'react-router-dom';
import './Solutions.css';

import iconMa from '../../image/icons/Ma.webp';
import iconIa from '../../image/icons/Ia.webp';
import iconSa from '../../image/icons/Sa.webp';
import iconTa from '../../image/icons/Ta.webp';

const solutionsData = [
  {
    id: 1,
    title: "Metrología",
    subtitle: "Mantenimiento y Calibración",
    text: "Laboratorio acreditado por INACAL bajo la norma ISO/IEC 17025:2017. Calibramos instrumentos de medición con la mayor precisión y trazabilidad.",
    btnText: "Ver especialidades →",
    icon: iconMa,
    path: "/laboratorio"
  },
  {
    id: 2,
    title: "Ingeniería",
    subtitle: "Automatización y Proyectos",
    text: "Soluciones de control y automatización industrial a medida. Optimizamos tus procesos con tecnología y respaldo técnico especializado.",
    btnText: "Ver especialidades →",
    icon: iconIa,
    path: "/ingenieria"
  },
  {
    id: 3,
    title: "Servicios",
    subtitle: "Instrumentos de Precisión",
    text: "Mantenimiento preventivo y correctivo, consultoría técnica y capacitaciones. Atención personalizada para mantener tus equipos en óptimas condiciones.",
    btnText: "Ver especialidades →",
    icon: iconSa,
    path: "/servicios"
  },
  {
    id: 4,
    title: "Suministro de Equipos",
    subtitle: "Instrumentos de Precisión",
    text: "Comercializamos instrumentación y equipos de medición de marcas líderes. Encuentra lo que necesitas para tu operación industrial en un solo lugar.",
    btnText: "Encuentra tu equipo →",
    icon: iconTa,
    path: "/tienda"
  }
];

const Solutions = () => {
  return (
    <section className="solutions-section">
      <div className="solutions-header">
        <h2 className="title-light">Nuestras</h2>
        <h2 className="title-bold">Soluciones</h2>
      </div>

      <div className="solutions-grid">
        {solutionsData.map((item) => (
          <div key={item.id} className="solution-card">
            <div className="solution-icon-circle">
              <img src={item.icon} alt={item.title} />
            </div>
            <h3 className="solution-title">{item.title}</h3>
            <h4 className="solution-subtitle">{item.subtitle}</h4>
            <p className="solution-text">{item.text}</p>
            <Link to={item.path} className="solution-btn">
              {item.btnText}
            </Link>
          </div>
        ))}
      </div>

      <div className="solutions-footer">
        <Link to="/contacto" className="solutions-main-cta">
          Agenda una visita →
        </Link>
      </div>
    </section>
  );
};

export default Solutions;