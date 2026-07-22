import React, { useState, useEffect, useRef } from 'react';
import './TalentoCultura.css';

// 1. Imágenes locales mapeadas según tus rutas
import img1 from '../../image/laboratorio/talentocultura/IMG_0786.jpeg'; 
import img2 from '../../image/laboratorio/talentocultura/IMG_0804.jpeg';
import img3 from '../../image/laboratorio/talentocultura/IMG_4013.jpeg';
import img4 from '../../image/laboratorio/talentocultura/Mesa_trabajo.jpeg';
import img5 from '../../image/laboratorio/talentocultura/dsefa.jpeg';

// Solo dejamos tus 5 imágenes
const carouselImages = [img1, img2, img3, img4, img5];

const TalentoCultura = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Referencias para las animaciones al hacer scroll
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // Auto-reproducción del carrusel cada 4 segundos
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  // Lógica para detectar el Scroll (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si entra a la pantalla, añade la clase visible
          entry.target.classList.add('visible');
        } else {
          // Si sale de la pantalla, quita la clase para que el efecto se repita al volver
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <section className="talento-section">
      <div className="talento-container">
        
        {/* Columna Izquierda: Imagen y Carrusel */}
        <div className="talento-image-col scroll-effect" ref={imageRef}>
          <div className="image-wrapper">
            <img 
              src={carouselImages[currentSlide]} 
              alt={`Talento y Cultura ${currentSlide + 1}`} 
              className="talento-img"
            />
          </div>
          
          {/* Puntos de paginación (Dots) */}
          <div className="talento-dots">
            {carouselImages.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${currentSlide === index ? 'active-dot' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Texto */}
        <div className="talento-text-col scroll-effect delay-1" ref={textRef}>
          <h2>Talento y Cultura</h2>
          
          <p>
            Las personas son el corazón de nuestro trabajo en CERTIMET. Detrás de cada cali-
            bración, cada proyecto de automatización y cada servicio técnico, hay un equipo
            humano comprometido con hacer las cosas bien, con precisión y con vocación de
            servicio.
          </p>

          <p>
            Fomentamos un ambiente de trabajo donde el aprendizaje continuo, el respeto y la
            colaboración son la base de cada logro. Creemos firmemente en el desarrollo pro-
            fesional de nuestro equipo, invirtiendo en su formación técnica y acompañándolo
            en su crecimiento, porque sabemos que las capacidades de nuestra gente son el
            motor que impulsa la calidad de nuestros servicios.
          </p>

          <p>
            Impulsamos una cultura cercana, colaborativa y comprometida con la excelencia
            técnica, donde cada persona encuentra el espacio para aportar sus ideas, seguir
            aprendiendo y crecer junto con la empresa. Esa es, en esencia, la cultura que nos
            define: un equipo unido por la pasión de hacer bien las cosas.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TalentoCultura;