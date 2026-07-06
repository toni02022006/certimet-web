import "./BannersTienda.css";
import whatsappIcon from "../../image/icons/whatsapp.webp";

const WaveText = ({ text, className }) => {
  return (
    <div className={`${className} wave-text`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

const BannersTienda = () => {
  return (
    <section className="banners-tienda">
      {/* Banner Catálogo */}
      <div className="banner banner-catalogo">
        <div className="banner-content">
          <WaveText
            className="banner-title"
            text="Revisa nuestro catálogo 2026"
          />
          <p>
            Descubre nuestra línea completa de productos industriales,
            certificados y soluciones para tu empresa.
          </p>
          <a href="/catalogo-2026" className="btn-vermas">
            Ver más
            <span>+</span>
          </a>
        </div>
      </div>

      {/* Banner WhatsApp con enlace directo */}
      <a
        href="https://wa.me/51992056019"
        target="_blank"
        rel="noopener noreferrer"
        className="banner banner-whatsapp"
      >
        <div className="whatsapp-info">
          <WaveText
            className="banner-title-green"
            text="Cotiza ahora"
          />
          <WaveText
            className="numero"
            text="992 056 019"
          />
          <p>Contáctanos vía WhatsApp</p>
        </div>
        <div className="whatsapp-icon">
          <img src={whatsappIcon} alt="WhatsApp" />
        </div>
      </a>
    </section>
  );
};

export default BannersTienda;