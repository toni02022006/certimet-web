import React, { useState } from 'react';
import './BeneficiosTelemetria.css';

const BeneficiosTelemetria = () => {
  // Inicia en 1 para que la segunda tarjeta ("Prevención de fallas críticas") esté activa por defecto
  const [activeCard, setActiveCard] = useState(1);

  // Datos de las tarjetas
  const beneficios = [
    {
      id: 0,
      titulo: "Minimización de\ntiempos de inactividad",
      desc: "Anticípese a las paradas de planta con alertas tempranas enviadas directamente a sus dispositivos.",
      iconType: "medal"
    },
    {
      id: 1,
      titulo: "Prevención de\nfallas críticas",
      desc: "Resguarde la vida útil de sus equipos de alta precisión mediante supervisión remota 24/7.",
      iconType: "document"
    },
    {
      id: 2,
      titulo: "Trazabilidad\ncompleta",
      desc: "Centralice el histórico de sus variables críticas en la nube para auditorías rápidas y análisis predictivo sin pérdida de datos.",
      iconType: "handshake"
    },
    {
      id: 3,
      titulo: "Optimización de\nprocesos",
      desc: "Elimine la incertidumbre y tome decisiones rentables basadas en analítica de datos en tiempo real.",
      iconType: "medal"
    },
    {
      id: 4,
      titulo: "Eficiencia\nenergética",
      desc: "Detecte fugas o consumos fantasma de inmediato y reduzca drásticamente los costos de su facturación eléctrica",
      iconType: "medal"
    },
    {
      id: 5,
      titulo: "Cumplimiento\nnormativo",
      desc: "Garantice el respaldo de datos exigido por los entes reguladores de forma automatizada y sin errores humanos",
      iconType: "handshake"
    }
  ];

  // Función para renderizar el SVG correcto según el tipo
  const renderIcon = (type) => {
    switch(type) {
      case 'medal':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bt-svg-icon">
            <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12L7.5 21L12 18.5L16.5 21L15 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        );
      case 'document':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bt-svg-icon">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'handshake':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bt-svg-icon">
            <path d="M9 12L11 14L13 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8H21C21.5523 8 22 8.44772 22 9V12C22 13.6569 20.6569 15 19 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 8H3C2.44772 8 2 8.44772 2 9V12C2 13.6569 3.34315 15 5 15H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="7" y="5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bt-section">
      <div className="bt-container">
        
        {/* ================= ENCABEZADO ================= */}
        <div className="bt-header">
          <h2 className="bt-title">
            <span className="bt-title-light">Beneficios de</span><br />
            <span className="bt-title-dark">implementar sistemas<br />de telemetría</span>
          </h2>
          <p className="bt-subtitle">
            Transforme su operación con datos precisos y control total sobre sus activos industriales.
          </p>
        </div>

        {/* ================= GRID DE TARJETAS ================= */}
        <div className="bt-cards-grid">
          {beneficios.map((card, index) => (
            <div 
              key={card.id} 
              className={`bt-card ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className="bt-icon-circle">
                {renderIcon(card.iconType)}
              </div>
              
              <h3 className="bt-card-title">
                {card.titulo.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              
              <p className="bt-card-desc">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BeneficiosTelemetria;