import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './NuestrasSoluciones.css';

// Registramos el plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

// --- IMPORTACIONES DE IMÁGENES DE FONDO (CLARAS - PARA EL FONDO AZUL) ---
import tempImg from '../../image/laboratorio/nlds/Temp.webp';
import masaImg from '../../image/laboratorio/nlds/Masa.webp';
import fuerzaImg from '../../image/laboratorio/nlds/Fuerza.webp';
import fisicoImg from '../../image/laboratorio/nlds/Fisico.webp';
import longImg from '../../image/laboratorio/nlds/Long.webp';

// --- IMPORTACIONES DE IMÁGENES DE FONDO (OSCURAS HOVER) ---
import tempHover from '../../image/laboratorio/nlds/Recurso 11.webp';
import masaHover from '../../image/laboratorio/nlds/Recurso 10.webp';
import fuerzaHover from '../../image/laboratorio/nlds/Recurso 9.webp';
import fisicoHover from '../../image/laboratorio/nlds/Recurso 8.webp';
import longHover from '../../image/laboratorio/nlds/Recurso 7.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (BLANCOS) ---
import tempIcon from '../../image/header_icons/temperatura.webp';
import masaIcon from '../../image/header_icons/masa.webp';
import fuerzaIcon from '../../image/header_icons/fuerza.webp';
import fisicoIcon from '../../image/header_icons/fisico.webp';
import longIcon from '../../image/header_icons/longitud.webp';

// --- IMPORTACIONES DE ICONOS ESQUINA (VERDES HOVER) ---
import tempIconHover from '../../image/header_icons/header_iconsverde/temperatura.webp';
import masaIconHover from '../../image/header_icons/header_iconsverde/masa.webp';
import fuerzaIconHover from '../../image/header_icons/header_iconsverde/fuerza.webp';
import fisicoIconHover from '../../image/header_icons/header_iconsverde/fisico.webp';
import longIconHover from '../../image/header_icons/header_iconsverde/longitud.webp';

const NuestrasSoluciones = () => {
  const containerRef = useRef(null);
  const [efectoActivo, setEfectoActivo] = useState(true);

  // Volvemos a mapear 'img' para la imagen de fondo base
  const solucionesData = [
    { 
      name: <>Mantenimiento<br/>Predictivo<br/>Industrial</>, 
      img: tempImg, hoverImg: tempHover, icon: tempIcon, hoverIcon: tempIconHover, path: "/ingenieria/mantenimiento"
    },
    { 
      name: <>Control de<br/>Procesos</>, 
      img: masaImg, hoverImg: masaHover, icon: masaIcon, hoverIcon: masaIconHover, path: "/ingenieria/control", isGreen: true 
    },
    { 
      name: <>Visión<br/>Artificial</>, 
      img: fuerzaImg, hoverImg: fuerzaHover, icon: fuerzaIcon, hoverIcon: fuerzaIconHover, path: "/ingenieria/vision" 
    },
    { 
      name: <>Eficiencia<br/>Energética</>, 
      img: fisicoImg, hoverImg: fisicoHover, icon: fisicoIcon, hoverIcon: fisicoIconHover, path: "/ingenieria/eficiencia" 
    },
    { 
      name: <>Sistemas de<br/>Telemetría<br/>e Industria 4.0</>, 
      img: longImg, hoverImg: longHover, icon: longIcon, hoverIcon: longIconHover, path: "/ingenieria/telemetria" 
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.ns-item');

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
          { opacity: 0, x: desvixEntrada, y: 100, rotate: rotacionInicial, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 0.4, ease: 'none' }
        )
        .to(item, { duration: 0.2 })
        .to(item, { 
          opacity: 0, x: desvixSalida, y: -100, rotate: -rotacionInicial, scale: 0.85, duration: 0.4, ease: 'none' 
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [efectoActivo]);

  return (
    <section className="nuestras-soluciones-sec" ref={containerRef}>
      
      <button 
        className={`ns-btn-control ${efectoActivo ? 'active' : 'paused'}`}
        onClick={() => setEfectoActivo(!efectoActivo)}
      >
        <span className="ns-btn-pulse"></span>
        {efectoActivo ? '⏸️ Fijar Pantalla' : '▶️ Activar Efecto'}
      </button>

      <div className="ns-container">
        <h2 className="ns-main-title">
          Nuestras <span>soluciones industriales</span>
        </h2>

        <div className="ns-grid">
          {solucionesData.map((sol, index) => (
            <div key={index} className="ns-item">
              
              {/* === LA MAGIA DE LAS IMÁGENES OCURRE AQUÍ === */}
              <div className="ns-image-container">
                {/* 1. Imagen base clara */}
                <img src={sol.img} alt="Fondo" className="ns-img-default" />
                {/* 2. Capa azul semi-transparente que tiñe la imagen base */}
                <div className="ns-blue-overlay"></div>
                {/* 3. Imagen oscura (solo aparece en hover) */}
                <img src={sol.hoverImg} alt="Fondo Oscuro" className="ns-img-hover" />
              </div>

              <div className="ns-card-icon-wrapper">
                <img src={sol.icon} alt="Icono" className="ns-icon-default" />
                <img src={sol.hoverIcon} alt="Icono Hover" className="ns-icon-hover" />
              </div>

              <div className={`ns-content ${sol.isGreen ? 'theme-green' : ''}`}>
                <h3 className="ns-card-title">
                  {sol.name}
                </h3>
                <Link to={sol.path} className="ns-link">
                  Conoce nuestro servicio &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuestrasSoluciones;