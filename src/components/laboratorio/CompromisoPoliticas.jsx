import React, { useState } from 'react';
import './CompromisoPoliticas.css';

// Importación de los íconos (rutas que indicaste)
import checkIcon from '../../image/laboratorio/check.webp';
import docIcon from '../../image/laboratorio/doc.webp';
import tiempoIcon from '../../image/laboratorio/tiempo.webp';

const politicasData = [
  {
    id: 0,
    title: "Política de Calidad",
    icon: checkIcon,
    content: "Compromiso con la mejora continua y el cumplimiento de la norma ISO/IEC 17025:2017 en cada uno de nuestros servicios metrológicos."
  },
  {
    id: 1,
    title: "Política Ambiental",
    icon: docIcon,
    content: "Gestión responsable de nuestro impacto ambiental, alineada a la norma ISO 14001:2015."
  },
  {
    id: 2,
    title: "Política de Seguridad y Salud en el Trabajo",
    icon: tiempoIcon,
    content: "Prevención de riesgos y bienestar de nuestro equipo, conforme a la norma ISO 45001:2018."
  }
];

const CompromisoPoliticas = () => {
  // Estado para guardar qué acordeones están abiertos.
  // Inicializamos con todos abiertos [0, 1, 2] para que se vea como en tu imagen al cargar la página.
  const [openItems, setOpenItems] = useState([0, 1, 2]);

  // Función para abrir/cerrar de forma independiente
  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      // Si está abierto, lo cerramos filtrándolo del array
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      // Si está cerrado, lo agregamos al array para abrirlo
      setOpenItems([...openItems, id]);
    }
  };

  return (
    <section className="compromiso-section">
      <div className="compromiso-container">
        
        {/* Columna Izquierda: Textos */}
        <div className="compromiso-text-col">
          <h2>
            Comprometidos<br />
            con la calidad,<br />
            la seguridad<br />
            y la excelencia<br />
            técnica
          </h2>
          <p>
            Nuestras políticas reflejan los principios que guían cada
            servicio que ofrecemos: rigurosidad técnica, transparencia y
            un compromiso constante con la mejora continua.
          </p>
        </div>

        {/* Columna Derecha: Acordeones */}
        <div className="compromiso-accordion-col">
          {politicasData.map((politica, index) => {
            const isOpen = openItems.includes(politica.id);
            
            return (
              <div 
                key={politica.id} 
                className={`accordion-item ${index === politicasData.length - 1 ? 'last-item' : ''}`}
              >
                {/* Cabecera Clickable */}
                <div className="accordion-header" onClick={() => toggleItem(politica.id)}>
                  <div className="accordion-header-left">
                    <img src={politica.icon} alt="Icono" className="accordion-icon" />
                    <h3 className="accordion-title">{politica.title}</h3>
                  </div>
                  
                  {/* Flecha (Chevron) */}
                  <svg 
                    className={`accordion-arrow ${isOpen ? 'open' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {/* Contenido Desplegable (Animado con CSS Grid) */}
                <div className={`accordion-collapse ${isOpen ? 'open' : ''}`}>
                  <div className="accordion-content-inner">
                    <p className="accordion-text">{politica.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CompromisoPoliticas;