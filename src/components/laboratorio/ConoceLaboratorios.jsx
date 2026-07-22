import React from 'react';
import { Link } from 'react-router-dom';
import './ConoceLaboratorios.css';

// Ruta de tu imagen
import contactoImg from '../../image/laboratorio/DSC09315.jpeg';

const ConoceLaboratorios = () => {
  return (
    <section className="conoce-lab-section">
      
      {/* 1. CONTENEDOR DEL BANNER CON FONDO DIVIDIDO */}
      <div className="banner-split-bg">
        <div className="precision-banner-2">
          <p className="banner-quote">"Medir bien es el primer paso hacia la excelencia."</p>
          <p className="banner-subtext">
            La base de todo proceso industrial confiable comienza <br />
            con una <span className="text-green-banner">calibración precisa.</span>
          </p>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Fondo completamente celeste) */}
      <div className="conoce-lab-content">
        <div className="conoce-lab-container">
          
          {/* Columna Izquierda: Imagen */}
          <div className="conoce-lab-image-col">
            <img src={contactoImg} alt="Laboratorio de Calibración" className="conoce-lab-img" />
          </div>

          {/* Columna Derecha: Texto y Botón */}
          <div className="conoce-lab-text-col">
            <h2>
              Conoce nuestros<br />
              Laboratorios de Calibración
            </h2>
            
            <p>
              Detrás de cada certificado que emitimos hay un laboratorio especializado, equipa-
              do con patrones de alta precisión y procedimientos rigurosos bajo la norma
              ISO/IEC 17025:2017. Desde masa y temperatura hasta presión, longitud y electrici-
              dad, contamos con una división de laboratorios preparada para cubrir las principa-
              les magnitudes que tu industria necesita.
            </p>
            
            <p>
              Descubre a detalle cada uno de nuestros laboratorios, las magnitudes que calibra-
              mos y el respaldo técnico que garantiza la trazabilidad de tus instrumentos.
            </p>
            
            {/* Botón con redirección */}
            <Link to="/laboratorio" className="btn-conoce-lab">
              Ver nuestros laboratorios <span className="arrow">→</span>
            </Link>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default ConoceLaboratorios;