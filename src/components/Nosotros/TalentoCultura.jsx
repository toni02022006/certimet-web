import React, { useState, useEffect } from 'react';
import './TalentoCultura.css';

// 1. Tu imagen local (asegúrate de que la extensión sea correcta, .png o .jpg)
import img1 from '../../image/nosotros/Talento_Cultura.png'; 

// 2. Imágenes de relleno de internet (cámbialas cuando tengas las tuyas)
const img2 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const img3 = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const img4 = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const img5 = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const img6 = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const carouselImages = [img1, img2, img3, img4, img5, img6];

const TalentoCultura = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-reproducción del carrusel de imágenes cada 4 segundos
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="talento-section">
      <div className="talento-container">
        
        {/* Columna Izquierda: Imagen y Carrusel */}
        <div className="talento-image-col">
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
        <div className="talento-text-col">
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