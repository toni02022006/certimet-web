import React from 'react';
import './Footer.css';

// Rutas de imágenes
import logo from "../../image/Imagotipo-blanco-V2.png";
import iconFb from "../../image/icons/Recurso 10.webp";
import iconIg from "../../image/icons/Recurso 9.webp";
import iconLi from "../../image/icons/Recurso 12.webp";
import iconYt from "../../image/icons/Recurso 8.webp";
import iconTk from "../../image/icons/Recurso 11.webp";
import iconWp from "../../image/icons/whatsapp.webp";
import iconMail from "../../image/icons/correo.webp";

// Nueva importación de la balanza
import balanceImg from "../../image/balance.png"; 

const Footer = () => {
  return (
    /* ESTE ES EL DIV QUE FALTABA PARA PINTAR EL FONDO CELESTE */
    <div className="footer-bg-wrapper">
      <footer className="footer-container">
        
        {/* Tarjeta flotante superior ("Mantente al día") */}
        <div className="footer-cta-card">
          <div className="cta-text-content">
            <h2>¡Mantente al día<br/>con CERTIMET!</h2>
            <p>
              Suscríbete y recibe nuestras últimas novedades, ofertas en<br/>
              servicios de calibración y actualizaciones del sector industrial<br/>
              directamente en tu correo.
            </p>
            
            <div className="cta-form">
              <input 
                type="email" 
                placeholder="Ingresa tu correo electrónico aquí" 
                className="cta-input"
              />
              
              <label className="cta-checkbox-label">
                <input type="checkbox" />
                <span>Acepto los <a href="#terminos">Términos y Condiciones</a> y la <a href="#privacidad">Política de privacidad</a></span>
              </label>
              
              <button className="cta-button outline">
                Suscríbete &rarr;
              </button>
            </div>
          </div>
          
          {/* Sección de la imagen (Balanza PNG) */}
          <div className="cta-image-content">
            <img 
              src={balanceImg} 
              alt="Balanza de precisión Certimet" 
              className="balance-img"
            />
          </div>
        </div>

        <div className="footer-content">
          
          {/* Columna 1: Marca y Redes */}
          <div className="footer-col brand-col">
            <img src={logo} alt="Certimet Logo" className="footer-logo" />
            <p className="brand-tagline">Presición que certifica,<br />Ingeniería que transforma</p>
            <p className="brand-ruc">R.U.C.: 20605732861</p>
            
            <div className="contact-block">
              <p className="block-title">Contáctanos</p>
              <div className="contact-icons">
                <img src={iconWp} alt="WhatsApp" />
                <img src={iconMail} alt="Email" />
              </div>
            </div>

            <div className="social-block">
              <p className="block-title">Síguenos</p>
              <div className="social-icons">
                <img src={iconFb} alt="Facebook" />
                <img src={iconIg} alt="Instagram" />
                <img src={iconLi} alt="LinkedIn" />
                <img src={iconYt} alt="YouTube" />
                <img src={iconTk} alt="TikTok" />
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-col">
            <h3>Navegación</h3>
            <ul>
              <li>Política de privacidad</li>
              <li>Blog</li>
              <li>Acreditación</li>
              <li>Descargas</li>
              <li>Canal de denuncias</li>
              <li>Contáctanos</li>
              <li>Trabaja con nosotros</li>
            </ul>
          </div>

          {/* Columna 3: Soluciones */}
          <div className="footer-col">
            <h3>Soluciones</h3>
            <ul>
              <li>Metrología</li>
              <li>Ingeniería</li>
              <li>Servicios</li>
              <li>Tienda</li>
            </ul>
          </div>

          {/* Columna 4: Ubícanos */}
          <div className="footer-col">
            <h3>Ubícanos</h3>
            <p className="location-text"><strong>Lima:</strong> Av. Canadá Nro.<br/>3263, Ofic. 301 - San Luis</p>
          </div>

        </div>
        
        {/* Footer Inferior */}
        <div className="footer-bottom">
          <p>MSF Creative Agencia de marketing digital © 2026. Todos los Derechos Reservados.</p>
          <p>Libro de reclamaciones</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;