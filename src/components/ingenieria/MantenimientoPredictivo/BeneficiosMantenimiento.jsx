import React, { useState } from 'react';
import './BeneficiosMantenimiento.css';

// --- ÍCONOS AZULES (Estado Normal) ---
import iconParadasBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 32.webp'; // Gráfico
import iconOptBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 30.webp';     // Engranaje
import iconVidaBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 33.webp';    // Escudo
import iconCostosBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 31.webp';  // Llave
import iconConfBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 34.webp';    // Rayo
import iconDispBlue from '../../../image/ingenieria/mantenimientopredictivo/Recurso 29.webp';    // Campana

// --- ÍCONOS VERDES (Estado Hover) ---
import iconParadasGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 26.webp';
import iconOptGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 24.webp';
import iconVidaGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 27.webp';
import iconCostosGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 25.webp';
import iconConfGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 28.webp';
import iconDispGreen from '../../../image/ingenieria/mantenimientopredictivo/Recurso 23.webp';

const BeneficiosMantenimiento = () => {
  // Estado para saber qué tarjeta tiene el mouse encima (guardamos el índice)
  const [hoveredCard, setHoveredCard] = useState(null);

  // Arreglo con la data de las tarjetas para mapearlas fácilmente
  const cards = [
    {
      id: 0,
      title: "Reducción de paradas",
      text: "Evite detenciones no programadas\ny costosas.",
      iconBlue: iconParadasBlue,
      iconGreen: iconParadasGreen
    },
    {
      id: 1,
      title: "Optimización del plan",
      text: "Intervenga los equipos solo cuando\nsea necesario.",
      iconBlue: iconOptBlue,
      iconGreen: iconOptGreen
    },
    {
      id: 2,
      title: "Extensión de vida útil",
      text: "Maximice la durabilidad de sus\nactivos críticos.",
      iconBlue: iconVidaBlue,
      iconGreen: iconVidaGreen
    },
    {
      id: 3,
      title: "Disminución de costos",
      text: "Reduzca gastos operativos y de\nmantenimiento.",
      iconBlue: iconCostosBlue,
      iconGreen: iconCostosGreen
    },
    {
      id: 4,
      title: "Confiabilidad de activos",
      text: "Opere con la seguridad de que sus\nequipos no fallarán.",
      iconBlue: iconConfBlue,
      iconGreen: iconConfGreen
    },
    {
      id: 5,
      title: "Mayor disponibilidad",
      text: "Mantenga su planta operativa por más\ntiempo.",
      iconBlue: iconDispBlue,
      iconGreen: iconDispGreen
    }
  ];

  return (
    <section className="bm-section">
      <div className="bm-container">
        
        {/* ================= ENCABEZADO ================= */}
        <div className="bm-header">
          <h2 className="bm-main-title">
            <span className="bm-title-light">Beneficios del</span><br />
            <span className="bm-title-dark">mantenimiento predictivo</span><br />
            <span className="bm-title-light">para su planta</span>
          </h2>
          <p className="bm-subtitle">
            Transforme la manera en que gestiona sus activos críticos, optimizando recursos y maximizando la rentabilidad.
          </p>
        </div>

        {/* ================= GRILLA DE TARJETAS ================= */}
        <div className="bm-grid">
          {cards.map((card, index) => {
            const isHovered = hoveredCard === index;

            return (
              <div 
                key={card.id} 
                className="bm-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img 
                  src={isHovered ? card.iconGreen : card.iconBlue} 
                  alt={`Icono ${card.title}`} 
                  className="bm-card-icon" 
                />
                <h3 className="bm-card-title">{card.title}</h3>
                <p className="bm-card-text">
                  {/* Separamos el texto por saltos de línea para mantener el formato del diseño */}
                  {card.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}<br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BeneficiosMantenimiento;