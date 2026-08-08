import React, { useState } from 'react';
import './BeneficiosTelemetria.css';

// ===============================================================
// IMPORTACIÓN DE ÍCONOS (AZULES - INACTIVOS)
// ===============================================================
import iconTiemposBlue from '../../../image/ingenieria/telemetria/Recurso 37.jpg'; // Reloj
import iconFallasBlue from '../../../image/ingenieria/telemetria/Recurso 45.jpg';   // Wifi / Señal
import iconTrazaBlue from '../../../image/ingenieria/telemetria/Recurso 46.jpg';    // Nube
import iconOptBlue from '../../../image/ingenieria/telemetria/Recurso 44.jpg';      // Chip
import iconEfiBlue from '../../../image/ingenieria/telemetria/Recurso 39.jpg';      // Gráfico
import iconCumpBlue from '../../../image/ingenieria/telemetria/Recurso 40.jpg';     // Check

// ===============================================================
// IMPORTACIÓN DE ÍCONOS (VERDES - ACTIVOS)
// ===============================================================
import iconTiemposGreen from '../../../image/ingenieria/telemetria/Recurso 35.jpg'; 
import iconFallasGreen from '../../../image/ingenieria/telemetria/Recurso 42.jpg';
import iconTrazaGreen from '../../../image/ingenieria/telemetria/Recurso 43.jpg';
import iconOptGreen from '../../../image/ingenieria/telemetria/Recurso 41.jpg';
import iconEfiGreen from '../../../image/ingenieria/telemetria/Recurso 38.jpg';
import iconCumpGreen from '../../../image/ingenieria/telemetria/Recurso 36 (1).jpg';

const BeneficiosTelemetria = () => {
  // Inicia en 5 para que "Cumplimiento normativo" esté activo por defecto (como en tu imagen)
  const [activeCard, setActiveCard] = useState(5);

  // Datos de las tarjetas emparejados con sus respectivas imágenes
  const beneficios = [
    {
      id: 0,
      titulo: "Minimización de\ntiempos de inactividad",
      desc: "Anticípese a las paradas de planta con alertas tempranas enviadas directamente a sus dispositivos.",
      imgBlue: iconTiemposBlue,
      imgGreen: iconTiemposGreen
    },
    {
      id: 1,
      titulo: "Prevención de\nfallas críticas",
      desc: "Resguarde la vida útil de sus equipos de alta precisión mediante supervisión remota 24/7.",
      imgBlue: iconFallasBlue,
      imgGreen: iconFallasGreen
    },
    {
      id: 2,
      titulo: "Trazabilidad\ncompleta",
      desc: "Centralice el histórico de sus variables críticas en la nube para auditorías rápidas y análisis predictivo sin pérdida de datos.",
      imgBlue: iconTrazaBlue,
      imgGreen: iconTrazaGreen
    },
    {
      id: 3,
      titulo: "Optimización de\nprocesos",
      desc: "Elimine la incertidumbre y tome decisiones rentables basadas en analítica de datos en tiempo real.",
      imgBlue: iconOptBlue,
      imgGreen: iconOptGreen
    },
    {
      id: 4,
      titulo: "Eficiencia\nenergética",
      desc: "Detecte fugas o consumos fantasma de inmediato y reduzca drásticamente los costos de su facturación eléctrica",
      imgBlue: iconEfiBlue,
      imgGreen: iconEfiGreen
    },
    {
      id: 5,
      titulo: "Cumplimiento\nnormativo",
      desc: "Garantice el respaldo de datos exigido por los entes reguladores de forma automatizada y sin errores humanos",
      imgBlue: iconCumpBlue,
      imgGreen: iconCumpGreen
    }
  ];

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
          {beneficios.map((card, index) => {
            const isActive = activeCard === index;
            return (
              <div 
                key={card.id} 
                className={`bt-card ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className="bt-icon-wrapper">
                  <img 
                    src={isActive ? card.imgGreen : card.imgBlue} 
                    alt={`Icono ${card.titulo.replace('\n', ' ')}`} 
                    className="bt-icon-img"
                  />
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
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BeneficiosTelemetria;