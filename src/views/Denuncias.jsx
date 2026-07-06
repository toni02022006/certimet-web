import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Denuncias.css';

const Denuncias = () => {
  // Estado para el motivo (Queja o Reclamo)
  const [motivo, setMotivo] = useState('');
  
  // Nombres de archivos para los inputs personalizados
  const [fileNames, setFileNames] = useState({
    file1: 'Ningún archivo seleccionado',
    file2: 'Ningún archivo seleccionado',
    file3: 'Ningún archivo seleccionado',
  });

  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0];
    setFileNames(prev => ({
      ...prev,
      [fileKey]: file ? file.name : 'Ningún archivo seleccionado'
    }));
  };

  return (
    <motion.div 
      className="denuncias-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ================= HERO SECTION ================= */}
      <div className="denuncias-hero">
        <div className="denuncias-hero-content">
          <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}>
            Libro de <span>Reclamaciones</span>
          </motion.h1>
          <p>Canal oficial de denuncias, quejas y reclamos de CERTIMET.</p>
        </div>
      </div>

      {/* ================= CONTENEDOR PRINCIPAL DEL FORMULARIO ================= */}
      <div className="denuncias-main-container">
        
        {/* Cabecera del Documento */}
        <div className="document-header">
          <div className="doc-title">
            <h2>LIBRO DE RECLAMACIONES</h2>
          </div>
          <div className="doc-company-info">
            <strong>CERTIMET S.A.C.</strong>
            <span>RUC N° 20123456789</span>
            <span>Av. Canadá 3263, Ofic. 301, San Luis, Lima - Perú</span>
          </div>
        </div>

        <form className="certimet-form denuncias-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* ================= SECCIÓN 1: DATOS DEL CLIENTE ================= */}
          <div className="form-section">
            <h3 className="section-title">DATOS DEL CLIENTE</h3>
            
            <div className="form-grid">
              {/* Fecha Actual (Simulada/Auto-llenada) */}
              <div className="form-group date-group">
                <label>Fecha de la solicitud</label>
                <div className="date-inputs">
                  <input type="text" value="26" readOnly className="read-only-input" />
                  <input type="text" value="Junio" readOnly className="read-only-input" />
                  <input type="text" value="2026" readOnly className="read-only-input" />
                </div>
              </div>

              <div className="form-group">
                <label>Sede / Servicio de Atención</label>
                <select defaultValue="Sede Principal - San Luis">
                  <option value="Sede Principal - San Luis">Sede Principal - San Luis</option>
                  <option value="Servicio en Instalaciones del Cliente">Servicio en Instalaciones del Cliente</option>
                  <option value="Atención Digital / Web">Atención Digital / Web</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>¿Cómo desea que nos comuniquemos con Ud. acerca de su reclamo?</label>
                <select defaultValue="correo">
                  <option value="correo">Mediante Correo Electrónico</option>
                  <option value="telefono">Mediante Llamada Telefónica</option>
                  <option value="whatsapp">Mediante WhatsApp</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nombres *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Apellido Paterno *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Apellido Materno *</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Doc. Identidad *</label>
                <select defaultValue="DNI">
                  <option value="DNI">DNI</option>
                  <option value="CE">Carné de Extranjería</option>
                  <option value="RUC">RUC</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div className="form-group">
                <label>Número de Documento *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Teléfono / Celular</label>
                <input type="tel" />
              </div>

              <div className="form-group full-width">
                <label>Correo Electrónico *</label>
                <input type="email" required />
              </div>

              <div className="form-group full-width">
                <label>Dirección Física</label>
                <input type="text" placeholder="Av. / Calle / Jr." />
              </div>

              <div className="form-group">
                <label>Departamento</label>
                <select defaultValue="">
                  <option value="" disabled>Seleccione un departamento</option>
                  <option value="Lima">Lima</option>
                  <option value="Arequipa">Arequipa</option>
                  <option value="Callao">Callao</option>
                </select>
              </div>
              <div className="form-group">
                <label>Provincia</label>
                <select defaultValue="">
                  <option value="" disabled>Seleccione una provincia</option>
                  <option value="Lima">Lima</option>
                </select>
              </div>
              <div className="form-group">
                <label>Distrito</label>
                <select defaultValue="">
                  <option value="" disabled>Seleccione un distrito</option>
                  <option value="San Luis">San Luis</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mayor de edad</label>
                <select defaultValue="Si">
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* ================= SECCIÓN 2: IDENTIFICAR QUEJA / RECLAMO ================= */}
          <div className="form-section">
            <h3 className="section-title">IDENTIFICAR QUEJA / RECLAMO</h3>
            
            <div className="form-group full-width">
              <label>Motivo *</label>
              <select value={motivo} onChange={(e) => setMotivo(e.target.value)} required>
                <option value="" disabled>Seleccione una opción</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
              </select>
            </div>

            {/* Definiciones legales dinámicas */}
            <div className="legal-definitions">
              <ul>
                <li className={motivo === 'Queja' ? 'highlight' : ''}>
                  <strong>Queja:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.
                </li>
                <li className={motivo === 'Reclamo' ? 'highlight' : ''}>
                  <strong>Reclamo:</strong> Disconformidad relacionada a los productos o servicios.
                </li>
              </ul>
            </div>

            <div className="form-group full-width">
              <label>Detalle de la solicitud *</label>
              <textarea rows="5" placeholder="Describa de manera clara y detallada el motivo de su comunicación..." required></textarea>
            </div>

            {/* Subida de Archivos */}
            <div className="file-upload-section">
              <p className="file-note">(*) Archivo debe tener como máximo 4MB y solo se permiten archivos JPG, JPEG, PNG o PDF.</p>
              
              <div className="file-inputs-container">
                {/* Archivo 1 */}
                <div className="form-group-file">
                  <label>Archivo 1 (opcional)</label>
                  <div className="custom-file-input">
                    <input type="file" id="file1" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, 'file1')} />
                    <label htmlFor="file1" className="btn-file">Seleccionar archivo</label>
                    <span className="file-name">{fileNames.file1}</span>
                  </div>
                </div>

                {/* Archivo 2 */}
                <div className="form-group-file">
                  <label>Archivo 2 (opcional)</label>
                  <div className="custom-file-input">
                    <input type="file" id="file2" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, 'file2')} />
                    <label htmlFor="file2" className="btn-file">Seleccionar archivo</label>
                    <span className="file-name">{fileNames.file2}</span>
                  </div>
                </div>

                {/* Archivo 3 */}
                <div className="form-group-file">
                  <label>Archivo 3 (opcional)</label>
                  <div className="custom-file-input">
                    <input type="file" id="file3" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, 'file3')} />
                    <label htmlFor="file3" className="btn-file">Seleccionar archivo</label>
                    <span className="file-name">{fileNames.file3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER DEL FORMULARIO ================= */}
          <div className="form-footer-legal">
            <p>* La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
            <p>* El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles, el cual es improrrogable.</p>
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn-submit-denuncia">
              ENVIAR FORMULARIO
            </button>

            {/* Simulación de reCaptcha */}
            <div className="recaptcha-placeholder">
              <div className="checkbox-box"></div>
              <span>No soy un robot</span>
              <div className="rc-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/200px-RecaptchaLogo.svg.png" alt="reCaptcha" width="30"/>
              </div>
            </div>
          </div>

        </form>
      </div>
    </motion.div>
  );
};

export default Denuncias;