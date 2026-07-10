import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  
  // Usamos un índice para saber en qué producto estamos
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productos?destacados=true');
      if (response.ok) {
        const data = await response.json();
        setProductos(data); 
      }
    } catch (error) {
      console.error('Error al cargar los productos destacados:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // --- LÓGICA DEL CARRUSEL ---
  const anchoTarjetaConGap = 240; 

  const moverIzquierda = () => {
    setCurrentIndex((prev) => (prev === 0 ? productos.length - 1 : prev - 1));
  };

  const moverDerecha = () => {
    setCurrentIndex((prev) => (prev >= productos.length - 1 ? 0 : prev + 1));
  };

  // Carrusel automático: Gira cada 3 segundos
  useEffect(() => {
    // Si hay 1 o 0 productos, no tiene sentido que gire
    if (productos.length <= 1) return;

    const intervalo = setInterval(() => {
      moverDerecha();
    }, 3000); // 3000ms = 3 segundos

    // Limpiamos el temporizador si el usuario hace clic para evitar saltos raros
    return () => clearInterval(intervalo);
  }, [productos.length, currentIndex]); 

  return (
    <section className="tienda-section">
      <div className="section-header">
        <h2>Productos Destacados</h2>
        
        {/* Controles de flechas manuales */}
        <div className="slider-controls">
          <button className="slider-btn" onClick={moverIzquierda}>‹</button>
          <button className="slider-btn" onClick={moverDerecha}>›</button>
        </div>
      </div>

      <div className="slider-infinito-container" style={{ overflow: 'hidden' }}>
        {/* CAPA DE DESPLAZAMIENTO: Se mueve según el índice actual */}
        <div 
          className="slider-manual-wrapper"
          style={{ 
            transform: `translateX(-${currentIndex * anchoTarjetaConGap}px)`, // Nota el signo negativo
            transition: 'transform 0.5s ease-in-out',
            display: 'flex',
            width: 'max-content'
          }}
        >
          <div className="slider-infinito-track" style={{ display: 'flex', gap: '15px' }}>
            
            {productos.length > 0 ? (
              productos.map((prod, index) => (
                <div key={`${prod.id}-${index}`} className="producto-card slide-item" style={{ width: '225px' }}>
                  
                  {/* ENLACE AL DETALLE DEL PRODUCTO */}
                  <Link 
                    to={`/producto/${prod.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <img 
                      src={prod.imagen_principal_url ? `http://localhost:3000${prod.imagen_principal_url}` : 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
                      alt={prod.nombre} 
                      className="prod-img" 
                      style={{ borderRadius: '8px', objectFit: 'cover', height: '180px', width: '100%' }}
                    />
                    
                    <p className="prod-marca">{prod.categoria?.nombre || 'CERTIMET'}</p>
                    <h4 className="prod-titulo">{prod.nombre}</h4>
                    <p className="prod-sku">SKU: {prod.sku}</p>
                    
                    <p className="prod-precio">
                      S/ {Number(prod.precio_regular).toFixed(2)} <span>Inc. IGV</span>
                    </p>
                  </Link>
                  
                  <button className="btn-carrito">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%', color: '#666' }}>Cargando productos...</p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductosDestacados;