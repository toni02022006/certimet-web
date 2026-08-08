import React, { useState } from 'react';
import './ProblemasTelemetria.css';

// Importación de la imagen de advertencia según la ruta proporcionada
import imgAdvertencia from '../../../image/ingenieria/mantenimientopredictivo/advertenc.webp';

const ProblemasTelemetria = () => {
  // Estado para controlar qué tarjeta está activa (iluminada en azul)
  // Inicia en 0 para que la primera tarjeta esté activa por defecto.
  const [activeCard, setActiveCard] = useState(0);

  const problemas = [
    {
      id: 0,
      title: "Aislamiento\nOperativo",
      desc: "Paradas no planificadas que afectan la productividad por falta de alertas inmediatas en sus dispositivos."
    },
    {
      id: 1,
      title: "Fallas\nCríticas",
      desc: "Detección tardía de problemas en equipos costosos cuando no hay personal frente al monitor local."
    },
    {
      id: 2,
      title: "Datos\nPerdidos",
      desc: "Falta de historial centralizado en la nube para el análisis predictivo y la toma de decisiones gerenciales."
    },
    {
      id: 3,
      title: "Costos\nElevados",
      desc: "Mantenimiento correctivo y traslados innecesarios al campo que encarecen la operación frente al monitoreo remoto."
    }
  ];

  return (
    <section className="pt-section">
      <div className="pt-container">
        
        {/* Cuadrícula de Tarjetas */}
        <div className="pt-cards-grid">
          {problemas.map((card, index) => (
            <div 
              key={card.id} 
              className={`pt-card ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className="pt-icon-wrapper">
                {/* Imagen de Advertencia en lugar del SVG */}
                <img 
                  src={imgAdvertencia} 
                  alt="Icono de advertencia" 
                  className="pt-warning-icon" 
                />
              </div>
              
              <h3 className="pt-card-title">
                {/* Permite saltos de línea donde pusimos \n en el texto */}
                {card.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              
              <p className="pt-card-desc">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemasTelemetria;