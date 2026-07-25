import React from 'react';
// Componentes específicos de Temperatura
import HeroTemperatura from '../../components/laboratorio/Laboratorio_de_Temperatura/HeroTemperatura';
import InstrumentosTemperatura from '../../components/laboratorio/Laboratorio_de_Temperatura/InstrumentosTemperatura';
// Componentes reutilizables
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Temperatura = () => {
  return (
    <div className="page-temperatura">
      <HeroTemperatura />
      <InstrumentosTemperatura />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Temperatura;