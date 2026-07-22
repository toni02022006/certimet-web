import React from 'react';
import { Link } from 'react-router-dom';
import './SolucionesIntegrales.css';

// Importación de tus imágenes
import imgSoluciones from '../../image/ingenieria/img1.png';
import iconLlave from '../../image/ingenieria/img4.png';

const SolucionesIntegrales = () => {
  return (
    <section className="soluciones-section">
      <div className="soluciones-container">
        
        {/* COLUMNA IZQUIERDA: Textos */}
        <div className="soluciones-left">
          <h2 className="soluciones-title">
            <span className="texto-regular">Soluciones<br />Integrales en</span><br />
            <span className="texto-bold">Ingeniería y<br />Automatización<br />Industrial</span>
          </h2>
          <p className="soluciones-desc">
            Integramos tecnología, experiencia técnica y visión estra-
            tégica para optimizar tus procesos industriales. Nuestro
            equipo trabaja de la mano contigo, combinando conoci-
            miento técnico y un ecosistema de soluciones sólido
            para mejorar la ingeniería, las operaciones y el rendi-
            miento de tu planta.
          </p>
          <Link to="/contacto" className="btn-contactanos-soluciones">
            Contáctanos <span>&rarr;</span>
          </Link>
        </div>

        {/* COLUMNA DERECHA: Imagen principal e imagen flotante */}
        <div className="soluciones-right">
          <div className="soluciones-img-wrapper">
            <img 
              src={imgSoluciones} 
              alt="Ingeniero de Certimet en planta industrial" 
              className="soluciones-img" 
            />
            
            {/* Solo llamamos a tu imagen completa, sin textos ni fondos extra */}
            <div className="soluciones-badge">
              <img src={iconLlave} alt="Proyectos Llave en Mano" className="badge-icon" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolucionesIntegrales;