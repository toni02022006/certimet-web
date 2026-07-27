import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogCarousel.css';

import defaultBlogImg from '../../image/blog.png';

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

const PrevArrow = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
  </svg>
);

const NextArrow = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);

const BlogCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blog/recent');
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCards(data);
          }
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  useEffect(() => {
    if (cards.length === 0) return; 

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [cards.length, activeIndex]); 

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  const getCardPositionClass = (index) => {
    if (cards.length === 0) return 'blog-card hidden';
    if (index === activeIndex) return 'blog-card active';
    if (index === (activeIndex - 1 + cards.length) % cards.length) return 'blog-card prev';
    if (index === (activeIndex + 1) % cards.length) return 'blog-card next';
    return 'blog-card hidden';
  };

  if (loading) {
    return (
      <section className="blog-section">
        <div className="blog-header">
          <h2 className="blog-section-title">Nuestro <strong className="text-shimmer">Blog</strong></h2>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#0056b3' }}>
          Cargando artículos...
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2 className="blog-section-title">Nuestro <strong className="text-shimmer">Blog</strong></h2>
      </div>
      
      {cards.length > 0 ? (
        <>
          <div className="blog-carousel-container">
            <button className="blog-arrow prev-arrow" onClick={handlePrev} aria-label="Artículo anterior">
              <PrevArrow />
            </button>

            {cards.map((card, index) => (
              <div key={card.id || index} className={getCardPositionClass(index)}>
                <div className="blog-card-img-wrapper">
                  <img src={card.img || defaultBlogImg} alt={card.title} className="blog-card-img" />
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
                      <span>{card.author} - {new Date(card.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="blog-share">
                      <ShareIcon />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="blog-arrow next-arrow" onClick={handleNext} aria-label="Siguiente artículo">
              <NextArrow />
            </button>
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
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
          Aún no hay artículos publicados.
        </div>
      )}

      <div className="blog-button-wrapper">
        <Link to="/blog" className="blog-btn">
          Ver todos los artículos
        </Link>
      </div>
    </section>
  );
};

export default BlogCarousel;