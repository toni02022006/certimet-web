import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LaboratoriosRelacionados.css';

// ===============================================================
// IMPORTS DE IMÁGENES DE FONDO (CLARAS) – Igual que NuestrosLaboratorios
// ===============================================================
import tempImg from '../../../image/laboratorio/nlds/Temp.webp';
import masaImg from '../../../image/laboratorio/nlds/Masa.webp';
import fuerzaImg from '../../../image/laboratorio/nlds/Fuerza.webp';
import fisicoImg from '../../../image/laboratorio/nlds/Fisico.webp';
import longImg from '../../../image/laboratorio/nlds/Long.webp';
import elecImg from '../../../image/laboratorio/nlds/Elec.webp';
import humedadImg from '../../../image/laboratorio/nlds/Humedad.webp';
import tiempoImg from '../../../image/laboratorio/nlds/Tiempo y Fre.webp';
import fotometriaImg from '../../../image/laboratorio/nlds/Fotometri.webp';
import flujoImg from '../../../image/laboratorio/nlds/Flujo.webp';

// ===============================================================
// IMPORTS DE IMÁGENES DE FONDO (OSCURAS HOVER)
// ===============================================================
import tempHover from '../../../image/laboratorio/nlds/Recurso 11.webp';
import masaHover from '../../../image/laboratorio/nlds/Recurso 10.webp';
import fuerzaHover from '../../../image/laboratorio/nlds/Recurso 9.webp';
import fisicoHover from '../../../image/laboratorio/nlds/Recurso 8.webp';
import longHover from '../../../image/laboratorio/nlds/Recurso 7.webp';
import elecHover from '../../../image/laboratorio/nlds/Recurso 6.webp';
import humedadHover from '../../../image/laboratorio/nlds/Recurso 5.webp';
import tiempoHover from '../../../image/laboratorio/nlds/Recurso 4.webp';
import fotometriaHover from '../../../image/laboratorio/nlds/Recurso 2.webp';
import flujoHover from '../../../image/laboratorio/nlds/Recurso 3.webp';

// ===============================================================
// IMPORTACIÓN SELLO INACAL
// ===============================================================
import inacalImg from '../../../image/laboratorio/nlds/inacal.webp';

// ===============================================================
// IMPORTS DE ICONOS (BLANCOS) – Igual que NuestrosLaboratorios
// ===============================================================
import tempIcon from '../../../image/header_icons/temperatura.webp';
import masaIcon from '../../../image/header_icons/masa.webp';
import fuerzaIcon from '../../../image/header_icons/fuerza.webp';
import fisicoIcon from '../../../image/header_icons/fisico.webp';
import longIcon from '../../../image/header_icons/longitud.webp';
import elecIcon from '../../../image/header_icons/elec.webp';
import humedadIcon from '../../../image/header_icons/humedad.webp';
import tiempoIcon from '../../../image/header_icons/tempo.webp';
import fotometriaIcon from '../../../image/header_icons/fotometria.webp';
import flujoIcon from '../../../image/header_icons/flujo.webp';

// ===============================================================
// IMPORTS DE ICONOS (VERDES HOVER)
// ===============================================================
import tempIconHover from '../../../image/header_icons/header_iconsverde/temperatura.webp';
import masaIconHover from '../../../image/header_icons/header_iconsverde/masa.webp';
import fuerzaIconHover from '../../../image/header_icons/header_iconsverde/fuerza.webp';
import fisicoIconHover from '../../../image/header_icons/header_iconsverde/fisico.webp';
import longIconHover from '../../../image/header_icons/header_iconsverde/longitud.webp';
import elecIconHover from '../../../image/header_icons/header_iconsverde/elec.webp';
import humedadIconHover from '../../../image/header_icons/header_iconsverde/humedad.webp';
import tiempoIconHover from '../../../image/header_icons/header_iconsverde/tempo.webp';
import fotometriaIconHover from '../../../image/header_icons/header_iconsverde/fotometria.webp';
import flujoIconHover from '../../../image/header_icons/header_iconsverde/flujo.webp';

// ===============================================================
// ARRAY COMPLETO CON 10 LABORATORIOS (igual que NuestrosLaboratorios)
// ===============================================================
const laboratoriosRelacionadosData = [
  { 
    name: 'Temperatura', 
    img: tempImg, 
    hoverImg: tempHover, 
    icon: tempIcon, 
    hoverIcon: tempIconHover, 
    showInacal: true,
    path: '/laboratorio/temperatura'
  },
  { 
    name: 'Masa', 
    img: masaImg, 
    hoverImg: masaHover, 
    icon: masaIcon, 
    hoverIcon: masaIconHover, 
    isGreen: true, 
    showInacal: true,
    path: '/laboratorio/masa'
  },
  { 
    name: 'Fuerza y Presión', 
    img: fuerzaImg, 
    hoverImg: fuerzaHover, 
    icon: fuerzaIcon, 
    hoverIcon: fuerzaIconHover, 
    showInacal: true,
    path: '/laboratorio/fuerza-y-presion'
  },
  { 
    name: 'Fisicoquímico', 
    img: fisicoImg, 
    hoverImg: fisicoHover, 
    icon: fisicoIcon, 
    hoverIcon: fisicoIconHover, 
    showInacal: false,
    path: '/laboratorio/fisico-quimico'
  },
  { 
    name: 'Longitud', 
    img: longImg, 
    hoverImg: longHover, 
    icon: longIcon, 
    hoverIcon: longIconHover, 
    showInacal: false,
    path: '/laboratorio/longitud'
  },
  { 
    name: 'Electricidad', 
    img: elecImg, 
    hoverImg: elecHover, 
    icon: elecIcon, 
    hoverIcon: elecIconHover, 
    showInacal: false,
    path: '/laboratorio/electricidad'
  },
  { 
    name: 'Humedad', 
    img: humedadImg, 
    hoverImg: humedadHover, 
    icon: humedadIcon, 
    hoverIcon: humedadIconHover, 
    showInacal: false,
    path: '/laboratorio/humedad'
  },
  { 
    name: 'Tiempo y Frecuencia', 
    img: tiempoImg, 
    hoverImg: tiempoHover, 
    icon: tiempoIcon, 
    hoverIcon: tiempoIconHover, 
    showInacal: false,
    path: '/laboratorio/tiempo-frecuencia'
  },
  { 
    name: 'Fotometría y Acústica', 
    img: fotometriaImg, 
    hoverImg: fotometriaHover, 
    icon: fotometriaIcon, 
    hoverIcon: fotometriaIconHover, 
    showInacal: false,
    path: '/laboratorio/fotometria-acustica'
  },
  { 
    name: 'Flujo', 
    img: flujoImg, 
    hoverImg: flujoHover, 
    icon: flujoIcon, 
    hoverIcon: flujoIconHover, 
    showInacal: false,
    path: '/laboratorio/flujo'
  }
];

// ===============================================================
// COMPONENTE PRINCIPAL
// ===============================================================
const LaboratoriosRelacionados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalLabs = laboratoriosRelacionadosData.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalLabs);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalLabs) % totalLabs);

  // Mostramos 3 tarjetas visibles
  const visibleLabs = [
    laboratoriosRelacionadosData[currentIndex % totalLabs],
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
              const isCenter = index === 1; 
              return (
                <div key={index} className={`lr-card ${isCenter ? 'is-center' : ''}`}>
                  
                  {/* Fondos */}
                  <div className="lr-image-container">
                    <img src={lab.img} alt={`Fondo ${lab.name}`} className="lr-img-default" />
                    <div className="lr-light-overlay"></div>
                    <img src={lab.hoverImg} alt={`Fondo Oscuro ${lab.name}`} className="lr-img-hover" />
                  </div>

                  {/* Sello INACAL (Solo primeros 3) */}
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
                    <Link to={lab.path} className="lr-link-btn">
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