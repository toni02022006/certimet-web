import React from 'react';
import './FormularioContacto.css';

// Importa la imagen de la izquierda
import contactoImg from '../../image/laboratorio/DSC08361_1.jpeg';

const FormularioContacto = () => {
  return (
    <section className="formulario-contacto">
      <div className="fc-container">
        
        {/* Cabecera: Título y Subtítulo */}
        <div className="fc-header">
          <h2 className="fc-title">
            Ofrecemos <span className="text-green">soluciones</span> a medida para<br/>tu industria.
          </h2>
          <p className="fc-sub">
            Envíanos un mensaje con tu consulta y nuestro equipo de expertos se pondrá en contacto contigo a la brevedad.
          </p>
        </div>

        {/* Contenido a dos columnas */}
        <div className="fc-content">
          
          {/* Columna Izquierda: Imagen */}
          <div className="fc-image-col">
            <img src={contactoImg} alt="Experto Certimet" className="fc-img" />
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="fc-form-col">
            <form className="fc-form">
              
              <div className="fc-group">
                <label>Nombres <span className="asterisk">*</span></label>
                <input type="text" placeholder="Ingresa tus nombres" />
              </div>

              <div className="fc-group">
                <label>Apellidos <span className="asterisk">*</span></label>
                <input type="text" placeholder="Ingresa tus apellidos" />
              </div>

              <div className="fc-group">
                <label>Correo electrónico <span className="asterisk">*</span></label>
                <input type="email" placeholder="Ingresa tu dirección de correo electrónico" />
              </div>

              <div className="fc-group">
                <label>Celular <span className="asterisk">*</span></label>
                <input type="tel" placeholder="Ingresa tu celular" />
              </div>

              <div className="fc-group">
                <label>Razón social <span className="asterisk">*</span></label>
                <input type="text" placeholder="Razón social" />
              </div>

              <div className="fc-group">
                <label>Equipos a calibrar <span className="asterisk">*</span></label>
                <input type="text" placeholder="Ingresa los equipos que quieres calibrar" />
              </div>

              <div className="fc-group">
                <label>Mensaje <span className="asterisk">*</span></label>
                <textarea rows="4" placeholder="Ingresa tu mensaje"></textarea>
              </div>

              {/* Botón y Placeholder de reCAPTCHA */}
              <div className="fc-footer">
                <button type="submit" className="fc-btn">Solicitar Cotización</button>
                
                {/* Simulación visual del reCAPTCHA como en el diseño */}
                <div className="fc-captcha-mock">
                  <div className="captcha-logo"></div>
                  <span>protección de <strong>reCAPTCHA</strong></span>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FormularioContacto;