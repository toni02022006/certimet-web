import React from 'react';
import { Link } from 'react-router-dom';
import './SolucionesIntegrales.css';

// Importación de la imagen según la ruta que me proporcionaste
import imgSoluciones from '../../image/nosotros/quienssms.png';

// SVG integrado para el icono del badge (Engranaje con mano/llave)
const IconoProyectos = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15.0001A1.65 1.65 0 0 0 19.73 16.8201L19.79 16.8801A2 2 0 0 1 19.79 19.7101A2 2 0 0 1 16.96 19.7101L16.9 19.6501A1.65 1.65 0 0 0 15.08 19.3201A1.65 1.65 0 0 0 13.57 20.3201V21.0001A2 2 0 0 1 11.57 23.0001A2 2 0 0 1 9.57 21.0001V20.9101A1.65 1.65 0 0 0 8.06 19.4001A1.65 1.65 0 0 0 6.24 19.7301L6.18 19.7901A2 2 0 0 1 3.35 19.7901A2 2 0 0 1 3.35 16.9601L3.41 16.9001A1.65 1.65 0 0 0 3.74 15.0801A1.65 1.65 0 0 0 2.74 13.5701H2.06A2 2 0 0 1 0.0600586 11.5701A2 2 0 0 1 2.06006 9.57011H2.15006A1.65 1.65 0 0 0 3.66006 8.06011A1.65 1.65 0 0 0 3.33006 6.24011L3.27006 6.18011A2 2 0 0 1 3.27006 3.35011A2 2 0 0 1 6.10006 3.35011L6.16006 3.41011A1.65 1.65 0 0 0 7.98006 3.74011A1.65 1.65 0 0 0 9.49006 2.74011V2.06011A2 2 0 0 1 11.4901 0.0601074A2 2 0 0 1 13.4901 2.06011V2.15011A1.65 1.65 0 0 0 15.0001 3.66011A1.65 1.65 0 0 0 16.8201 3.33011L16.8801 3.27011A2 2 0 0 1 19.7101 3.27011A2 2 0 0 1 19.7101 6.10011L19.6501 6.16011A1.65 1.65 0 0 0 19.3201 7.98011A1.65 1.65 0 0 0 20.3201 9.49011H21.0001A2 2 0 0 1 23.0001 11.4901A2 2 0 0 1 21.0001 13.4901H20.9101A1.65 1.65 0 0 0 19.4 15.0001Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L17 17M17 17L15.5 18.5M17 17L18.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16V18H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SolucionesIntegrales = () => {
  return (
    <section className="soluciones-section">
      <div className="soluciones-container">
        
        {/* COLUMNA IZQUIERDA: Textos */}
        <div className="soluciones-left">
          <h2 className="soluciones-title">
            Soluciones<br />
            Integrales en<br />
            Ingeniería y<br />
            Automatización<br />
            Industrial
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

        {/* COLUMNA DERECHA: Imagen y Badge */}
        <div className="soluciones-right">
          <div className="soluciones-img-wrapper">
            <img 
              src={imgSoluciones} 
              alt="Ingeniero de Certimet en planta industrial" 
              className="soluciones-img" 
            />
            
            {/* Recuadro Azul Flotante */}
            <div className="soluciones-badge">
              <IconoProyectos />
              <span>PROYECTOS<br/>LLAVE EN<br/>MANO</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolucionesIntegrales;