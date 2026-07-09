import React from 'react';
import { motion } from 'framer-motion';

const SolucionesLaboratorio = () => {
  return (
    <section className="soluciones-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="soluciones-title">
            Soluciones de metrología y calibración <br />
            <span className="highlight">a la medida de tu industria</span>
          </h2>
          <p className="soluciones-text">
            La medición es el proceso clave para garantizar la calidad de los productos y la eficiencia de los procesos industriales. Por ello, contar con instrumentos correctamente calibrados no es una opción, es una necesidad. En el Laboratorio de Metrología y Calibración CERTIMET ofrecemos servicios expertos de calibración, en instalaciones con condiciones ambientales controladas y procedimientos alineados a la norma ISO/IEC 17025.
          </p>
          <button className="btn-primary soluciones-btn">Contáctanos →</button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolucionesLaboratorio;