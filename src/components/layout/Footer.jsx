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
import flechaVerde from "../../image/icons/FLECHA VERDE.webp"; // Nueva importación

const Footer = () => {
  return (
    <footer className="footer-container">
      
      {/* Tarjeta flotante superior ("Da el siguiente paso") */}
      <div className="footer-cta-card">
        <div className="cta-text-content">
          <h2>Da el siguiente paso<br/>hacia la precisión y la calidad.</h2>
          <p>
            quat. Duis autem vel eum iriure dolor in hendrerit in<br/>
            vulputate velit esse molestie consequat, vel illum<br/>
            dolore eu feugiat nulla facilisis at vero eros et<br/>
            accum
          </p>
          <button className="cta-button">
            Nuestro alcance <img src={flechaVerde} alt="Flecha" className="cta-arrow" />
          </button>
        </div>
        
        {/* Nueva sección para la imagen de internet de prueba */}
        <div className="cta-image-content">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" 
            alt="Ingeniería y Precisión" 
          />
        </div>
      </div>

      <div className="footer-content">
        
        {/* Columna 1: Marca y Redes */}
        <div className="footer-col brand-col">
          <img src={logo} alt="Certimet Logo" className="footer-logo" />
          <p className="brand-tagline">Presición que certifica,<br />Ingeniería que transforma</p>
          
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
          <p className="location-text">Lima: Av. Canadá Nro.<br/>3263, Ofic. 301 - San Luis</p>
        </div>

      </div>
      
      {/* Footer Inferior */}
      <div className="footer-bottom">
        <p>MSF Creative Agencia de marketing digital © 2026. Todos los Derechos Reservados.</p>
        <p>Libro de reclamaciones</p>
      </div>
    </footer>
  );
};

export default Footer;