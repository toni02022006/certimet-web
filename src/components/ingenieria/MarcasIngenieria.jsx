import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MarcasIngenieria.css';

// 1. IMPORTACIONES
import rec283 from '../../image/brands/Recurso 283.webp';
import rec284 from '../../image/brands/Recurso 284.webp';
import rec285 from '../../image/brands/Recurso 285.webp';
import rec286 from '../../image/brands/Recurso 286.webp';
import rec287 from '../../image/brands/Recurso 287.webp';
import rec288 from '../../image/brands/Recurso 288.webp';
import rec289 from '../../image/brands/Recurso 289.webp'; 
import rec290 from '../../image/brands/Recurso 290.webp';
import rec291 from '../../image/brands/Recurso 291.webp';
import rec292 from '../../image/brands/Recurso 292.webp';
import rec293 from '../../image/brands/Recurso 293.webp';
import rec294 from '../../image/brands/Recurso 294.webp';
import rec295 from '../../image/brands/Recurso 295.webp';
import rec296 from '../../image/brands/Recurso 296.webp';
import rec297 from '../../image/brands/Recurso 297.webp';
import rec298 from '../../image/brands/Recurso 298.webp';
import rec299 from '../../image/brands/Recurso 299.webp';
import rec300 from '../../image/brands/Recurso 300.webp';
import rec301 from '../../image/brands/Recurso 301.webp';
import rec302 from '../../image/brands/Recurso 302.webp';
import rec303 from '../../image/brands/Recurso 303.webp';
import rec304 from '../../image/brands/Recurso 304.webp';

const brandsData = [
  { id: 283, src: rec283 }, { id: 284, src: rec284 }, { id: 285, src: rec285 },
  { id: 286, src: rec286 }, { id: 287, src: rec287 }, { id: 288, src: rec288 },
  { id: 289, src: rec289 }, { id: 290, src: rec290 }, { id: 291, src: rec291 },
  { id: 292, src: rec292 }, { id: 293, src: rec293 }, { id: 294, src: rec294 },
  { id: 295, src: rec295 }, { id: 296, src: rec296 }, { id: 297, src: rec297 },
  { id: 298, src: rec298 }, { id: 299, src: rec299 }, { id: 300, src: rec300 },
  { id: 301, src: rec301 }, { id: 302, src: rec302 }, { id: 303, src: rec303 },
  { id: 304, src: rec304 },
];

const MarcasIngenieria = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setItemsPerPage(2);
      else if (window.innerWidth < 900) setItemsPerPage(4);
      else setItemsPerPage(6);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const logoChunks = chunkArray(brandsData, itemsPerPage);
  const totalPages = logoChunks.length;

  useEffect(() => {
    if (isHovered) return; 
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 4000); 

    return () => clearInterval(timer);
  }, [totalPages, isHovered]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    } else if (offset > 50 || velocity > 500) {
      setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    }
  };

  return (
    <section className="mi-section">
      <div className="mi-container">
        
        <h2 className="mi-title">
          <span className="mi-text-blue">Nos respaldan </span>
          <span className="mi-text-green">
            las mejores marcas<br />
            que definen la industria.
          </span>
        </h2>

        <div 
          className="mi-carousel-viewport"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="mi-carousel-track"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {logoChunks.map((chunk, pageIndex) => (
              <div key={pageIndex} className="mi-carousel-page">
                {chunk.map((brand) => (
                  <div key={brand.id} className="mi-logo-wrapper">
                    {/* AQUÍ ESTÁ LA SOLUCIÓN: Usamos la imagen como máscara */}
                    <div 
                      className="mi-logo-mask"
                      style={{
                        WebkitMaskImage: `url(${brand.src})`,
                        maskImage: `url(${brand.src})`
                      }}
                      title={`Marca ${brand.id}`}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mi-dots-container">
          {logoChunks.map((_, idx) => (
            <button
              key={idx}
              className={`mi-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a la página ${idx + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MarcasIngenieria;