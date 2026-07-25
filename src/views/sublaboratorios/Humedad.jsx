import React from 'react';
import HeroHumedad from '../../components/laboratorio/Laboratorio_de_Humedad/HeroHumedad';
import InstrumentosHumedad from '../../components/laboratorio/Laboratorio_de_Humedad/InstrumentosHumedad';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Humedad = () => {
  return (
    <div className="page-humedad">
      <HeroHumedad />
      <InstrumentosHumedad />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Humedad;