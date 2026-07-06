import React from 'react';
import './Certifications.css';

// Importación de los iconos
import icon1 from '../../image/icons/1b.webp';
import icon2 from '../../image/icons/2b.webp';
import icon3 from '../../image/icons/3b.webp';

// Importación de las homologaciones
import logoHodelpe from '../../image/homologations/HODELPE.webp';
import logoSgs from '../../image/homologations/SGS.webp';
import logoEin from '../../image/homologations/EIN-gris.png';
import logoBureau from '../../image/homologations/BUREAU.webp';

const Certifications = () => {
  return (
    <section className="certifications-section">
      <h2 className="certifications-title">
        Nuestros Estándares<br/>de Calidad
      </h2>

      <div className="certifications-grid">
        
        {/* TARJETA 1: Acreditaciones */}
        <div className="cert-card">
          <div className="card-icon-circle">
            <img src={icon1} alt="Icono Acreditaciones" />
          </div>
          <h3>Acreditaciones</h3>
          <p className="card-text">
            Laboratorio de Metrología y<br/>
            Calibración Acreditado por INACAL<br/>
            Norma Técnica ISO/IEC 17025:2017
          </p>
          <button className="cert-button">Nuestro alcance &rarr;</button>
        </div>

        {/* TARJETA 2: Certificaciones */}
        <div className="cert-card">
          <div className="card-icon-circle">
            <img src={icon2} alt="Icono Certificaciones" />
          </div>
          <h3>Certificaciones</h3>
          <p className="card-subtitle">Triple certificación ISO</p>
          <p className="card-text">
            CERTIMET cuenta con triple certificación<br/>
            ISO, resultado de su compromiso con la<br/>
            mejora continua y la calidad
          </p>
          <button className="cert-button">Ver especialidades</button>
        </div>

        {/* TARJETA 3: Homologaciones */}
        <div className="cert-card">
          <div className="card-icon-circle">
            <img src={icon3} alt="Icono Homologaciones" />
          </div>
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