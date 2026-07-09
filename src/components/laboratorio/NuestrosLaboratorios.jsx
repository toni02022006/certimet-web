import React from 'react';
import './NuestrosLaboratorios.css';

const laboratorios = [
  'Temperatura',
  'Masa',
  'Fuerza y Presión',
  'Fisicoquímico',
  'Longitud',
  'Electricidad',
  'Humedad',
  'Tiempo y Frecuencia',
  'Fotometría y Acústica',
  'Flujo'
];

const NuestrosLaboratorios = () => {
  return (
    <section className="nuestros-laboratorios">
      <div className="nl-container">
        <h2 className="nl-title">Nuestros laboratorios de calibración</h2>
        <div className="nl-grid">
          {laboratorios.map((lab, index) => (
            <div key={index} className="nl-item">
              <h3>Laboratorio de {lab}</h3>
              <a href="#" className="nl-link">Conoce nuestro servicio →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuestrosLaboratorios;