import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ufoGif from '../../image/gif-animado/ufo-green.gif';
import './UfoAnimation.css';

const UfoAnimation = () => {
  const ufoRef = useRef(null);

  useEffect(() => {
    const ufo = ufoRef.current;
    if (!ufo) return;

    const ufoWidth = 120;
    const ufoHeight = 80;

    // Posición inicial
    let x = Math.random() * (window.innerWidth - ufoWidth);
    let y = Math.random() * (window.innerHeight - ufoHeight);
    
    // Velocidad base
    const baseSpeed = 3;
    let vx = baseSpeed; 
    let vy = baseSpeed;

    // Variables para arrastrar y temporizador
    let isDragging = false;
    let isBoosted = false; // Estado para controlar si está bajo el efecto del lanzamiento
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let previousX = x;
    let previousY = y;
    let boostTimeout = null;

    let animationFrameId;

    const animate = () => {
      if (!isDragging) {
        x += vx;
        y += vy;

        // Rebote Horizontal
        if (x + ufoWidth >= window.innerWidth) {
          x = window.innerWidth - ufoWidth;
          vx = -vx;
        } else if (x <= 0) {
          x = 0;
          vx = -vx;
        }

        // Rebote Vertical
        if (y + ufoHeight >= window.innerHeight) {
          y = window.innerHeight - ufoHeight;
          vy = -vy;
        } else if (y <= 0) {
          y = 0;
          vy = -vy;
        }
      } else {
        // Mientras arrastras, calculas la velocidad del lanzamiento
        vx = x - previousX;
        vy = y - previousY;
        previousX = x;
        previousY = y;
      }

      ufo.style.transform = `translate(${x}px, ${y}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const onPointerDown = (e) => {
      isDragging = true;
      isBoosted = false;
      
      // Limpiamos cualquier temporizador activo por si lo atrapas en el aire mientras iba rápido
      if (boostTimeout) clearTimeout(boostTimeout);

      const rect = ufo.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      
      previousX = x;
      previousY = y;
      
      ufo.classList.add('grabbing');
      e.preventDefault(); 
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      x = e.clientX - dragOffsetX;
      y = e.clientY - dragOffsetY;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      ufo.classList.remove('grabbing');

      // Limitar velocidad máxima del lanzamiento
      const maxSpeed = 30; 
      vx = Math.min(Math.max(vx, -maxSpeed), maxSpeed);
      vy = Math.min(Math.max(vy, -maxSpeed), maxSpeed);

      // Si el lanzamiento tuvo fuerza real, activamos el temporizador
      if (Math.abs(vx) > baseSpeed || Math.abs(vy) > baseSpeed) {
        isBoosted = true;

        // PROGRAMAMOS: Mantener la velocidad exacta por 1.5 segundos (1500 ms)
        boostTimeout = setTimeout(() => {
          if (!isDragging) { // Solo si el usuario no lo volvió a agarrar
            // Conservamos la dirección actual (signo) pero restauramos la velocidad base
            vx = Math.sign(vx) * baseSpeed;
            vy = Math.sign(vy) * baseSpeed;
            isBoosted = false;
          }
        }, 1500); // Puedes cambiar 1500 por 1000 si prefieres que sea un segundo exacto
      } else {
        vx = baseSpeed;
        vy = baseSpeed;
      }
    };

    ufo.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (boostTimeout) clearTimeout(boostTimeout);
      ufo.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="ufo-bouncing-container">
      <img 
        ref={ufoRef}
        src={ufoGif} 
        alt="OVNI Certimet" 
        className="ufo-bouncing-img"
        draggable="false" 
      />
    </div>,
    document.body
  );
};

export default UfoAnimation;