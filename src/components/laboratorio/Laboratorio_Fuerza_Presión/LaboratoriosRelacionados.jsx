import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LaboratoriosRelacionados.css';

// --- IMPORTACIONES DE IMÁGENES DE FONDO (CLARAS) ---
import fisicoImg from '../../../image/laboratorio/nlds/Fisico.webp';
import masaImg from '../../../image/laboratorio/nlds/Masa.webp';
import elecImg from '../../../image/laboratorio/nlds/Elec.webp';
import longImg from '../../../image/laboratorio/nlds/Long.webp';
import tempImg from '../../../image/laboratorio/nlds/Temp.webp';

// --- IMPORTACIONES DE IMÁGENES DE FONDO (OSCURAS HOVER) ---
import fisicoHover from '../../../image/laboratorio/nlds/Recurso 8.webp';
import masaHover from '../../../image/laboratorio/nlds/Recurso 10.webp';
import elecHover from '../../../image/laboratorio/nlds/Recurso 6.webp';
import longHover from '../../../image/laboratorio/nlds/Recurso 7.webp';
import tempHover from '../../../image/laboratorio/nlds/Recurso 11.webp';

// --- IMPORTACIÓN SELLO INACAL ---
import inacalImg from '../../../image/laboratorio/nlds/inacal.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (BLANCOS) ---
import fisicoIcon from '../../../image/header_icons/fisico.webp';
import masaIcon from '../../../image/header_icons/masa.webp';
import elecIcon from '../../../image/header_icons/elec.webp';
import longIcon from '../../../image/header_icons/longitud.webp';
import tempIcon from '../../../image/header_icons/temperatura.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (VERDES HOVER) ---
import fisicoIconHover from '../../../image/header_icons/header_iconsverde/fisico.webp';
import masaIconHover from '../../../image/header_icons/header_iconsverde/masa.webp';
import elecIconHover from '../../../image/header_icons/header_iconsverde/elec.webp';
import longIconHover from '../../../image/header_icons/header_iconsverde/longitud.webp';
import tempIconHover from '../../../image/header_icons/header_iconsverde/temperatura.webp';

const laboratoriosRelacionadosData = [
  { name: 'Fisicoquímico', img: fisicoImg, hoverImg: fisicoHover, icon: fisicoIcon, hoverIcon: fisicoIconHover, isGreen: false, showInacal: false },
  { name: 'Masa', img: masaImg, hoverImg: masaHover, icon: masaIcon, hoverIcon: masaIconHover, isGreen: true, showInacal: true },
  { name: 'Electricidad', img: elecImg, hoverImg: elecHover, icon: elecIcon, hoverIcon: elecIconHover, isGreen: false, showInacal: false },
  { name: 'Longitud', img: longImg, hoverImg: longHover, icon: longIcon, hoverIcon: longIconHover, isGreen: false, showInacal: false },
  { name: 'Temperatura', img: tempImg, hoverImg: tempHover, icon: tempIcon, hoverIcon: tempIconHover, isGreen: false, showInacal: true }
];

const LaboratoriosRelacionados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalLabs = laboratoriosRelacionadosData.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalLabs);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalLabs) % totalLabs);

  const visibleLabs = [
    laboratoriosRelacionadosData[currentIndex],
    laboratoriosRelacionadosData[(currentIndex + 1) % totalLabs],
    laboratoriosRelacionadosData[(currentIndex + 2) % totalLabs]
  ];

  return (
    <section className="lr-section">
      <div className="lr-container">
        
        <div className="lr-banner-wrapper">
          <div className="lr-banner">
            <p className="lr-banner-quote">"Grandes resultados nacen de equipos comprometidos."</p>
            <p className="lr-banner-subtext">
              El talento humano es la fuerza que <span className="text-green">impulsa cada<br/>proyecto que emprendemos.</span>
            </p>
          </div>
        </div>

        <div className="lr-header">
          <h2 className="lr-title">
            Laboratorios <span className="text-green">relacionados</span>
          </h2>
        </div>

        <div className="lr-carousel-container">
          
          {/* Flecha Izquierda */}
          <button className="lr-arrow-btn" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Tarjetas Visibles */}
          <div className="lr-cards-wrapper">
            {visibleLabs.map((lab, index) => {
              // El index 1 siempre será la tarjeta del centro en nuestro array de 3
              const isCenter = index === 1; 
              
              return (
                <div key={index} className={`lr-card ${isCenter ? 'is-center' : ''}`}>
                  
                  {/* Fondos */}
                  <div className="lr-image-container">
                    <img src={lab.img} alt={`Fondo ${lab.name}`} className="lr-img-default" />
                    <div className="lr-light-overlay"></div>
                    <img src={lab.hoverImg} alt={`Fondo Oscuro ${lab.name}`} className="lr-img-hover" />
                  </div>

                  {/* Sello INACAL */}
                  {lab.showInacal && (
                    <div className="lr-inacal-badge">
                      <img src={inacalImg} alt="Sello INACAL Acreditado" />
                    </div>
                  )}

                  {/* Icono de Especialidad */}
                  <div className="lr-card-icon-wrapper">
                    <img src={lab.icon} alt={`Icono ${lab.name}`} className="lr-icon-default" />
                    <img src={lab.hoverIcon} alt={`Icono Hover ${lab.name}`} className="lr-icon-hover" />
                  </div>

                  {/* Contenido (Textos y Botón) */}
                  <div className={`lr-content ${lab.isGreen || isCenter ? 'theme-green' : ''}`}>
                    <h3 className="lr-card-title">
                      <span className="lr-card-subtitle">Laboratorio de</span>
                      <br />
                      <strong>{lab.name}</strong>
                    </h3>
                    <Link to="/laboratorio" className="lr-link-btn">
                      Conoce nuestro servicio &rarr;
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Flecha Derecha */}
          <button className="lr-arrow-btn" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>

        <div className="lr-footer-action">
          <Link to="/laboratorio" className="btn-todos-labs">
            Todos nuestros laboratorios &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LaboratoriosRelacionados;