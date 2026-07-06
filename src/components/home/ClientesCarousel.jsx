import React, { useRef, useEffect, useState } from 'react';
import './ClientesCarousel.css';

// Forzamos un espectro amplio en el glob para capturar espacios y caracteres especiales
const svgFiles = import.meta.glob('../../image/clients/*.svg', { eager: true, import: 'default' });

const procesarClientes = () => {
  const agrupados = {};

  Object.keys(svgFiles).forEach((path) => {
    const urlLogo = svgFiles[path];
    const nombreArchivo = path.split('/').pop().replace(/\.svg$/i, '');
    
    const esPlomo = /plomo/i.test(nombreArchivo);
    const nombreLimpio = nombreArchivo
      .replace(/[-_ ]?plomo/i, '')
      .replace(/^CLIENTES_/i, '')
      .trim();

    if (!agrupados[nombreLimpio]) {
      agrupados[nombreLimpio] = { id: nombreLimpio, name: nombreLimpio, plomo: '', color: '' };
    }

    if (esPlomo) {
      agrupados[nombreLimpio].plomo = urlLogo;
    } else {
      agrupados[nombreLimpio].color = urlLogo;
    }
  });

  return Object.values(agrupados).filter(cliente => cliente.plomo && cliente.color);
};

const clientes = procesarClientes();

const ClientesCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    <section className="clientes-section">
      <div 
        className={`clientes-slider-container ${isDragging ? 'grabbing' : ''}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="clientes-drag-track">
          {clientes.map((cliente) => (
            <div className="cliente-logo-wrapper" key={`g1-${cliente.id}`}>
              <img src={cliente.plomo} alt={cliente.name} className="logo-plomo" draggable="false" />
              <img src={cliente.color} alt={cliente.name} className="logo-color" draggable="false" />
            </div>
          ))}
          {clientes.map((cliente) => (
            <div className="cliente-logo-wrapper" key={`g2-${cliente.id}`}>
              <img src={cliente.plomo} alt={cliente.name} className="logo-plomo" draggable="false" />
              <img src={cliente.color} alt={cliente.name} className="logo-color" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientesCarousel;