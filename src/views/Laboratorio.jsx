import React from 'react';
import HeroLaboratorio from '../components/laboratorio/HeroLaboratorio';
import Soluciones from '../components/laboratorio/Soluciones';
import Acreditaciones from '../components/laboratorio/Acreditaciones';
import NuestrosLaboratorios from '../components/laboratorio/NuestrosLaboratorios';
import GestionCalibraciones from '../components/laboratorio/GestionCalibraciones';
import FormularioContacto from '../components/laboratorio/FormularioContacto';
import './Laboratorio.css'; // opcional, si quieres estilos globales para la página

const Laboratorio = () => {
  return (
    <div className="laboratorio-page">
      <HeroLaboratorio />
      <Soluciones />
      <Acreditaciones />
      <NuestrosLaboratorios />
      <GestionCalibraciones />
      <FormularioContacto />
    </div>
  );
};

export default Laboratorio;