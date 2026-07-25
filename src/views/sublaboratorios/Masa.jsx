import React from 'react';
import HeroMasa from '../../components/laboratorio/Laboratorio_de_Masa/HeroMasa';
import InstrumentosMasa from '../../components/laboratorio/Laboratorio_de_Masa/InstrumentosMasa';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Masa = () => {
  return (
    <div className="page-masa">
      <HeroMasa />
      <InstrumentosMasa />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Masa;