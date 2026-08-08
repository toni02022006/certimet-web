import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
  const [mostrar, setMostrar] = useState(false);
  const [animarSalida, setAnimarSalida] = useState(false);

  useEffect(() => {
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    if (!cookiesAceptadas) {
      setTimeout(() => setMostrar(true), 500);
    }
  }, []);

  const aceptarCookies = () => {
    localStorage.setItem('cookiesAceptadas', 'true');
    setAnimarSalida(true);
    
    setTimeout(() => {
      setMostrar(false);
    }, 400);
  };

  if (!mostrar) return null;

  return (
    <div className={`cookie-banner-wrapper ${animarSalida ? 'slide-down' : 'slide-up'}`}>
      <div className="cookie-floating-card">
        
        <div className="cookie-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8.5 8.5v.01"></path>
            <path d="M16 12.5v.01"></path>
            <path d="M12 16v.01"></path>
            <path d="M11 7v.01"></path>
            <path d="M7 12v.01"></path>
            <path d="M12 2a10 10 0 0 0-7 7c1.5 0 2.5-1 4-2.5 0 2.5 2 4.5 4.5 4.5-1.5 1.5-1.5 3.5-1.5 5.5"></path>
          </svg>
        </div>

        <div className="cookie-content-text">
          <h4 className="cookie-title">Tu privacidad es importante</h4>
          <p className="cookie-text">
            Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
          </p>
        </div>

        <button className="cookie-btn-modern" onClick={aceptarCookies}>
          Aceptar cookies
        </button>
        
      </div>
    </div>
  );
};

export default CookieBanner;