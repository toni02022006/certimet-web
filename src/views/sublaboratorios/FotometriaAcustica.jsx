import React from 'react';
import HeroFotometriaAcustica from '../../components/laboratorio/Laboratorio_de_Fotometria_Acustica/HeroFotometriaAcustica';
import InstrumentosFotometriaAcustica from '../../components/laboratorio/Laboratorio_de_Fotometria_Acustica/InstrumentosFotometriaAcustica';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const FotometriaAcustica = () => {
  return (
    <div className="page-fotometria-acustica">
      <HeroFotometriaAcustica />
      <InstrumentosFotometriaAcustica />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default FotometriaAcustica;