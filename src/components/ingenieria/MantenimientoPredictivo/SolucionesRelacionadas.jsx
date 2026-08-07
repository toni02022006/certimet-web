import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SolucionesRelacionadas.css';

// ===============================================================
// IMPORTS DE IMÁGENES DE FONDO (CLARAS)
// ===============================================================
import imgAuto7 from '../../../image/ingenieria/mantenimientopredictivo/Auto7.webp';
import imgAuto9 from '../../../image/ingenieria/mantenimientopredictivo/Auto9.webp';
import imgAuto8 from '../../../image/ingenieria/mantenimientopredictivo/Auto8.webp';
import imgAuto10 from '../../../image/ingenieria/mantenimientopredictivo/Auto10.webp';
import imgAuto6 from '../../../image/ingenieria/mantenimientopredictivo/Auto6.webp';

// ===============================================================
// IMPORTS DE IMÁGENES DE FONDO (OSCURAS HOVER)
// ===============================================================
import imgAuto2 from '../../../image/ingenieria/mantenimientopredictivo/Auto2.webp';
import imgAuto4_1 from '../../../image/ingenieria/mantenimientopredictivo/Auto4_1.webp';
import imgAuto3 from '../../../image/ingenieria/mantenimientopredictivo/Auto3.webp';
import imgAuto5 from '../../../image/ingenieria/mantenimientopredictivo/Auto5.webp';
import imgAuto1 from '../../../image/ingenieria/mantenimientopredictivo/Auto1.webp';

// ===============================================================
// ARRAY COMPLETO CON 5 SOLUCIONES
// ===============================================================
const solucionesData = [
  { 
    name: 'Mantenimiento\nPredictivo', 
    img: imgAuto7, 
    hoverImg: imgAuto2, 
    path: '/ingenieria/mantenimiento-predictivo'
  },
  { 
    name: 'Control de\nProcesos', 
    img: imgAuto9, 
    hoverImg: imgAuto4_1, 
    path: '/ingenieria/control-procesos'
  },
  { 
    name: 'Visión\nArtificial', 
    img: imgAuto8, 
    hoverImg: imgAuto3, 
    path: '/ingenieria/vision-artificial'
  },
  { 
    name: 'Eficiencia\nEnergética', 
    img: imgAuto10, 
    hoverImg: imgAuto5, 
    path: '/ingenieria/eficiencia-energetica'
  },
  { 
    name: 'Sistemas de\nTelemetría 4.0', 
    img: imgAuto6, 
    hoverImg: imgAuto1, 
    path: '/ingenieria/sistemas-telemetria'
  }
];

// ===============================================================
// COMPONENTE PRINCIPAL
// ===============================================================
const SolucionesRelacionadas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSoluciones = solucionesData.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSoluciones);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSoluciones) % totalSoluciones);

  // Mostramos 3 tarjetas visibles
  const visibleSoluciones = [
    solucionesData[currentIndex % totalSoluciones],
    solucionesData[(currentIndex + 1) % totalSoluciones],
    solucionesData[(currentIndex + 2) % totalSoluciones]
  ];

  return (
    <section className="sr-section">
      <div className="sr-container">
        
        {/* Banner Superior Adaptado a Ingeniería */}
        <div className="sr-banner-wrapper">
          <div className="sr-banner">
            <p className="sr-banner-quote">"La automatización no reemplaza el talento, lo potencia."</p>
            <p className="sr-banner-subtext">
              Nuestros especialistas combinan tecnología de punta con <br/><span className="text-green">criterio técnico para lograr procesos eficientes.</span>
            </p>
          </div>
        </div>

        <div className="sr-header">
          <h2 className="sr-title">
            Soluciones industriales <span className="text-green">relacionadas</span>
          </h2>
        </div>

        <div className="sr-carousel-container">
          
          {/* Flecha Izquierda */}
          <button className="sr-arrow-btn" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Tarjetas Visibles */}
          <div className="sr-cards-wrapper">
            {visibleSoluciones.map((solucion, index) => {
              const isCenter = index === 1; 
              return (
                <div key={index} className={`sr-card ${isCenter ? 'is-center' : ''}`}>
                  
                  {/* Fondos */}
                  <div className="sr-image-container">
                    <img src={solucion.img} alt={`Fondo ${solucion.name}`} className="sr-img-default" />
                    <div className="sr-light-overlay"></div>
                    <img src={solucion.hoverImg} alt={`Fondo Oscuro ${solucion.name}`} className="sr-img-hover" />
                  </div>

                  {/* Contenido (Textos y Botón) */}
                  <div className="sr-content theme-green">
                    <h3 className="sr-card-title">
                      {solucion.name.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          <strong>{line}</strong><br />
                        </React.Fragment>
                      ))}
                    </h3>
                    <Link to={solucion.path} className="sr-link-btn">
                      Conoce nuestro servicio &rarr;
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Flecha Derecha */}
          <button className="sr-arrow-btn" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>

        <div className="sr-footer-action">
          <Link to="/ingenieria" className="btn-todas-soluciones">
            Todas nuestras soluciones &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SolucionesRelacionadas;