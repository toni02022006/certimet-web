import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ListaServicios.css';

// Registramos el plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// NOTA: ACTUALIZA ESTAS RUTAS CON TUS IMÁGENES REALES DE SERVICIOS
// =====================================================================
// --- IMPORTACIONES DE IMÁGENES DE FONDO (CLARAS) ---
import bgServicio1 from '../../image/laboratorio/nlds/Temp.webp';
import bgServicio2 from '../../image/laboratorio/nlds/Masa.webp';
import bgServicio3 from '../../image/laboratorio/nlds/Fuerza.webp';
import bgServicio4 from '../../image/laboratorio/nlds/Fisico.webp';
import bgServicio5 from '../../image/laboratorio/nlds/Long.webp';
import bgServicio6 from '../../image/laboratorio/nlds/Temp.webp'; // Reemplazar

// --- IMPORTACIONES DE IMÁGENES DE FONDO (OSCURAS HOVER) ---
import hoverServicio1 from '../../image/laboratorio/nlds/Recurso 11.webp';
import hoverServicio2 from '../../image/laboratorio/nlds/Recurso 10.webp';
import hoverServicio3 from '../../image/laboratorio/nlds/Recurso 9.webp';
import hoverServicio4 from '../../image/laboratorio/nlds/Recurso 8.webp';
import hoverServicio5 from '../../image/laboratorio/nlds/Recurso 7.webp';
import hoverServicio6 from '../../image/laboratorio/nlds/Recurso 11.webp'; // Reemplazar

// --- IMPORTACIONES DE ICONOS ESQUINA (BLANCOS) ---
import icon1 from '../../image/header_icons/temperatura.webp';
import icon2 from '../../image/header_icons/masa.webp';
import icon3 from '../../image/header_icons/fuerza.webp';
import icon4 from '../../image/header_icons/fisico.webp';
import icon5 from '../../image/header_icons/longitud.webp';
import icon6 from '../../image/header_icons/elec.webp'; // Reemplazar

// --- IMPORTACIONES DE ICONOS ESQUINA (VERDES HOVER) ---
import iconHover1 from '../../image/header_icons/header_iconsverde/temperatura.webp';
import iconHover2 from '../../image/header_icons/header_iconsverde/masa.webp';
import iconHover3 from '../../image/header_icons/header_iconsverde/fuerza.webp';
import iconHover4 from '../../image/header_icons/header_iconsverde/fisico.webp';
import iconHover5 from '../../image/header_icons/header_iconsverde/longitud.webp';
import iconHover6 from '../../image/header_icons/header_iconsverde/elec.webp'; // Reemplazar

const ListaServicios = () => {
  const containerRef = useRef(null);
  const [efectoActivo, setEfectoActivo] = useState(true);

  // Arreglo de 6 elementos basado en tu captura de pantalla
  const serviciosData = [
    { 
      name: "Mantenimiento", 
      img: bgServicio1, hoverImg: hoverServicio1, icon: icon1, hoverIcon: iconHover1, path: "/servicios/mantenimiento",
      isGreen: false 
    },
    { 
      name: <>Mapeo<br/>Térmico</>, 
      img: bgServicio2, hoverImg: hoverServicio2, icon: icon2, hoverIcon: iconHover2, path: "/servicios/mapeo-termico", 
      isGreen: true // Este tiene el hover verde según tu imagen
    },
    { 
      name: <>Análisis<br/>Termográfico</>, 
      img: bgServicio3, hoverImg: hoverServicio3, icon: icon3, hoverIcon: iconHover3, path: "/servicios/analisis-termografico",
      isGreen: false
    },
    { 
      name: <>Servicios<br/>Integrales</>, 
      img: bgServicio4, hoverImg: hoverServicio4, icon: icon4, hoverIcon: iconHover4, path: "/servicios/integrales",
      isGreen: false
    },
    { 
      name: <>Servicio<br/>5</>, 
      img: bgServicio5, hoverImg: hoverServicio5, icon: icon5, hoverIcon: iconHover5, path: "/servicios/5",
      isGreen: false
    },
    { 
      name: <>Servicio<br/>6</>, 
      img: bgServicio6, hoverImg: hoverServicio6, icon: icon6, hoverIcon: iconHover6, path: "/servicios/6",
      isGreen: false
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.ls-item');

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

        // Efecto de las columnas laterales (Entran y salen girando desde los lados)
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
        .to(item, { duration: 0.2 }) // Pequeña pausa en pantalla
        .to(item, { 
          opacity: 0, x: desvixSalida, y: -100, rotate: -rotacionInicial, scale: 0.85, duration: 0.4, ease: 'none' 
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [efectoActivo]);

  return (
    <section className="lista-servicios-sec" ref={containerRef}>
      
      <button 
        className={`ls-btn-control ${efectoActivo ? 'active' : 'paused'}`}
        onClick={() => setEfectoActivo(!efectoActivo)}
      >
        <span className="ls-btn-pulse"></span>
        {efectoActivo ? '⏸️ Fijar Pantalla' : '▶️ Activar Efecto'}
      </button>

      <div className="ls-container">
        {/* Corregido el título a "Nuestros" que es lo gramaticalmente correcto */}
        <h2 className="ls-main-title">
          Nuestros <span>servicios industriales</span>
        </h2>

        <div className="ls-grid">
          {serviciosData.map((sol, index) => (
            <div key={index} className="ls-item">
              
              <div className="ls-image-container">
                {/* 1. Imagen base clara */}
                <img src={sol.img} alt="Fondo" className="ls-img-default" />
                {/* 2. Capa azul superpuesta */}
                <div className="ls-blue-overlay"></div>
                {/* 3. Imagen oscura (solo en hover) */}
                <img src={sol.hoverImg} alt="Fondo Oscuro" className="ls-img-hover" />
              </div>

              <div className="ls-card-icon-wrapper">
                <img src={sol.icon} alt="Icono" className="ls-icon-default" />
                <img src={sol.hoverIcon} alt="Icono Hover" className="ls-icon-hover" />
              </div>

              <div className={`ls-content ${sol.isGreen ? 'theme-green' : ''}`}>
                <h3 className="ls-card-title">
                  {sol.name}
                </h3>
                <Link to={sol.path} className="ls-link">
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

export default ListaServicios;