import React from 'react';
import './GestionCalibraciones.css';

// Importación de los iconos que pasaste
import checkIcon from '../../image/laboratorio/check.webp';
import docIcon from '../../image/laboratorio/doc.webp';
import tiempoIcon from '../../image/laboratorio/tiempo.webp';

const GestionCalibraciones = () => {
  return (
    <section className="gestion">
      <div className="gestion-container">
        
        {/* Columna Izquierda: Textos y Botón */}
        <div className="gestion-left">
          <h2 className="gestion-title">
            <span className="title-blue-light">Gestiona tus</span><br />
            <span className="title-blue-light">calibraciones en</span><br />
            <span className="title-green-bold">CERTIMET</span>
          </h2>
          <p className="gestion-sub">
            Accede a nuestra plataforma y centraliza el historial de calibraciones e instrumentos de tu empresa con rapidez, transparencia y seguridad.
          </p>
          <button className="gestion-btn">
            Contáctanos <span className="arrow">→</span>
          </button>
        </div>

        {/* Columna Derecha: Tarjeta Azul */}
        <div className="gestion-right">
          <div className="gestion-card">
            
            {/* Ítem 1 */}
            <div className="feature-item">
              <div className="feature-header">
                <div className="feature-title-wrapper">
                  <img src={checkIcon} alt="Icono Estatus" className="feature-icon" />
                  <h3 className="feature-title">Conoce el estatus de tus calibraciones</h3>
                </div>
                <svg className="feature-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <p className="feature-desc">
                Consulta en tiempo real el estado de cada uno de tus instrumentos en proceso de calibración, sin necesidad de llamadas ni correos.
              </p>
            </div>

            {/* Ítem 2 */}
            <div className="feature-item">
              <div className="feature-header">
                <div className="feature-title-wrapper">
                  <img src={docIcon} alt="Icono Documentos" className="feature-icon" />
                  <h3 className="feature-title">Descarga tus certificados</h3>
                </div>
                <svg className="feature-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <p className="feature-desc">
                Accede y descarga tus certificados de calibración acreditados y no acreditados, de manera rápida.
              </p>
            </div>

            {/* Ítem 3 */}
            <div className="feature-item">
              <div className="feature-header">
                <div className="feature-title-wrapper">
                  <img src={tiempoIcon} alt="Icono Tiempo" className="feature-icon" />
                  <h3 className="feature-title">Consulta cuándo se realizó tu servicio</h3>
                </div>
                <svg className="feature-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <p className="feature-desc">
                Consulta la fecha en que se realizó tu calibración y su fecha de vencimiento.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GestionCalibraciones;