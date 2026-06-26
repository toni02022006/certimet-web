import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './QuienesSomos.css';

const modernReveal = {
  hidden: { opacity: 0, x: -30, filter: "blur(8px)", scale: 0.98 },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)", 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.85, rotateY: 10, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" }
  }
};

const labImage = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80";

const QuienesSomos = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* COLUMNA IZQUIERDA */}
        <motion.div 
          className="about-text-content"
          initial="hidden"
          whileInView="visible"
          /* 👇 LA MAGIA AQUÍ: once: false hace que se repita cada vez que entras a la sección */
          viewport={{ once: false, amount: 0.4 }} 
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.span variants={modernReveal} className="about-subtitle">
            ¿QUIÉNES SOMOS?
          </motion.span>
          
          <motion.h2 variants={modernReveal} className="about-title">
            Laboratorio de Calibración <span className="text-green-highlight">Acreditado</span> e Ingeniería & <span className="text-green-highlight">Automatización Industrial</span>
          </motion.h2>
          
          <motion.p variants={modernReveal} className="about-description">
            En <strong>CERTIMET</strong> ofrecemos soluciones integrales para la industria nacional a través de dos unidades clave: nuestro Laboratorio de Calibración acreditado bajo la norma <strong>ISO/IEC 17025:2017</strong>, especializado en servicios de calibración en múltiples magnitudes; y nuestra División de Automatización y Control Industrial, enfocada en la integración de sistemas, variadores, PLCs, SCADA y sensórica avanzada.
          </motion.p>
          
          <motion.p variants={modernReveal} className="about-description">
            Además, contamos con un Laboratorio de Ensayo para el análisis de calidad de espumas contra incendios según normativas internacionales. Representamos marcas líderes en instrumentación y somos proveedores de equipos de medición industrial con soporte técnico, garantía local, contratos de mantenimiento, consultoría y capacitaciones especializadas.
          </motion.p>

          <motion.div variants={modernReveal} className="about-buttons">
            <Link to="/nosotros" className="btn-solid-green">
              Conoce más
            </Link>
            <Link to="/acreditacion" className="btn-outline-blue">
              Ver acreditación
            </Link>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA */}
        <motion.div 
          className="about-image-wrapper"
          initial="hidden"
          whileInView="visible"
          /* 👇 Lo mismo aquí: once: false para la imagen */
          viewport={{ once: false, amount: 0.4 }}
          variants={imageReveal}
          style={{ perspective: 1000 }} 
        >
          <img src={labImage} alt="Laboratorio CERTIMET" className="about-real-image" />
          <div className="about-image-decoration"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default QuienesSomos;