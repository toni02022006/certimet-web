import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiciosIngenieria.css';

// Importación de la imagen
import imgMensaje from '../../image/laboratorio/msdefyp.png';

const ServiciosIngenieria = () => {
  // Ahora usamos un arreglo para permitir múltiples acordeones abiertos al mismo tiempo.
  // Iniciamos con [0] para que el primer elemento esté abierto por defecto.
  const [activeIndices, setActiveIndices] = useState([0]);

  const toggleAccordion = (index) => {
    // Si el índice ya está en el arreglo, lo quitamos (cerramos el acordeón)
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      // Si no está, lo agregamos (abrimos el acordeón sin cerrar los demás)
      setActiveIndices([...activeIndices, index]);
    }
  };

  const acordeonData = [
    {
      title: 'Servicio de Montaje y Conexionado Eléctrico',
      items: [
        'Elaboración de Tableros de Control con Certificación SIL 2.',
        'Equipamiento de Salas de control y electricidad.',
        'Conexionado de Redes de Comunicación Industrial.',
        'Montaje y Conexionado Eléctrico'
      ]
    },
    {
      title: 'Ingeniería para el Desarrollo de Aplicaciones',
      items: [
        'Configuración y programación de PLC\'s, PAC\'s.',
        'Implementación y mantenimiento de SCADA.',
        'Configuración y creación de recetas para HMI.',
        'Documentación técnica.'
      ]
    },
    {
      title: 'Ingeniería Especializada',
      items: [
        'Auditorías y diagnósticos de sistemas de control.',
        'Migración y actualización de plataformas tecnológicas.',
        'Diseño de arquitecturas de red industrial seguras.'
      ]
    }
  ];

  return (
    <section className="si-section">
      
      {/* BANNER FLOTANTE SUPERIOR */}
      <div className="si-banner-container">
        <div className="si-banner">
          <div className="si-banner-text">
            <h2>
              ¿Tienes un proyecto en curso?<br />
              En CERTIMET podemos ayudarte
            </h2>
            <Link to="/contacto" className="si-banner-btn">
              Consulte aquí &rarr;
            </Link>
          </div>
          
          <img src={imgMensaje} alt="Icono Mensaje Check" className="si-banner-img" />
        </div>
      </div>

      {/* SECCIÓN DE ACORDEÓN */}
      <div className="si-acordeon-wrapper">
        <h2 className="si-main-title">
          Servicios de Ingeniería, Automatización<br />
          y Control Industrial
        </h2>

        <div className="si-acordeon">
          {acordeonData.map((servicio, index) => {
            // Verificamos si este índice específico está dentro del arreglo de abiertos
            const isOpen = activeIndices.includes(index);

            return (
              <div 
                key={index} 
                className={`si-acordeon-item ${isOpen ? 'active' : ''}`}
              >
                {/* Cabecera */}
                <div 
                  className="si-acordeon-header" 
                  onClick={() => toggleAccordion(index)}
                >
                  <h3>{servicio.title}</h3>
                  <span className="si-icon">{isOpen ? '-' : '+'}</span>
                </div>

                {/* Cuerpo Desplegable */}
                <div 
                  className="si-acordeon-body"
                  style={{ maxHeight: isOpen ? '500px' : '0px' }}
                >
                  <div className="si-acordeon-content">
                    <ol>
                      {servicio.items.map((itemTexto, i) => (
                        <li key={i}>{itemTexto}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Inferior */}
        <div className="si-btn-bottom-container">
          <Link to="/contacto" className="si-btn-solicita">
            Solicita un servicio &rarr;
          </Link>
        </div>
      </div>

    </section>
  );
};

export default ServiciosIngenieria;