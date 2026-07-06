import React from 'react';

const HeroTienda = () => {
  return (
    <div className="hero-tienda">
      {/* Imagen industrial de fondo como placeholder */}
      <img 
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80" 
        alt="Equipos de medición" 
        className="hero-tienda-bg"
      />
      <button className="hero-arrow left">‹</button>
      <button className="hero-arrow right">›</button>
    </div>
  );
};

export default HeroTienda;