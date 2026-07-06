import React, { useRef, useEffect, useState } from 'react';
import './CategoriasTienda.css';

// Importamos las imágenes
import cat1 from '../../image/categoriasespeciales/categoria1.png';
import cat2 from '../../image/categoriasespeciales/categoria2.png';
import cat3 from '../../image/categoriasespeciales/categoria3.png';
import cat4 from '../../image/categoriasespeciales/categoria4.png';
import cat5 from '../../image/categoriasespeciales/categoria5.png';
import cat6 from '../../image/categoriasespeciales/categoria6.png';

// Lista base de categorías
const categoriasBase = [
  { id: 1, name: 'Automatización y Control', img: cat1 },
  { id: 2, name: 'Analítica', img: cat2 },
  { id: 3, name: 'Variables de Procesos', img: cat3 },
  { id: 4, name: 'Laboratorio', img: cat4 },
  { id: 5, name: 'SSOMA', img: cat5 },
  { id: 6, name: 'Calidad de ambiente', img: cat6 },
];

// Multiplicamos la lista para crear la ilusión de un bucle infinito
const categorias = [...categoriasBase, ...categoriasBase, ...categoriasBase];

const CategoriasTienda = () => {
  const sliderRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // Estado para saber si el mouse está encima

  // Función que enciende el motor del carrusel
  const startScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        slider.scrollLeft += 1.5; // Velocidad
        
        // Bucle infinito: si llega a la mitad (porque lo triplicamos), vuelve al inicio sin que se note
        if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) / 2) {
          slider.scrollLeft = 0;
        }
      }
    }, 20); 
  };

  // Función que apaga el motor
  const stopScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  // Efecto que controla el motor basado en si el mouse está encima o no
  useEffect(() => {
    if (!isHovered) {
      startScroll();
    } else {
      stopScroll();
    }
    // Limpieza al desmontar
    return () => stopScroll();
  }, [isHovered]);

  // Función para las flechas (Click manual)
  const handleManualScroll = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      // 1. Apagamos el motor para que no pelee con el clic
      stopScroll(); 
      
      // 2. Hacemos el movimiento suave
      const scrollAmount = direction === 'left' ? -220 : 220; // Cantidad a deslizar
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // 3. Volvemos a prender el motor después de 600ms (lo que tarda la animación)
      setTimeout(() => {
        if (!isHovered) startScroll();
      }, 600);
    }
  };

  return (
    <section className="tienda-categorias-section">
      
      {/* CABECERA */}
      <div className="cat-section-header">
        <h2 className="cat-title">Categorías destacadas</h2>
        
        <div className="cat-header-actions">
          <a href="/tienda/categorias" className="btn-ver-todas">
            Ver todas las categorías &rarr;
          </a>
          <div className="cat-slider-controls">
            {/* Botones conectados a la nueva función */}
            <button className="cat-slider-btn" onClick={() => handleManualScroll('left')}>&#10094;</button>
            <button className="cat-slider-btn" onClick={() => handleManualScroll('right')}>&#10095;</button>
          </div>
        </div>
      </div>

      {/* CARRUSEL INFINITO */}
      <div 
        className="categorias-slider-container" 
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}  // Pausa al pasar el mouse
        onMouseLeave={() => setIsHovered(false)} // Reanuda al quitar el mouse
      >
        {categorias.map((cat, index) => (
          <div key={`${cat.id}-${index}`} className="categoria-item">
            <div className="categoria-img-box">
              <img src={cat.img} alt={cat.name} className="categoria-img" />
            </div>
            <p className="categoria-name">{cat.name}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default CategoriasTienda;