import React from 'react';
import './Certifications.css';

// Importación de las homologaciones usando tus rutas relativas
import logoHodelpe from '../../image/homologations/HODELPE.webp';
import logoSgs from '../../image/homologations/SGS.webp';
import logoEin from '../../image/homologations/EIN-gris.png';
import logoBureau from '../../image/homologations/BUREAU.webp';

const Certifications = () => {
  return (
    <section className="certifications-section">
      {/* El título que faltaba en el diseño */}
      <h2 className="certifications-title">Nuestras Credenciales</h2>
      <div className="certifications-divider"></div>

      <div className="certifications-grid">
        
        {/* TARJETA 1: Acreditaciones */}
        <div className="cert-card light-card">
          <div className="card-icon-circle blue-circle"></div>
          <h3>Acreditaciones</h3>
          <p className="card-text blue-text">
            Laboratorio de Metrología y<br/>
            Calibración Acreditado por INACAL<br/>
            Norma Técnica ISO/IEC 17025:2017
          </p>
          <button className="cert-button">Nuestro alcance &rarr;</button>
        </div>

        {/* TARJETA 2: Certificaciones (Oscura) */}
        <div className="cert-card dark-card">
          <div className="card-icon-circle green-circle"></div>
          <h3>Certificaciones</h3>
          <p className="card-subtitle">Triple certificación ISO</p>
          <p className="card-text white-text">
            CERTIMET cuenta con triple certificación<br/>
            ISO, resultado de su compromiso con la<br/>
            mejora continua y la calidad
          </p>
          <button className="cert-button">Ver especialidades</button>
        </div>

        {/* TARJETA 3: Homologaciones */}
        <div className="cert-card light-card">
          <div className="card-icon-circle blue-circle"></div>
          <h3>Homologaciones</h3>
          
          <div className="homologations-logos-grid">
            <img src={logoHodelpe} alt="HODELPE" className="homo-logo" />
            <img src={logoSgs} alt="SGS" className="homo-logo" />
            <img src={logoEin} alt="EIN" className="homo-logo" />
            <img src={logoBureau} alt="Bureau Veritas" className="homo-logo" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;