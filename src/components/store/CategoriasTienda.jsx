import React from 'react';

const categorias = [
  { id: 1, name: 'Categoría', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Categoría', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Categoría', img: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Categoría', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Categoría', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80' },
];

const CategoriasTienda = () => {
  return (
    <section className="tienda-section">
      <div className="section-header">
        <h2>Categorías destacadas</h2>
        <div className="section-header-actions">
          <a href="#" className="link-ver-todas">Ver todas las categorías <span>→</span></a>
          <div className="slider-controls">
            <button className="slider-btn">‹</button>
            <button className="slider-btn">›</button>
          </div>
        </div>
      </div>

      <div className="categorias-grid">
        {categorias.map((cat) => (
          <div key={cat.id} className="categoria-item">
            <div className="categoria-img-box">
              <img src={cat.img} alt={cat.name} style={{borderRadius: '10px'}}/>
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriasTienda;