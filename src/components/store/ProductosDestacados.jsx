import React, { useState, useEffect } from 'react';

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  
  // Estado para el desplazamiento manual de las flechas
  const [desplazamientoManual, setDesplazamientoManual] = useState(0);

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

  // Cada tarjeta mide 225px + 15px de gap = 240px de desplazamiento por clic
  const anchoTarjetaConGap = 240; 

  const moverIzquierda = () => {
    setDesplazamientoManual((prev) => prev + anchoTarjetaConGap);
  };

  const moverDerecha = () => {
    setDesplazamientoManual((prev) => prev - anchoTarjetaConGap);
  };

  // Duplicamos el arreglo para asegurar el bucle continuo del CSS
  const productosInfinitos = [...productos, ...productos];

  return (
    <section className="tienda-section">
      <div className="section-header">
        <h2>Productos Destacados</h2>
        
        {/* Controles de flechas manuales restaurados */}
        <div className="slider-controls">
          <button className="slider-btn" onClick={moverIzquierda}>‹</button>
          <button className="slider-btn" onClick={moverDerecha}>›</button>
        </div>
      </div>

      <div className="slider-infinito-container">
        {/* CAPA DE DESPLAZAMIENTO MANUAL: Controlada por las flechas */}
        <div 
          className="slider-manual-wrapper"
          style={{ 
            transform: `translateX(${desplazamientoManual}px)`,
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            display: 'flex',
            width: 'max-content'
          }}
        >
          {/* CAPA DE ANIMACIÓN CONTINUA: Controlada por el CSS */}
          <div className="slider-infinito-track">
            
            {productosInfinitos.length > 0 ? (
              productosInfinitos.map((prod, index) => (
                <div key={`${prod.id}-${index}`} className="producto-card slide-item">
                  <button className="btn-fav">♡</button>
                  
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