import React, { useRef, useEffect, useState } from 'react';
import './MarcasTienda.css';

// Captura segura de imágenes con nomenclatura numérica y espacios
const brandFiles = import.meta.glob('../../image/brands/*.webp', { eager: true, import: 'default' });

const marcas = Object.keys(brandFiles).map((path, index) => {
  return {
    id: index,
    src: brandFiles[path],
    name: `Marca ${index + 1}`
  };
});

const MarcasTienda = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const [count, setCount] = useState(1);

  // --- EFECTO DE CONTEO INFINITO ---
  useEffect(() => {
    let timer;
    let timeout;

    const startCounting = () => {
      let currentNumber = 1;
      setCount(currentNumber);
      
      timer = setInterval(() => {
        currentNumber += 1;
        setCount(currentNumber);
        
        if (currentNumber >= 30) {
          clearInterval(timer);
          // Cuando llega a 30, se queda pausado 3 segundos (3000ms) y vuelve a empezar
          timeout = setTimeout(() => {
            startCounting();
          }, 3000); 
        }
      }, 50); // Velocidad a la que suben los números (50ms)
    };

    startCounting();

    // Limpieza al desmontar el componente para evitar fugas de memoria
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  // --- EFECTO DEL CARRUSEL INFINITO ---
  useEffect(() => {
    let animationId;
    const scroll = () => {
      if (carouselRef.current && !isDragging && !isHovered) {
        carouselRef.current.scrollLeft += 1; 
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, isHovered]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="tienda-section marcas-section">
      <h2 className="marcas-title">
        <span className="plus">+</span>{count} <span className="text">Marcas</span>
      </h2>
      
      <div 
        className={`marcas-slider-container ${isDragging ? 'grabbing' : ''}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="marcas-drag-track">
          {marcas.map((marca) => (
            <div className="marca-logo-wrapper" key={`g1-${marca.id}`}>
              <img src={marca.src} alt={marca.name} draggable="false" />
            </div>
          ))}
          {marcas.map((marca) => (
            <div className="marca-logo-wrapper" key={`g2-${marca.id}`}>
              <img src={marca.src} alt={marca.name} draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarcasTienda;