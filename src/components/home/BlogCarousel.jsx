import React, { useState, useEffect } from 'react';
import './BlogCarousel.css';

// Importamos la imagen de prueba que me pasaste
import blogImg from '../../image/blog.png';

// Iconos SVG simples para el autor y compartir (Idénticos al diseño)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

const BlogCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Generamos 10 tarjetas ficticias con la misma imagen
  const cards = Array(10).fill({
    img: blogImg,
    category: 'Laboratorio de Masa',
    title: 'Recomendaciones para detectar problemas con tu báscula',
    desc: 'CERTIMET cuenta con triple certificación ISO, resultado de su compromiso con la mejora continua y la calidad',
    author: 'CERTIMET',
    date: '02 de julio, 2026'
  });

  // Movimiento automático cada 3.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Lógica para asignar la clase correcta según la posición de la tarjeta
  const getCardPositionClass = (index) => {
    if (index === activeIndex) return 'blog-card active';
    if (index === (activeIndex - 1 + cards.length) % cards.length) return 'blog-card prev';
    if (index === (activeIndex + 1) % cards.length) return 'blog-card next';
    return 'blog-card hidden';
  };

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2 className="blog-section-title">Nuestro <strong>Blog</strong></h2>
      </div>
      
      <div className="blog-carousel-container">
        {cards.map((card, index) => (
          <div key={index} className={getCardPositionClass(index)}>
            <div className="blog-card-img-wrapper">
              <img src={card.img} alt="Certimet Blog" className="blog-card-img" />
            </div>
            <div className="blog-card-content">
              <p className="blog-category">
                <span className="blog-line">—</span> {card.category}
              </p>
              <h3 className="blog-title">{card.title}</h3>
              <p className="blog-desc">{card.desc}</p>
              <div className="blog-footer">
                <div className="blog-author-info">
                  <UserIcon />
                  <span>{card.author} - {card.date}</span>
                </div>
                <div className="blog-share">
                  <ShareIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="blog-pagination">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`blog-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogCarousel;