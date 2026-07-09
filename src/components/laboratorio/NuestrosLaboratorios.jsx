import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NuestrosLaboratorios.css';

// Registramos el plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

// --- IMPORTACIONES DE IMÁGENES DE FONDO (CLARAS) ---
import tempImg from '../../image/laboratorio/nlds/Temp.webp';
import masaImg from '../../image/laboratorio/nlds/Masa.webp';
import fuerzaImg from '../../image/laboratorio/nlds/Fuerza.webp';
import fisicoImg from '../../image/laboratorio/nlds/Fisico.webp';
import longImg from '../../image/laboratorio/nlds/Long.webp';
import elecImg from '../../image/laboratorio/nlds/Elec.webp';
import humedadImg from '../../image/laboratorio/nlds/Humedad.webp';
import tiempoImg from '../../image/laboratorio/nlds/Tiempo y Fre.webp';
import fotometriaImg from '../../image/laboratorio/nlds/Fotometri.webp';
import flujoImg from '../../image/laboratorio/nlds/Flujo.webp';

// --- IMPORTACIONES DE IMÁGENES DE FONDO (OSCURAS HOVER) ---
import tempHover from '../../image/laboratorio/nlds/Recurso 11.webp';
import masaHover from '../../image/laboratorio/nlds/Recurso 10.webp';
import fuerzaHover from '../../image/laboratorio/nlds/Recurso 9.webp';
import fisicoHover from '../../image/laboratorio/nlds/Recurso 8.webp';
import longHover from '../../image/laboratorio/nlds/Recurso 7.webp';
import elecHover from '../../image/laboratorio/nlds/Recurso 6.webp';
import humedadHover from '../../image/laboratorio/nlds/Recurso 5.webp';
import tiempoHover from '../../image/laboratorio/nlds/Recurso 4.webp';
import fotometriaHover from '../../image/laboratorio/nlds/Recurso 2.webp';
import flujoHover from '../../image/laboratorio/nlds/Recurso 3.webp';

// --- IMPORTACIÓN SELLO INACAL (SOLO PRIMEROS 3) ---
import inacalImg from '../../image/laboratorio/nlds/inacal.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (BLANCOS) ---
import tempIcon from '../../image/header_icons/temperatura.webp';
import masaIcon from '../../image/header_icons/masa.webp';
import fuerzaIcon from '../../image/header_icons/fuerza.webp';
import fisicoIcon from '../../image/header_icons/fisico.webp';
import longIcon from '../../image/header_icons/longitud.webp';
import elecIcon from '../../image/header_icons/elec.webp';
import humedadIcon from '../../image/header_icons/humedad.webp';
import tiempoIcon from '../../image/header_icons/tempo.webp';
import fotometriaIcon from '../../image/header_icons/fotometria.webp';
import flujoIcon from '../../image/header_icons/flujo.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (VERDES HOVER) ---
import tempIconHover from '../../image/header_icons/header_iconsverde/temperatura.webp';
import masaIconHover from '../../image/header_icons/header_iconsverde/masa.webp';
import fuerzaIconHover from '../../image/header_icons/header_iconsverde/fuerza.webp';
import fisicoIconHover from '../../image/header_icons/header_iconsverde/fisico.webp';
import longIconHover from '../../image/header_icons/header_iconsverde/longitud.webp';
import elecIconHover from '../../image/header_icons/header_iconsverde/elec.webp';
import humedadIconHover from '../../image/header_icons/header_iconsverde/humedad.webp';
import tiempoIconHover from '../../image/header_icons/header_iconsverde/tempo.webp';
import fotometriaIconHover from '../../image/header_icons/header_iconsverde/fotometria.webp';
import flujoIconHover from '../../image/header_icons/header_iconsverde/flujo.webp';

const NuestrosLaboratorios = () => {
  const containerRef = useRef(null);
  const [efectoActivo, setEfectoActivo] = useState(true);

  const laboratoriosData = [
    { name: 'Temperatura', img: tempImg, hoverImg: tempHover, icon: tempIcon, hoverIcon: tempIconHover, showInacal: true },
    { name: 'Masa', img: masaImg, hoverImg: masaHover, isGreen: true, icon: masaIcon, hoverIcon: masaIconHover, showInacal: true },
    { name: 'Fuerza y Presión', img: fuerzaImg, hoverImg: fuerzaHover, icon: fuerzaIcon, hoverIcon: fuerzaIconHover, showInacal: true },
    { name: 'Fisicoquímico', img: fisicoImg, hoverImg: fisicoHover, icon: fisicoIcon, hoverIcon: fisicoIconHover },
    { name: 'Longitud', img: longImg, hoverImg: longHover, icon: longIcon, hoverIcon: longIconHover },
    { name: 'Electricidad', img: elecImg, hoverImg: elecHover, icon: elecIcon, hoverIcon: elecIconHover },
    { name: 'Humedad', img: humedadImg, hoverImg: humedadHover, icon: humedadIcon, hoverIcon: humedadIconHover },
    { name: 'Tiempo y Frecuencia', img: tiempoImg, hoverImg: tiempoHover, icon: tiempoIcon, hoverIcon: tiempoIconHover },
    { name: 'Fotometría y Acústica', img: fotometriaImg, hoverImg: fotometriaHover, icon: fotometriaIcon, hoverIcon: fotometriaIconHover },
    { name: 'Flujo', img: flujoImg, hoverImg: flujoHover, icon: flujoIcon, hoverIcon: flujoIconHover }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.nl-item');

      if (!efectoActivo) {
        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf(items);
        gsap.set(items, { clearProps: "all" });
        return;
      }

      items.forEach((item, index) => {
        const columna = index % 3;
        
        let desvixEntrada = 0;
        let desvixSalida = 0;
        let rotacionInicial = 0;

        if (columna === 0) {
          desvixEntrada = 360; 
          desvixSalida = -360; 
          rotacionInicial = -12;
        } else if (columna === 2) {
          desvixEntrada = -360; 
          desvixSalida = 360;  
          rotacionInicial = 12;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top bottom', 
            end: 'bottom top',   
            scrub: 1,            
          }
        });

        tl.fromTo(item,
          { 
            opacity: 0, 
            x: desvixEntrada, 
            y: 100, 
            rotate: rotacionInicial,
            scale: 0.85 
          },
          { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            rotate: 0,
            scale: 1,
            duration: 0.4, 
            ease: 'none' 
          }
        )
        .to(item, { duration: 0.2 })
        .to(item, { 
          opacity: 0, 
          x: desvixSalida, 
          y: -100, 
          rotate: -rotacionInicial,
          scale: 0.85,
          duration: 0.4, 
          ease: 'none' 
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [efectoActivo]);

  return (
    <section className="nuestros-laboratorios" ref={containerRef}>
      
      {/* Botón Control Flotante */}
      <button 
        className={`nl-btn-control ${efectoActivo ? 'active' : 'paused'}`}
        onClick={() => setEfectoActivo(!efectoActivo)}
      >
        <span className="btn-pulse"></span>
        {efectoActivo ? '⏸️ Fijar Pantalla' : '▶️ Activar Efecto'}
      </button>

      <div className="nl-container">
        
        <h2 className="nl-title">
          <span className="title-blue">Nuestros </span>
          <span className="title-green">laboratorios de calibración</span>
        </h2>

        <div className="nl-grid">
          {laboratoriosData.map((lab, index) => (
            <div key={index} className="nl-item">
              
              {/* Fondos de la tarjeta */}
              <div className="nl-image-container">
                <img src={lab.img} alt={`Fondo ${lab.name}`} className="nl-img-default" />
                <img src={lab.hoverImg} alt={`Fondo Oscuro ${lab.name}`} className="nl-img-hover" />
              </div>

              {/* Sello INACAL (Solo primeros 3) */}
              {lab.showInacal && (
                <div className="nl-inacal-badge">
                  <img src={inacalImg} alt="Sello INACAL Acreditado" />
                </div>
              )}

              {/* Icono de Especialidad */}
              <div className="nl-card-icon-wrapper">
                <img src={lab.icon} alt={`Icono ${lab.name}`} className="nl-icon-default" />
                <img src={lab.hoverIcon} alt={`Icono Hover ${lab.name}`} className="nl-icon-hover" />
              </div>

              {/* Textos y Enlaces */}
              <div className={`nl-content ${lab.isGreen ? 'theme-green' : ''}`}>
                <h3 className="nl-card-title">
                  <span className="nl-card-subtitle">Laboratorio de</span>
                  <br />
                  <strong>{lab.name}</strong>
                </h3>
                <a href="#" className="nl-link">Conoce nuestro servicio →</a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuestrosLaboratorios;