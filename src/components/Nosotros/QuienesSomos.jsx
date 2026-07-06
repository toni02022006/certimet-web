import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import imagenQuienesSomos from '../../image/nosotros/quienssms.png';
import './QuienesSomos.css';

const QuienesSomos = () => {
  const controlsTexto = useAnimation();
  const controlsImagen = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Estado para la posición del mouse
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView) {
      controlsTexto.start("visible");
      controlsImagen.start("visible");
    } else {
      controlsTexto.start("hidden");
      controlsImagen.start("hidden");
    }
  }, [controlsTexto, controlsImagen, inView]);

  // Detectar movimiento del mouse SOBRE LA IMAGEN
  const manejarMovimiento = (e) => {
    const elemento = e.currentTarget;
    const ancho = elemento.offsetWidth;
    const alto = elemento.offsetHeight;
    const posX = e.nativeEvent.offsetX;
    const posY = e.nativeEvent.offsetY;

    // Convertir a grados de rotación (ahora más marcado)
    const rotarY = ((posX / ancho) - 0.5) * 20; // 20 grados máx
    const rotarX = ((posY / alto) - 0.5) * -20;

    setPosicion({ x: rotarX, y: rotarY });
  };

  // Volver a posición original al salir el mouse
  const reiniciarPosicion = () => {
    setPosicion({ x: 0, y: 0 });
  };

  const textoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="quienes-somos-section" ref={ref}>
      <div className="quienes-somos-container">
        <motion.div
          className="quienes-somos-texto"
          initial="hidden"
          animate={controlsTexto}
          variants={textoVariants}
        >
          <h2 className="quienes-somos-titulo">¿Quiénes somos?</h2>
          <p className="quienes-somos-parrafo">
            Nacimos en enero de 2020 con una convicción clara: brindar <span className="texto-resaltado">soluciones de calibración y metrología con la más alta precisión al sector industrial peruano.</span> Desde nuestros inicios, hemos crecido de manera sostenida, invirtiendo en infraestructura, equipos de gran precisión y un equipo humano altamente especializado que pone al cliente en el centro de cada decisión.
          </p>
          <p className="quienes-somos-parrafo">
            Hoy ofrecemos <span className="texto-resaltado">servicios integrales que van desde la calibración y metrología hasta la ingeniería y automatización industrial,</span> acompañando a nuestros clientes en cada etapa de sus procesos con soluciones técnicas confiables y atención personalizada. <span className="texto-resaltado">Somos un laboratorio acreditado por INACAL bajo la norma ISO/IEC 17025:2017 y contamos con triple certificación ISO,</span> lo que refleja nuestro compromiso constante con la calidad, la seguridad y la mejora continua.
          </p>
        </motion.div>

        <motion.div
          className="quienes-somos-imagen"
          initial="hidden"
          animate={controlsImagen}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
          }}
          onMouseMove={manejarMovimiento}
          onMouseLeave={reiniciarPosicion}
          style={{
            transform: `rotateX(${posicion.x}deg) rotateY(${posicion.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <img src={imagenQuienesSomos} alt="Profesional Certimet" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
};

export default QuienesSomos;