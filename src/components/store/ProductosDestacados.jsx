import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductosDestacados.css';

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  
  const sliderRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productos?destacados=true');
      if (response.ok) {
        const data = await response.json();
        // Multiplicamos para el efecto infinito
        setProductos([...data, ...data, ...data, ...data]); 
      }
    } catch (error) {
      console.error('Error al cargar los productos destacados:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // --- LÓGICA DEL MOTOR DEL CARRUSEL ---
  const startScroll = () => {
    if (productos.length === 0) return; 
    
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

  const stopScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  useEffect(() => {
    if (!isHovered && productos.length > 0) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isHovered, productos]);

  const handleManualScroll = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      stopScroll(); 
      const scrollAmount = direction === 'left' ? -260 : 260; 
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        if (!isHovered) startScroll();
      }, 600);
    }
  };

  // Constante para la imagen por defecto (SVG súper ligero en base64)
  const imagenFallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';

  return (
    <section className="productos-destacados-section">
      
      {/* CABECERA */}
      <div className="prod-section-header">
        <h2 className="prod-title">Productos Destacados</h2>
        
        <div className="prod-slider-controls">
          <button className="prod-slider-btn" onClick={() => handleManualScroll('left')}>&#10094;</button>
          <button className="prod-slider-btn" onClick={() => handleManualScroll('right')}>&#10095;</button>
        </div>
      </div>

      {/* CARRUSEL INFINITO */}
      <div 
        className="productos-slider-container"
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}  
        onMouseLeave={() => setIsHovered(false)} 
      >
        {productos.length > 0 ? (
          productos.map((prod, index) => (
            <div key={`${prod.id}-${index}`} className="producto-card">
              
              {/* Contenido enlazado al producto */}
              <Link to={`/producto/${prod.id}`} className="prod-link">
                <div className="prod-img-box">
                  <img 
                    // 👇 1. Aplicamos el Fallback aquí
                    src={prod.imagen_principal_url ? `http://localhost:3000${prod.imagen_principal_url}` : imagenFallback} 
                    alt={prod.nombre} 
                    className="prod-img" 
                    // 👇 2. Y protegemos contra errores 404 del backend
                    onError={(e) => { 
                      if (!e.target.dataset.error) {
                        e.target.dataset.error = true;
                        e.target.src = imagenFallback; 
                      }
                    }}
                  />
                </div>
                
                <div className="prod-info">
                  <p className="prod-marca">{prod.categoria?.nombre || 'MARCA'}</p>
                  <h4 className="prod-titulo">{prod.nombre}</h4>
                  <p className="prod-sku">SKU: {prod.sku}</p>
                  
                  <p className="prod-precio">
                    S/ {Number(prod.precio_regular).toFixed(2)} <span>Inc. IGV</span>
                  </p>
                </div>
              </Link>
              
              {/* Botón de carrito tipo píldora (fuera del Link para que funcione independiente) */}
              <div className="btn-carrito-wrapper">
                <button className="btn-carrito-pill" title="Agregar al carrito">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="loading-text">Cargando productos destacados...</p>
        )}
      </div>

    </section>
  );
};

export default ProductosDestacados;