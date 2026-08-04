import React, { useState } from 'react';
import './CarruselSectores.css';

// Imagen provisional solicitada
import imgFondo from '../../../image/ingenieria/imgfondobaner.webp';

const CarruselSectores = () => {
  // Estado para controlar qué tarjeta está en el centro
  const [activeIndex, setActiveIndex] = useState(2);

  // Array con los datos de las 6 tarjetas (basado en los 6 puntos de tu diseño)
  const sectores = [
    {
      id: 0,
      titulo: "Energía",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    },
    {
      id: 1,
      titulo: "Minería",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    },
    {
      id: 2,
      titulo: "Energía",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    },
    {
      id: 3,
      titulo: "Manufactura",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    },
    {
      id: 4,
      titulo: "Petróleo y Gas",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    },
    {
      id: 5,
      titulo: "Agroindustria",
      desc: "CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad"
    }
  ];

  // Funciones para navegar en el carrusel
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === sectores.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? sectores.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="cs-section">
      <div className="cs-container">
        
        {/* ================= ENCABEZADO ================= */}
        <div className="cs-header">
          <h2 className="cs-title">
            Soluciones de telemetría industrial por <span className="cs-title-bold">sector</span>
          </h2>
          <p className="cs-subtitle">
            Tarjetas por industria con el dolor típico y una salida práctica para controlar T&H sin estrés.
          </p>
        </div>

        {/* ================= CONTENEDOR DEL CARRUSEL ================= */}
        <div className="cs-carousel-area">
          
          {/* Botón Anterior */}
          <button className="cs-arrow cs-arrow-left" onClick={prevSlide}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L4 20L20 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Wrapper de las tarjetas */}
          <div className="cs-cards-wrapper">
            {sectores.map((sector, index) => {
              // Lógica para determinar la posición de cada tarjeta
              let positionClass = 'hidden';
              if (index === activeIndex) {
                positionClass = 'active';
              } else if (index === activeIndex - 1 || (activeIndex === 0 && index === sectores.length - 1)) {
                positionClass = 'prev';
              } else if (index === activeIndex + 1 || (activeIndex === sectores.length - 1 && index === 0)) {
                positionClass = 'next';
              }

              return (
                <div key={sector.id} className={`cs-card ${positionClass}`} onClick={() => goToSlide(index)}>
                  
                  {/* Imagen de la tarjeta */}
                  <div className="cs-card-img-wrapper">
                    <img src={imgFondo} alt={sector.titulo} className="cs-card-img" />
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="cs-card-content">
                    <h3 className="cs-card-title">{sector.titulo}</h3>
                    <p className="cs-card-desc">{sector.desc}</p>
                  </div>
                  
                </div>
              );
            })}
          </div>

          {/* Botón Siguiente */}
          <button className="cs-arrow cs-arrow-right" onClick={nextSlide}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20L4 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ================= PAGINACIÓN (Puntitos) ================= */}
        <div className="cs-dots">
          {sectores.map((_, index) => (
            <button
              key={index}
              className={`cs-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CarruselSectores;