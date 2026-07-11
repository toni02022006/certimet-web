import React, { useState } from 'react';
import './GestionCalibraciones.css';

// Importación de los iconos
import checkIcon from '../../image/laboratorio/check.webp';
import docIcon from '../../image/laboratorio/doc.webp';
import tiempoIcon from '../../image/laboratorio/tiempo.webp';

const GestionCalibraciones = () => {
  // Ahora usamos un arreglo para guardar múltiples IDs. 
  // Ponemos [0] para que el primer ítem empiece abierto por defecto.
  // Si quieres que todos empiecen cerrados, usa: useState([])
  const [abiertosIds, setAbiertosIds] = useState([0]);

  // Función para alternar el acordeón independientemente
  const toggleAcordeon = (id) => {
    setAbiertosIds((prevAbiertos) => {
      // Si el ID ya está en el arreglo, lo quitamos (cerramos el acordeón)
      if (prevAbiertos.includes(id)) {
        return prevAbiertos.filter((item) => item !== id);
      } else {
        // Si no está en el arreglo, lo agregamos (abrimos el acordeón)
        return [...prevAbiertos, id];
      }
    });
  };

  // Arreglo de datos para generar los items
  const caracteristicas = [
    {
      id: 0,
      titulo: "Conoce el estatus de tus calibraciones",
      descripcion: "Consulta en tiempo real el estado de cada uno de tus instrumentos en proceso de calibración, sin necesidad de llamadas ni correos.",
      icono: checkIcon
    },
    {
      id: 1,
      titulo: "Descarga tus certificados",
      descripcion: "Accede y descarga tus certificados de calibración acreditados y no acreditados, de manera rápida.",
      icono: docIcon
    },
    {
      id: 2,
      titulo: "Consulta cuándo se realizó tu servicio",
      descripcion: "Consulta la fecha en que se realizó tu calibración y su fecha de vencimiento.",
      icono: tiempoIcon
    }
  ];

  return (
    <section className="gestion">
      <div className="gestion-container">
        
        {/* Columna Izquierda: Textos y Botón */}
        <div className="gestion-left">
          <h2 className="gestion-title">
            <span className="title-blue-light">Gestiona tus</span><br />
            <span className="title-blue-light">calibraciones en</span><br />
            <span className="title-green-bold">CERTIMET</span>
          </h2>
          <p className="gestion-sub">
            Accede a nuestra plataforma y centraliza el historial de calibraciones e instrumentos de tu empresa con rapidez, transparencia y seguridad.
          </p>
          <button className="gestion-btn">
            Contáctanos <span className="arrow">→</span>
          </button>
        </div>

        {/* Columna Derecha: Tarjeta Azul (Acordeones) */}
        <div className="gestion-right">
          <div className="gestion-card">
            
            {caracteristicas.map((item) => {
              // Verificamos si este ítem en particular está en nuestro arreglo de abiertos
              const estaAbierto = abiertosIds.includes(item.id);

              return (
                <div 
                  key={item.id} 
                  className={`feature-item ${estaAbierto ? 'abierto' : ''}`}
                >
                  <div 
                    className="feature-header" 
                    onClick={() => toggleAcordeon(item.id)}
                  >
                    <div className="feature-title-wrapper">
                      <img src={item.icono} alt={`Icono ${item.titulo}`} className="feature-icon" />
                      <h3 className="feature-title">{item.titulo}</h3>
                    </div>
                    <svg 
                      className="feature-arrow" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  <div className="feature-desc-wrapper">
                    <p className="feature-desc">
                      {item.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default GestionCalibraciones;