import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AsesoramientoCTA.css';

const AsesoramientoCTA = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observador para detectar cuándo el componente está en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Esto permite que el efecto se repita al subir y bajar
      }
    }, { threshold: 0.3 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, []);

  // Función para renderizar el texto con efecto Flip 3D letra por letra
  const renderTextWithFlip = (text, baseClass, startDelay = 0) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {word.split('').map((char, charIndex) => {
          // Calculamos el retraso secuencial para cada letra
          const delay = startDelay + (wordIndex * 0.1) + (charIndex * 0.03);
          return (
            <span
              key={charIndex}
              className={`flip-char ${isVisible ? 'animate' : ''} ${baseClass}`}
              style={{ animationDelay: `${delay}s` }}
            >
              {char}
            </span>
          );
        })}
        {' '}
      </span>
    ));
  };

  return (
    <section className="asesoramiento-cta-section" ref={containerRef}>
      
      {/* Resplandor animado de fondo */}
      <div className="cta-glow-bg"></div> 

      <div className="asesoramiento-container">
        
        <h2 className="cta-titulo">
          {/* Aplicamos la función a cada parte del título con sus colores */}
          {renderTextWithFlip("¿Buscas", "texto-azul", 0)}
          {renderTextWithFlip(" asesoramiento técnico?", "texto-verde", 0.3)}
        </h2>
        
        {/* Subtítulo con efecto Blur Reveal */}
        <p className={`cta-subtitulo ${isVisible ? 'blur-in' : ''}`}>
          Nuestro equipo técnico te asesora en calibración,<br />
          mantenimiento, acreditaciones y verificaciones metrológicas.
        </p>

        {/* Botón con entrada deslizante y efectos modernos */}
        <div className={`cta-btn-wrapper ${isVisible ? 'slide-up' : ''}`}>
          <Link to="/contacto" className="cta-boton-moderno">
            <span className="boton-texto">Contáctanos</span>
            <span className="boton-flecha">→</span>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default AsesoramientoCTA;