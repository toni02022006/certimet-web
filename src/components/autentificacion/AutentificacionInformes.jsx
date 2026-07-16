import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AutentificacionInformes.css';

const AutentificacionInformes = () => {
  const [formData, setFormData] = useState({
    prefijo: '',
    anio: '',
    correlativo: '',
    idInforme: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultando Informe:', formData);
    // Lógica de consulta
  };

  return (
    <div className="auth-page">
      
      {/* HERO SECTION - Resuelve el problema del header transparente */}
      <div className="auth-hero">
        <div className="auth-hero-content">
          <h1>Autentificación de <span>Informes</span></h1>
          <p>Canal oficial para verificar la validez y autenticidad de los informes emitidos por CERTIMET.</p>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL SUPERPUESTO */}
      <motion.div 
        className="auth-main-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        
        {/* CABECERA TIPO DOCUMENTO (Similar a Libro de Reclamaciones) */}
        <div className="auth-document-header">
          <div className="auth-doc-title">
            <h2>CONSULTA DE INFORMES</h2>
          </div>
          <div className="auth-doc-company">
            <strong>CERTIMET S.A.C.</strong>
            <span>RUC N° 20605732861</span>
            <span>Av. Canadá 3263, Ofic. 301, San Luis, Lima - Perú</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-section">
            <h3 className="auth-section-title">Ingrese los datos del informe</h3>
            
            <div className="auth-form-grid">
              {/* Campo dividido en 3 */}
              <div className="auth-form-group">
                <label>Número de Informe</label>
                <div className="auth-split-inputs">
                  <input 
                    type="text" 
                    name="prefijo"
                    placeholder="Ej: IE" 
                    value={formData.prefijo}
                    onChange={handleChange}
                    required
                  />
                  <input 
                    type="text" 
                    name="anio"
                    placeholder="Ej: 26" 
                    value={formData.anio}
                    onChange={handleChange}
                    required
                  />
                  <input 
                    type="text" 
                    name="correlativo"
                    placeholder="Ej: 4899" 
                    value={formData.correlativo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Campo ID de informe */}
              <div className="auth-form-group">
                <label>Id de Informe</label>
                <input 
                  type="text" 
                  name="idInforme"
                  placeholder="Ej: 0000092999" 
                  value={formData.idInforme}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-action-center">
              <button type="submit" className="btn-submit-auth">
                CONSULTAR INFORME
              </button>
            </div>
          </div>
        </form>

        {/* SECCIÓN DE INFORMACIÓN Y CONTACTOS */}
        <div className="auth-info-footer">
          <p className="auth-info-text">
            Estimados usuarios, les informamos que los informes disponibles en nuestra plataforma solo pueden ser visualizados a partir del año 2024. Si necesitas consultar informes de años anteriores, por favor comunícate con nosotros a través de los siguientes canales:
          </p>
          
          <div className="auth-contact-grid">
            <a href="mailto:gerencia@certimet.pe" className="auth-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Gerencia General
            </a>
            <a href="mailto:comercial@certimet.pe" className="auth-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Comercial Medio Ambiente
            </a>
            <a href="mailto:soporte@certimet.pe" className="auth-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Gestión de Calidad
            </a>
          </div>

          <p className="auth-note-highlight">
            Los informes de ensayo emitidos el día de hoy podrán visualizarse dentro de las próximas 24 horas (días hábiles).
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default AutentificacionInformes;