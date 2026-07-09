import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NuestrosLaboratorios.css';

// Registramos el plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

// Importaciones de las imágenes claras
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

// Importaciones de las imágenes oscuras (hover)
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

const NuestrosLaboratorios = () => {
  const containerRef = useRef(null);

  const laboratoriosData = [
    { name: 'Temperatura', img: tempImg, hoverImg: tempHover },
    { name: 'Masa', img: masaImg, hoverImg: masaHover, isGreen: true },
    { name: 'Fuerza y Presión', img: fuerzaImg, hoverImg: fuerzaHover },
    { name: 'Fisicoquímico', img: fisicoImg, hoverImg: fisicoHover },
    { name: 'Longitud', img: longImg, hoverImg: longHover },
    { name: 'Electricidad', img: elecImg, hoverImg: elecHover },
    { name: 'Humedad', img: humedadImg, hoverImg: humedadHover },
    { name: 'Tiempo y Frecuencia', img: tiempoImg, hoverImg: tiempoHover },
    { name: 'Fotometría y Acústica', img: fotometriaImg, hoverImg: fotometriaHover },
    { name: 'Flujo', img: flujoImg, hoverImg: flujoHover }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.nl-item');

      items.forEach((item) => {
        // Creamos una línea de tiempo para cada tarjeta ligada al Scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=20',  // Empieza cuando la tarjeta asoma por abajo
            end: 'bottom top+=20',    // Termina cuando la tarjeta se va por arriba por completo
            scrub: 1,                 // Suavizado perfecto en ambas direcciones (arriba/abajo)
          }
        });

        tl.fromTo(item,
          { opacity: 0.1, y: 60, scale: 0.9 }, // Estado inicial (oculto abajo)
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'none' } // Entra al centro
        )
        .to(item, { 
          duration: 0.4 // Zona muerta: se mantiene estático y visible en el centro de la pantalla
        })
        .to(item, { 
          opacity: 0.1, y: -60, scale: 0.9, duration: 0.3, ease: 'none' // Se desvanece al salir por arriba
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="nuestros-laboratorios" ref={containerRef}>
      <div className="nl-container">
        
        <h2 className="nl-title">
          <span className="title-blue">Nuestros </span>
          <span className="title-green">laboratorios de calibración</span>
        </h2>

        <div className="nl-grid">
          {laboratoriosData.map((lab, index) => (
            <div key={index} className="nl-item">
              
              <div className="nl-image-container">
                <img src={lab.img} alt={`Fondo ${lab.name}`} className="nl-img-default" />
                <img src={lab.hoverImg} alt={`Fondo Oscuro ${lab.name}`} className="nl-img-hover" />
              </div>

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