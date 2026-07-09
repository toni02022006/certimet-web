import React from 'react';
import './GestionCalibraciones.css';

const GestionCalibraciones = () => {
  return (
    <section className="gestion">
      <div className="gestion-container">
        <h2 className="gestion-title">Gestiona tus calibraciones en CERTIMET</h2>
        <p className="gestion-sub">
          Accede a nuestra plataforma y centraliza el historial de calibraciones e instrumentos de tu empresa con rapidez, transparencia y seguridad.
        </p>
        <button className="gestion-btn">Contáctanos →</button>

        <div className="gestion-features">
          <div className="gestion-feature">
            <div className="gestion-icon">📊</div>
            <h3>Conoce el estatus de tus calibraciones</h3>
            <p>Consulta en tiempo real el estado de cada uno de tus instrumentos en proceso de calibración, sin necesidad de llamadas ni correos.</p>
          </div>
          <div className="gestion-feature">
            <div className="gestion-icon">📄</div>
            <h3>Descarga tus certificados</h3>
            <p>Accede y descarga tus certificados de calibración acreditados y no acreditados, de manera rápida.</p>
          </div>
          <div className="gestion-feature">
            <div className="gestion-icon">📅</div>
            <h3>Consulta cuándo se realizó tu servicio</h3>
            <p>Consulta la fecha en que se realizó tu calibración y su fecha de vencimiento.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionCalibraciones;