import React, { useState } from 'react';
import './FaqMantenimiento.css';

const FaqMantenimiento = () => {
  // Estado para controlar qué pregunta está abierta
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    // Si se hace clic en la misma pregunta, se cierra. Si es otra, se abre.
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Arreglo con las preguntas exactas de tu imagen y un párrafo de respuesta
  const faqData = [
    {
      question: "1. ¿Qué es el mantenimiento predictivo industrial?",
      answer: "Es una técnica que utiliza herramientas y técnicas de análisis de datos para detectar anomalías en el funcionamiento y posibles defectos en los equipos y procesos, de modo que se puedan solucionar antes de que sobrevenga el fallo."
    },
    {
      question: "2. ¿En qué se diferencia del mantenimiento preventivo?",
      answer: "Mientras que el mantenimiento preventivo se realiza según un calendario programado (independientemente del estado del equipo), el predictivo se basa en la condición real y actual de la máquina mediante monitoreo constante."
    },
    {
      question: "3. ¿Qué activos críticos pueden monitorearse?",
      answer: "Se pueden monitorear motores eléctricos, bombas, compresores, transformadores, turbinas, ventiladores y cualquier equipo rotativo o eléctrico cuya falla represente un riesgo alto para la continuidad operativa."
    },
    {
      question: "4. ¿Qué beneficios aporta el mantenimiento predictivo en minería?",
      answer: "En el sector minero reduce drásticamente el tiempo de inactividad no planificado, maximiza la vida útil de componentes costosos y mejora la seguridad del personal al prevenir fallas catastróficas en la maquinaria pesada."
    },
    {
      question: "3. ¿Qué variables se monitorean en mantenimiento predictivo?", // Numeración según tu imagen
      answer: "Las variables más comunes incluyen vibración, temperatura (termografía), ultrasonido, análisis de lubricantes, y parámetros eléctricos como corriente, voltaje y resistencia de aislamiento."
    },
    {
      question: "2. ¿Cómo ayuda el mantenimiento predictivo a la continuidad operativa?",
      answer: "Permite a las plantas programar reparaciones durante los tiempos de inactividad planificados, evitando paradas de emergencia que detienen toda la cadena de producción y generan grandes pérdidas."
    },
    {
      question: "3. ¿Qué es el monitoreo de vibraciones y por qué es importante?",
      answer: "Es el proceso de medir las frecuencias de vibración de una máquina. Es vital porque un cambio en el patrón de vibración suele ser el primer indicador de problemas como desalineación, desbalanceo o desgaste de rodamientos."
    },
    {
      question: "2. ¿Qué es el análisis de gases disueltos en transformadores?",
      answer: "Es una prueba de diagnóstico predictivo que detecta gases específicos dentro del aceite del transformador, los cuales indican fallas incipientes como arcos eléctricos, sobrecalentamiento o descargas parciales."
    },
    {
      question: "3. ¿Se puede implementar mantenimiento predictivo en plantas existentes?",
      answer: "Sí, mediante la integración de sensores IoT (Internet de las Cosas) no invasivos, es posible modernizar activos antiguos (retrofit) y conectarlos a plataformas de análisis sin necesidad de reemplazar la maquinaria."
    },
    {
      question: "3. ¿El mantenimiento predictivo requiere infraestructura en la nube?",
      answer: "Aunque no es estrictamente obligatorio, el uso de infraestructura en la nube (Cloud) potencia enormemente esta estrategia, permitiendo el acceso a datos en tiempo real desde cualquier lugar y el uso de algoritmos de inteligencia artificial."
    },
    {
      question: "4. ¿Cuánto reduce los costos el mantenimiento predictivo?",
      answer: "Estudios industriales estiman que puede reducir los costos de mantenimiento entre un 25% y un 30%, eliminar las averías en un 70% a 75% y reducir el tiempo de inactividad en un 35% a 45%."
    },
    {
      question: "3. ¿Qué industrias en Perú están adoptando mantenimiento predictivo?",
      answer: "Las principales industrias adoptantes en Perú son la minería, energía (generación y distribución), manufactura, petróleo y gas, y el sector pesquero; todos ellos dependientes de activos altamente críticos."
    },
    {
      question: "2. ¿Qué tan rápido se puede detectar una falla potencial?",
      answer: "Con un monitoreo continuo en línea (online), las desviaciones de los patrones normales se detectan de forma instantánea, generando alertas automáticas semanas o incluso meses antes de que ocurra la falla funcional."
    },
    {
      question: "3. ¿El mantenimiento predictivo cumple normativas técnicas?",
      answer: "Sí, las mediciones y el análisis se rigen bajo normativas internacionales estrictas como ISO 10816 para vibraciones, o normas IEEE y ASTM para pruebas en equipos eléctricos y fluidos dieléctricos."
    },
    {
      question: "2. ¿Cómo empezar a implementar mantenimiento predictivo en mi planta?",
      answer: "El primer paso es realizar una auditoría de criticidad de activos, identificar los equipos que requieren monitoreo, seleccionar las tecnologías adecuadas (vibración, termografía, etc.) y capacitar al personal o contratar a un socio integrador."
    }
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <div key={index} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                
                <div 
                  className="faq-answer-wrapper"
                  style={{ maxHeight: isOpen ? '200px' : '0' }}
                >
                  <p className="faq-answer-text">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqMantenimiento;