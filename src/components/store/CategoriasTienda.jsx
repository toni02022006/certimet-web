import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. IMPORTANTE: Importamos Link
import './CategoriasTienda.css';

// Importamos las imágenes
import cat1 from '../../image/categoriasespeciales/categoria1.png';
import cat2 from '../../image/categoriasespeciales/categoria2.png';
import cat3 from '../../image/categoriasespeciales/categoria3.png';
import cat4 from '../../image/categoriasespeciales/categoria4.png';
import cat5 from '../../image/categoriasespeciales/categoria5.png';
import cat6 from '../../image/categoriasespeciales/categoria6.png';

// Lista base de categorías (Asegúrate de que los IDs coincidan con tu base de datos)
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
  const [isHovered, setIsHovered] = useState(false); 

  // Función que enciende el motor del carrusel
  const startScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        slider.scrollLeft += 1.5; 
        
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
    return () => stopScroll();
  }, [isHovered]);

  // Función para las flechas (Click manual)
  const handleManualScroll = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      stopScroll(); 
      
      const scrollAmount = direction === 'left' ? -220 : 220; 
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });

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
          {/* 2. REEMPLAZAMOS <a href> por <Link to> */}
          <Link to="/tienda/catalogo" className="btn-ver-todas">
            Ver todas las categorías &rarr;
          </Link>
          <div className="cat-slider-controls">
            <button className="cat-slider-btn" onClick={() => handleManualScroll('left')}>&#10094;</button>
            <button className="cat-slider-btn" onClick={() => handleManualScroll('right')}>&#10095;</button>
          </div>
        </div>
      </div>

      {/* CARRUSEL INFINITO */}
      <div 
        className="categorias-slider-container" 
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}  
        onMouseLeave={() => setIsHovered(false)} 
      >
        {categorias.map((cat, index) => (
          /* 3. ENVOLVEMOS EL ITEM EN UN <Link> PARA QUE SEA CLIQUEABLE */
          <Link 
            to={`/tienda/categoria/${cat.id}`} 
            key={`${cat.id}-${index}`} 
            className="categoria-item"
            style={{ textDecoration: 'none' }} // Para que no se subraye el texto
          >
            <div className="categoria-img-box">
              <img src={cat.img} alt={cat.name} className="categoria-img" />
            </div>
            <p className="categoria-name">{cat.name}</p>
          </Link>
        ))}
      </div>
      
    </section>
  );
};

export default CategoriasTienda;