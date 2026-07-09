import React from 'react';
import './FormularioContacto.css';

const FormularioContacto = () => {
  return (
    <section className="formulario-contacto">
      <div className="fc-container">
        <h2 className="fc-title">Ofrecemos soluciones a medida para tu industria.</h2>
        <p className="fc-sub">
          Envíanos un mensaje con tu consulta y nuestro equipo de expertos se pondrá en contacto contigo a la brevedad.
        </p>
        <form className="fc-form">
          <div className="fc-row">
            <div className="fc-group">
              <label>Nombre</label>
              <input type="text" placeholder="Ingresa tu nombre" />
            </div>
            <div className="fc-group">
              <label>Apellidos</label>
              <input type="text" placeholder="Ingresa tus apellidos" />
            </div>
          </div>
          <div className="fc-row">
            <div className="fc-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="Ingresa tu dirección de correo electrónico" />
            </div>
            <div className="fc-group">
              <label>Celular</label>
              <input type="tel" placeholder="Ingresa tu celular" />
            </div>
          </div>
          <div className="fc-row">
            <div className="fc-group">
              <label>Razón social</label>
              <input type="text" placeholder="Razón social" />
            </div>
          </div>
          <div className="fc-group">
            <label>Equipos a calibrar</label>
            <input type="text" placeholder="Ingresa los equipos que quieres calibrar" />
          </div>
          <div className="fc-group">
            <label>Mensaje</label>
            <textarea rows="4" placeholder="Ingresa tu mensaje"></textarea>
          </div>
          <button type="submit" className="fc-btn">Solicitar Cotización</button>
        </form>
      </div>
    </section>
  );
};

export default FormularioContacto;