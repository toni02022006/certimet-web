import React, { useState, useEffect } from 'react';
import './CarruselSectores.css';

// ===============================================================
// IMPORTACIÓN DE IMÁGENES EXACTAS
// ===============================================================
import imgMineria from '../../../image/ingenieria/telemetria/Mineria.jpg';
import imgEnergia from '../../../image/ingenieria/telemetria/Energia.jpg';
import imgAgro from '../../../image/ingenieria/telemetria/Agroindustria.jpg';
import imgOilGas from '../../../image/ingenieria/telemetria/Oil-Gas.jpg';
import imgAlimentos from '../../../image/ingenieria/telemetria/Alimentos-y-Farmaceutica.jpg';
import imgAguas from '../../../image/ingenieria/telemetria/Tratamiento-de-Aguas.jpg';

const CarruselSectores = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false); // Para pausar al pasar el mouse

  const sectores = [
    {
      id: 0,
      titulo: "Minería",
      desc: "Monitoreo de equipos pesados y control de procesos en tiempo real para operaciones en ubicaciones remotas y extremas.",
      img: imgMineria
    },
    {
      id: 1,
      titulo: "Energía",
      desc: "Supervisión de subestaciones, líneas de transmisión y plantas generadoras para garantizar la continuidad del suministro.",
      img: imgEnergia
    },
    {
      id: 2,
      titulo: "Agroindustria",
      desc: "Control de variables ambientales y sistemas de riego para maximizar el rendimiento y calidad de los cultivos.",
      img: imgAgro
    },
    {
      id: 3,
      titulo: "Oil & Gas",
      desc: "Telemetría para tuberías y refinerías, previniendo fugas y optimizando la extracción con máxima seguridad.",
      img: imgOilGas
    },
    {
      id: 4,
      titulo: "Alimentos y Farmacéutica",
      desc: "Trazabilidad de cadena de frío y variables críticas para cumplir con las normativas de calidad y sanidad más estrictas.",
      img: imgAlimentos
    },
    {
      id: 5,
      titulo: "Tratamiento de Aguas",
      desc: "Control de niveles, caudales y calidad de agua en plantas potabilizadoras y redes de distribución urbana.",
      img: imgAguas
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === sectores.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? sectores.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Efecto para el movimiento continuo (Autoplay)
  useEffect(() => {
    let interval;
    // Si el usuario no tiene el mouse encima, el carrusel se mueve solo
    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 3500); // Cambia de tarjeta cada 3.5 segundos
    }
    return () => clearInterval(interval); // Limpia el intervalo al desmontar o pausar
  }, [isHovered, activeIndex]);

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
        <div 
          className="cs-carousel-area"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Botón Anterior */}
          <button className="cs-arrow cs-arrow-left" onClick={prevSlide}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L4 20L20 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Wrapper de las tarjetas */}
          <div className="cs-cards-wrapper">
            {sectores.map((sector, index) => {
              // Lógica de posiciones
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
                    <img src={sector.img} alt={sector.titulo} className="cs-card-img" />
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