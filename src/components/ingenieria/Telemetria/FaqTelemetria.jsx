import React, { useState } from 'react';
import './FaqTelemetria.css';

const FaqTelemetria = () => {
  // Estado para controlar qué pregunta está abierta. 
  // null significa que todas están cerradas al inicio.
  const [activeIndex, setActiveIndex] = useState(null);

  // Lista de preguntas y respuestas ya redactadas para Telemetría
  const faqs = [
    {
      id: 1,
      pregunta: "1. ¿Qué es la telemetría industrial y cómo funciona?",
      respuesta: "La telemetría industrial es una tecnología que permite la medición remota y el reporte de información de forma automática. Funciona mediante la instalación de sensores en sus equipos físicos, los cuales recopilan datos en tiempo real y los transmiten a través de redes inalámbricas (como LoRaWAN, 4G o Wi-Fi) hacia una plataforma centralizada en la nube, donde pueden ser analizados para la toma de decisiones gerenciales."
    },
    {
      id: 2,
      pregunta: "2. ¿En qué se diferencia del monitoreo presencial tradicional?",
      respuesta: "A diferencia del monitoreo presencial, donde el personal debe acercarse físicamente a las máquinas con tableros locales o planillas, la telemetría digitaliza el proceso enviando los datos continuamente a sus dispositivos (PC, tablet o celular). Esto elimina el error humano, reduce los tiempos de exposición al riesgo en planta y permite generar alertas inmediatas antes de que ocurra una falla."
    },
    {
      id: 3,
      pregunta: "3. ¿Qué variables o activos críticos pueden monitorearse?",
      respuesta: "Prácticamente cualquier variable física puede ser monitoreada si se cuenta con el sensor adecuado. Las más comunes en la industria incluyen temperatura, presión, humedad, nivel de tanques, caudal, consumo eléctrico, vibración y calidad de energía en equipos como motores, transformadores, compresores y bombas."
    },
    {
      id: 4,
      pregunta: "4. ¿Se puede implementar telemetría en plantas ya existentes?",
      respuesta: "Sí, de forma total. Nuestros sistemas IoT (Internet de las Cosas) son altamente escalables y poco invasivos. No es necesario reemplazar su maquinaria actual; adaptamos sensores externos y dataloggers que se comunican con sus activos existentes sin interrumpir su proceso productivo durante la instalación."
    },
    {
      id: 5,
      pregunta: "5. ¿La información de mi empresa está segura en la nube?",
      respuesta: "Absolutamente. Los datos transmitidos desde nuestros gateways hacia la nube utilizan protocolos de encriptación avanzados y certificados de seguridad estándar de la industria (como MQTT sobre TLS). La información se aloja en servidores robustos (como AWS o Azure) con respaldos automáticos y acceso restringido solo al personal autorizado de su empresa."
    },
    {
      id: 6,
      pregunta: "6. ¿Cómo ayuda este sistema a la reducción de costos?",
      respuesta: "La telemetría reduce costos por tres frentes: primero, evita las millonarias pérdidas por paradas de planta no planificadas; segundo, optimiza el consumo energético al detectar equipos ineficientes o fugas; y tercero, disminuye los gastos operativos al evitar traslados innecesarios del personal técnico al campo solo para realizar lecturas de rutina."
    }
  ];

  const toggleAccordion = (index) => {
    // Si la pregunta en la que hacemos clic ya está abierta, la cerramos. 
    // Si no, abrimos la nueva.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        
        <h2 className="faq-main-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                
                {/* Cabecera de la pregunta (Clickable) */}
                <button 
                  className="faq-question" 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.pregunta}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>

                {/* Contenedor de la respuesta con animación de altura */}
                <div 
                  className="faq-answer-wrapper"
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.respuesta}</p>
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

export default FaqTelemetria;