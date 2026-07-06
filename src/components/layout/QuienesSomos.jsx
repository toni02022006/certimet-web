import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './QuienesSomos.css';

// Importación de las nuevas imágenes
import cientificoImg from '../../image/cientifico_QS.png';
// Nota: La imagen del fondo verde la usaremos directamente en el CSS

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
  hidden: { opacity: 0, scale: 0.85, rotateY: -10, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" }
  }
};

const QuienesSomos = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* COLUMNA IZQUIERDA (Imagen del Científico) */}
        <motion.div 
          className="about-image-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={imageReveal}
          style={{ perspective: 1000 }} 
        >
          <img src={cientificoImg} alt="Laboratorio CERTIMET" className="about-real-image" />
        </motion.div>

        {/* COLUMNA DERECHA (Texto) */}
        <motion.div 
          className="about-text-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} 
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.span variants={modernReveal} className="about-subtitle">
            — ¿QUIÉNES SOMOS?
          </motion.span>
          
          <motion.h2 variants={modernReveal} className="about-title">
            Laboratorio de<br/>
            metrología y calibración,<br/>
            ingeniería y automatización<br/>
            industrial
          </motion.h2>
          
          <motion.p variants={modernReveal} className="about-description">
            <strong>CERTIMET</strong> es un laboratorio de Metrología, Calibración e Ingeniería & Automatización 
            Industrial, fundado en 2020 y ubicado en San Luis, Lima. Atendemos al sector industrial 
            con soluciones precisas y confiables, respaldados por nuestra acreditación INACAL bajo 
            la norma ISO/IEC 17025:2017 y triple certificación ISO. Nos distingue el trato cercano y 
            personalizado con cada cliente.
          </motion.p>
          
        </motion.div>

      </div>
    </section>
  );
};

export default QuienesSomos;