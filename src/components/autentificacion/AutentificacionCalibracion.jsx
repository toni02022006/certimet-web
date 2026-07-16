import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AutentificacionCalibracion.css';

const AutentificacionCalibracion = () => {
  const [formData, setFormData] = useState({
    numeroCalibracion: '',
    idCalibracion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultando Calibración:', formData);
    // Lógica de conexión con la API/Backend
  };

  return (
    <div className="auth-cal-page">
      
      {/* HERO SECTION */}
      <div className="auth-cal-hero">
        <div className="auth-cal-hero-content">
          <h1>Autentificación de <span>Calibraciones</span></h1>
          <p>Plataforma oficial para verificar la validez de los certificados de calibración emitidos por CERTIMET.</p>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL SUPERPUESTO */}
      <motion.div 
        className="auth-cal-main-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        
        {/* CABECERA TIPO DOCUMENTO */}
        <div className="auth-cal-document-header">
          <div className="auth-cal-doc-title">
            <h2>CONSULTA DE CERTIFICADOS</h2>
          </div>
          <div className="auth-cal-doc-company">
            <strong>CERTIMET S.A.C.</strong>
            <span>RUC N° 20605732861</span>
            <span>Av. Canadá 3263, Ofic. 301, San Luis, Lima - Perú</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-cal-form-section">
            <h3 className="auth-cal-section-title">Ingrese los datos del Certificado de Calibración</h3>
            
            <div className="auth-cal-form-grid">
              
              {/* Campo: Número de Calibración */}
              <div className="auth-cal-form-group">
                <div className="auth-cal-label-wrapper">
                  <label htmlFor="numeroCalibracion">Número de Calibración</label>
                  <span className="auth-cal-tooltip-icon" title="Encuentre este número en la parte superior derecha de su certificado">?</span>
                </div>
                <input 
                  type="text" 
                  id="numeroCalibracion"
                  name="numeroCalibracion"
                  placeholder="Ej: 40" 
                  value={formData.numeroCalibracion}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Campo: Id de Calibración */}
              <div className="auth-cal-form-group">
                <div className="auth-cal-label-wrapper">
                  <label htmlFor="idCalibracion">Id de Calibración</label>
                  <span className="auth-cal-tooltip-icon" title="Código único de identificación del certificado de calibración">?</span>
                </div>
                <input 
                  type="text" 
                  id="idCalibracion"
                  name="idCalibracion"
                  placeholder="Ej: 336782" 
                  value={formData.idCalibracion}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="auth-cal-action-center">
              <button type="submit" className="btn-submit-auth-cal">
                CONSULTAR CERTIFICADO
              </button>
            </div>
          </div>
        </form>

        {/* SECCIÓN DE INFORMACIÓN Y CONTACTOS */}
        <div className="auth-cal-info-footer">
          <p className="auth-cal-info-text">
            Estimados usuarios, les informamos que los certificados disponibles en nuestra plataforma solo pueden ser visualizados a partir del año 2024. Si necesitas consultar certificados de años anteriores, por favor comunícate con nosotros a través de los siguientes correos electrónicos:
          </p>
          
          <div className="auth-cal-contact-grid">
            <a href="mailto:gerencia@certimet.pe" className="auth-cal-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Gerencia General
            </a>
            <a href="mailto:calibraciones@certimet.pe" className="auth-cal-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Gerencia de Calibraciones
            </a>
            <a href="mailto:soporte@certimet.pe" className="auth-cal-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Jefatura de Calidad
            </a>
          </div>

          <p className="auth-cal-note-highlight">
            Los Certificados de Calibración que se han emitido el día de hoy, se podrán visualizar dentro de las 24 horas (días hábiles).
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default AutentificacionCalibracion;