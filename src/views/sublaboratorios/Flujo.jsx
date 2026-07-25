import React from 'react';
import HeroFlujo from '../../components/laboratorio/Laboratorio_de_Flujo/HeroFlujo';
import InstrumentosFlujo from '../../components/laboratorio/Laboratorio_de_Flujo/InstrumentosFlujo';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Flujo = () => {
  return (
    <div className="page-flujo">
      <HeroFlujo />
      <InstrumentosFlujo />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Flujo;