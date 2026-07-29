import React, { useState } from 'react';
import './WhatsAppBot.css';
import botGif from '../../image/bot/bot.webp';

const WhatsAppBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', service: '', details: '' });

  const toggleChat = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, service, details } = formData;
    if (!name || !service) return;

    // Actualicé el número al que aparece en tu captura, modifícalo si es necesario
    const phoneNumber = "51960141668"; 
    
    // Formato de mensaje con saltos de línea (\n\n) para que se vea ordenado
    let message = `Hola, mi nombre es ${name}.\n\nEstoy buscando información sobre el servicio de ${service}.`;
    
    if (details.trim() !== '') {
      message += `\n\nDetalle adicional: ${details}`;
    }
    
    // encodeURIComponent convertirá los \n en el código correcto para la URL (%0A)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsOpen(false);
    setFormData({ name: '', service: '', details: '' });
  };

  return (
    <div className="whatsapp-bot-container">
      {/* Tarjeta del Formulario */}
      {isOpen && (
        <div className="whatsapp-form-popup">
          <div className="whatsapp-form-header">
            <div className="header-title-container">
              <img src={botGif} alt="Bot Certimet" className="header-bot-gif" />
              <h4>Asistente Certimet</h4>
            </div>
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>
          <form onSubmit={handleSubmit} className="whatsapp-form-body">
            <p>¡Hola! Ingresa tus datos para brindarte una mejor atención por WhatsApp.</p>
            
            <div className="form-group">
              <label>Tu nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Ej. Juan Anthoni"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Servicio de interés</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Selecciona un servicio</option>
                <option value="Metrología">Metrología</option>
                <option value="Ingeniería y Automatización">Ingeniería y Automatización</option>
                <option value="Cotización General">Cotización General</option>
                <option value="Soporte/Otros">Soporte / Otros</option>
              </select>
            </div>

            <div className="form-group">
              <label>¿Qué necesitas específicamente? (Opcional)</label>
              <textarea
                name="details"
                placeholder="Cuéntanos brevemente los detalles..."
                value={formData.details}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
            
            <button type="submit" className="start-chat-btn">
              Iniciar chat por WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante de WhatsApp */}
      <div className="whatsapp-floating-btn" onClick={toggleChat}>
        <svg viewBox="0 0 32 32" className="whatsapp-icon">
          <path d="M16.002 1.333c-8.094 0-14.667 6.573-14.667 14.667 0 2.61.68 5.064 1.861 7.203l-2.073 7.575 7.747-2.032c2.067 1.056 4.417 1.655 6.917 1.655 8.094 0 14.667-6.573 14.667-14.667S24.095 1.333 16.002 1.333zM22.95 21.611c-.307.868-1.503 1.636-2.077 1.705-.536.065-1.229.231-3.953-.895-3.267-1.352-5.364-4.697-5.525-4.912-.16-.216-1.319-1.756-1.319-3.348s.827-2.373 1.119-2.673c.291-.299.633-.375.845-.375.212 0 .424.004.615.013.203.011.472-.079.739.563.275.659.88 2.152.96 2.312.08.16.133.345.027.557-.107.212-.16.345-.319.505-.16.16-.331.353-.48.495-.16.148-.328.312-.149.62.179.307.795 1.315 1.712 2.133 1.18 1.053 2.172 1.376 2.492 1.536.319.16.505.133.692-.08.187-.212.8-1.037 1.013-1.393.212-.353.424-.292.712-.187.291.107 1.84.868 2.152 1.025.312.16.52.239.596.375.076.133.076.779-.231 1.647z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default WhatsAppBot;