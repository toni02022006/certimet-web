import React, { useState, useEffect } from 'react';
import './NuestrosValores.css';

const valoresData = [
  {
    title: "Vocación de servicio",
    text: "En todos nuestros servicios plasmamos nuestra experiencia y conocimiento con la dedicación y empeño para conseguir la continuación de las actividades de todos nuestros clientes internos como externos."
  },
  {
    title: "Orientación al cliente",
    text: "Nuestra experiencia en el mundo de la Metrología, nos permite acompañar y asesorar al cliente en su toma de decisiones."
  },
  {
    title: "Calidad e innovación",
    text: "Entendemos la calidad como una manera de trabajar y de crecer como empresa. A través de una constante innovación en nuestros procesos, cumplimos con las expectativas de nuestros clientes y nos ajustamos a sus necesidades."
  },
  // Agregamos 2 más para que el bucle infinito del carrusel sea visualmente fluido
  {
    title: "Trabajo en equipo",
    text: "Fomentamos un ambiente colaborativo donde el respeto y la comunicación abierta nos permiten alcanzar nuestras metas y superar los desafíos diarios del sector."
  },
  {
    title: "Mejora continua",
    text: "Buscamos constantemente la excelencia mediante la optimización de nuestros recursos, capacitaciones constantes y la implementación de nuevas tecnologías."
  }
];

const NuestrosValores = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Función para avanzar
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === valoresData.length - 1 ? 0 : prevIndex + 1));
  };

  // Función para retroceder
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? valoresData.length - 1 : prevIndex - 1));
  };

  // Auto-reproducción (cambia cada 4 segundos)
  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(autoPlay); // Limpia el intervalo al desmontar o cambiar de slide
  }, [activeIndex]);

  // Lógica para asignar clases CSS dependiendo de la posición de la tarjeta
  const getCardClass = (index) => {
    const diff = index - activeIndex;
    const total = valoresData.length;
    
    // Normalizamos la diferencia para saber si está a la izquierda, centro o derecha
    let normDiff = diff;
    if (normDiff < -2) normDiff += total;
    if (normDiff > 2) normDiff -= total;

    if (normDiff === 0) return 'card-center'; // Tarjeta activa
    if (normDiff === -1) return 'card-left';  // Tarjeta anterior
    if (normDiff === 1) return 'card-right';  // Tarjeta siguiente
    return 'card-hidden'; // Resto de tarjetas ocultas atrás
  };

  return (
    <section className="valores-section">
      <div className="valores-header">
        <h2>Nuestros valores</h2>
        <p>Los valores que miden nuestra forma de trabajar:</p>
      </div>

      <div className="carousel-container">
        {/* Botón Izquierda */}
        <button className="carousel-arrow left-arrow" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Pista de tarjetas con efecto de máscara de desvanecimiento */}
        <div className="carousel-track">
          {valoresData.map((valor, index) => (
            <div key={index} className={`valor-card ${getCardClass(index)}`}>
              <h3>{valor.title}</h3>
              <p>{valor.text}</p>
            </div>
          ))}
        </div>

        {/* Botón Derecha */}
        <button className="carousel-arrow right-arrow" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NuestrosValores;