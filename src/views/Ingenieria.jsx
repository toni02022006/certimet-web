import React, { useEffect } from 'react';
import './Ingenieria.css';

// Imagen de fondo importada tal cual indicaste
import fondoNosotros from '../image/nosotros/nosotrosfondo.jpeg';
import SolucionesIntegrales from '../components/ingenieria/SolucionesIntegrales';
import NuestrasSoluciones from '../components/ingenieria/NuestrasSoluciones';
import ServiciosIngenieria from '../components/ingenieria/ServiciosIngenieria';
import MarcasIngenieria from '../components/ingenieria/MarcasIngenieria';

const Ingenieria = () => {
  // Asegurarnos de que la página cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ingenieria-page">
      {/* =========================================================
          SECCIÓN HERO (Banner Principal)
          ========================================================= */}
      <section 
        className="hero-ingenieria"
        style={{ backgroundImage: `url(${fondoNosotros})` }}
      >
        {/* Capa de gradiente azul superpuesta a la imagen */}
        <div className="hero-ingenieria-overlay"></div>
        
        {/* Contenedor del texto */}
        <div className="hero-ingenieria-content">
          <h1 className="hero-ingenieria-title">
            Automatización <br />
            que <span className="text-green">impulsa</span> <br />
            <span className="text-green">tu industria</span>
          </h1>
        </div>
      </section>

      {/* Aquí abajo irán las siguientes secciones que vayas creando */}
      <SolucionesIntegrales />
      <NuestrasSoluciones />
      <ServiciosIngenieria />
      <MarcasIngenieria />
      
    </div>
  );
};

export default Ingenieria;