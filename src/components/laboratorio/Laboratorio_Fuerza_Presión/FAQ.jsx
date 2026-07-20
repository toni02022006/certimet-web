import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    pregunta: "¿Para qué aplicaciones se recomienda la HIKMICRO G61?",
    respuesta: "La HIKMICRO G61 es ideal para inspecciones eléctricas, mantenimiento industrial, sistemas mecánicos, petróleo y gas, y monitoreo de procesos mediante termografía de alta precisión."
  },
  {
    pregunta: "¿Cuál es el rango de medición de temperatura?",
    respuesta: "La cámara permite medir temperaturas desde -20 °C hasta 650 °C, lo que la hace adecuada para una amplia variedad de aplicaciones industriales."
  },
  {
    pregunta: "¿Qué resolución térmica ofrece la HIKMICRO G61?",
    respuesta: "Cuenta con un detector térmico de 640 × 480 píxeles y tecnología SuperIR, que mejora la imagen hasta 1280 × 960 píxeles para obtener mayor nivel de detalle en las inspecciones."
  }
];

const FAQ = () => {
  // Inicializamos el estado para que TODOS los índices (0, 1, 2) empiecen en true (desplegados)
  const [openStates, setOpenStates] = useState({
    0: true,
    1: true,
    2: true
  });

  // Alterna individualmente el estado de cada pregunta sin afectar a las demás
  const toggleFAQ = (index) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = !!openStates[index]; // Evalúa si está abierto o cerrado

            return (
              <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{index + 1}. {item.pregunta}</span>
                  {/* Reemplazamos los caracteres +/- por un contenedor estilizable */}
                  <span className={`faq-icon-wrapper ${isOpen ? 'rotated' : ''}`}>
                    <span className="icon-line horizontal"></span>
                    <span className="icon-line vertical"></span>
                  </span>
                </button>
                
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <p>{item.respuesta}</p>
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

export default FAQ;