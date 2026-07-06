import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import './Contacto.css';

const Contacto = () => {
  const [tipoPersona, setTipoPersona] = useState('natural');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para el ReCAPTCHA
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    nombres_apellidos: '',
    dni: '',
    razon_social: '',
    ruc: '',
    telefono: '',
    correo: '',
    asunto: '',
    mensaje: '',
    acepta_politicas: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del ReCAPTCHA antes de enviar
    if (!recaptchaToken) {
      Swal.fire({
        icon: 'warning',
        title: 'Verificación requerida',
        text: 'Por favor, confirma que no eres un robot.',
        confirmButtonColor: '#0061bc'
      });
      return;
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      tipo_contacto: tipoPersona === 'empresa' ? 'EMPRESA' : 'NATURAL',
      recaptchaToken // Enviamos el token por si luego quieres validarlo en el backend
    };

    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resultado = await response.json();

      if (response.ok) {
        // Alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tu solicitud fue enviada con éxito. Nos comunicaremos contigo pronto.',
          confirmButtonColor: '#0061bc',
          confirmButtonText: 'OK'
        });

        // Limpiamos el formulario
        setFormData({
          nombres_apellidos: '',
          dni: '',
          razon_social: '',
          ruc: '',
          telefono: '',
          correo: '',
          asunto: '',
          mensaje: '',
          acepta_politicas: false
        });
        
        // Reiniciamos el widget de ReCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          setRecaptchaToken(null);
        }

      } else {
        // Alerta de error controlada
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${resultado.error}`,
          confirmButtonColor: '#0061bc'
        });
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      // Alerta de error de conexión
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor. Inténtalo más tarde.',
        confirmButtonColor: '#0061bc'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 15, transition: { duration: 0.2 } }
  };

  const serviciosCards = [
    { id: 1, titulo: 'Laboratorio de Calibración', accion: 'CONTACTAR', fullWidth: false },
    { id: 2, titulo: 'Automatización, Analítica y Control Industrial', accion: 'COTIZAR', fullWidth: false },
    { id: 3, titulo: 'Mantenimiento Industrial', accion: 'COTIZAR', fullWidth: false },
    { id: 4, titulo: 'Consultoría y Capacitaciones', accion: 'COTIZAR', fullWidth: false },
    { id: 5, titulo: 'Contratos de mantenimiento Integral', accion: 'COTIZAR', fullWidth: false },
    { id: 6, titulo: 'Análisis de Espuma Contra Incendios', accion: 'COTIZAR', fullWidth: false },
    { id: 7, titulo: 'Tienda de equipos de medición Industrial', accion: 'COTIZAR', fullWidth: true }
  ];

  const tarjetasContacto = [
    {
      id: 1,
      titulo: 'Llámanos',
      linea1: '+51 941 101 546',
      linea2: '(01) 380 3727',
      icono: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
    },
    {
      id: 2,
      titulo: 'Escríbenos',
      linea1: 'ventas@certimet.pe',
      linea2: 'Respuesta en max. 24h',
      icono: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    },
    {
      id: 3,
      titulo: 'Visítanos',
      linea1: 'Av. Canadá 3263',
      linea2: 'Ofic. 301, San Luis - Lima',
      icono: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    }
  ];

  return (
    <motion.div 
      className="contacto-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contacto-hero">
        <div className="contacto-hero-content">
          <h1>Soporte y <span>Atención Técnica</span></h1>
        </div>
      </div>

      <div className="servicios-intro-container">
        <h2>Conecte con Nuestros <span>Especialistas</span></h2>
        <p>Estamos listos para atender sus requerimientos de metrología industrial.</p>
      </div>

      <div className="servicios-cards-section">
        <div className="servicios-grid">
          {serviciosCards.map((servicio) => (
            <div 
              key={servicio.id} 
              className={`servicio-card ${servicio.fullWidth ? 'full-width' : ''}`}
            >
              <h3>{servicio.titulo}</h3>
              <span className="servicio-link">{servicio.accion}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section-title">
        <h2>Déjanos un <span>mensaje</span></h2>
        <p>Si tienes alguna duda o consulta, escríbenos y te responderemos a la brevedad posible</p>
      </div>

      <div className="contacto-main-container">
        <div className="contacto-form-section">
          <div className="form-header">
            <h3>Formulario de Contacto</h3>
            <div className="form-tabs">
              <button 
                className={`tab-btn ${tipoPersona === 'natural' ? 'active' : ''}`}
                onClick={() => setTipoPersona('natural')}
                type="button"
              >
                Persona Natural
              </button>
              <button 
                className={`tab-btn ${tipoPersona === 'empresa' ? 'active' : ''}`}
                onClick={() => setTipoPersona('empresa')}
                type="button"
              >
                Empresa (RUC)
              </button>
            </div>
          </div>

          <form className="certimet-form" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={tipoPersona}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="form-animated-wrapper"
              >
                {tipoPersona === 'natural' && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Nombres y Apellidos</label>
                      <input 
                        type="text" 
                        name="nombres_apellidos"
                        value={formData.nombres_apellidos}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>DNI</label>
                      <input 
                        type="text" 
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        placeholder="Ej. 70000000" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono / Celular</label>
                      <input 
                        type="tel" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+51 999 999 999" 
                        required 
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Correo Electrónico</label>
                      <input 
                        type="email" 
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com" 
                        required 
                      />
                    </div>
                  </div>
                )}

                {tipoPersona === 'empresa' && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Razón Social</label>
                      <input 
                        type="text" 
                        name="razon_social"
                        value={formData.razon_social}
                        onChange={handleChange}
                        placeholder="Ej. InduMet S.A.C." 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>RUC</label>
                      <input 
                        type="text" 
                        name="ruc"
                        value={formData.ruc}
                        onChange={handleChange}
                        placeholder="Ej. 20123456789" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono / Celular</label>
                      <input 
                        type="tel" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+51 999 999 999" 
                        required 
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Correo Corporativo</label>
                      <input 
                        type="email" 
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="compras@empresa.com" 
                        required 
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="form-group full-width" style={{ marginTop: '20px' }}>
              <label>Asunto / Servicio de Interés</label>
              <select 
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="Laboratorio de Calibración">Laboratorio de Calibración</option>
                <option value="Automatización y Control">Automatización y Control</option>
                <option value="Mantenimiento Industrial">Mantenimiento Industrial</option>
                <option value="Consultoría y Capacitaciones">Consultoría y Capacitaciones</option>
                <option value="Otro / Consulta General">Otro / Consulta General</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Mensaje / Detalle del Requerimiento</label>
              <textarea 
                rows="3" 
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Describa los equipos a calibrar, marcas, modelos o su consulta específica..." 
                required
              ></textarea>
            </div>

            <div className="form-checkbox">
              <input 
                type="checkbox" 
                id="terms" 
                name="acepta_politicas"
                checked={formData.acepta_politicas}
                onChange={handleChange}
                required 
              />
              <label htmlFor="terms">
                Acepto el procesamiento de mi información de acuerdo con las Políticas de Privacidad.
              </label>
            </div>

            {/* Aquí agregamos el widget de ReCAPTCHA */}
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

        <div className="contacto-map-section">
          <iframe 
            title="Mapa de Ubicación CERTIMET"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2721669467655!2d-77.0016839!3d-12.0934893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7d0d0c3e6c9%3A0x6a0a0b0c0d0e0f0!2sAv.%20Canad%C3%A1%203263%2C%20San%20Luis%2015021!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe" 
            width="100%" 
            height="100%" 
            style={{ border: 0, minHeight: '500px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="contacto-info-bottom">
        <motion.div 
          className="info-bottom-container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {tarjetasContacto.map((tarjeta) => (
            <motion.div 
              key={tarjeta.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02, 
                boxShadow: "0 15px 30px rgba(0, 214, 57, 0.15)",
                borderColor: "rgba(0, 214, 57, 0.4)"
              }}
              className="info-card"
            >
              <div className="info-icon">
                {tarjeta.icono}
              </div>
              <div className="info-text">
                <h4>{tarjeta.titulo}</h4>
                <p>{tarjeta.linea1}</p>
                <span>{tarjeta.linea2}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contacto;