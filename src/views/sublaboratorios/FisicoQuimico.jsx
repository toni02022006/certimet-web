import React from 'react';
import HeroFisicoQuimico from '../../components/laboratorio/Laboratorio_de_FisicoQuimico/HeroFisicoQuimico';
import InstrumentosFisicoQuimico from '../../components/laboratorio/Laboratorio_de_FisicoQuimico/InstrumentosFisicoQuimico';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const FisicoQuimico = () => {
  return (
    <div className="page-fisicoquimico">
      <HeroFisicoQuimico />
      <InstrumentosFisicoQuimico />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default FisicoQuimico;