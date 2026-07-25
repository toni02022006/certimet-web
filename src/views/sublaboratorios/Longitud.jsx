import React from 'react';
// Componentes específicos de Longitud
import HeroLongitud from '../../components/laboratorio/Laboratorio_de_Longitud/HeroLongitud';
import InstrumentosLongitud from '../../components/laboratorio/Laboratorio_de_Longitud/InstrumentosLongitud';
// Componentes reutilizables (ajusta la ruta si es necesario)
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Longitud = () => {
  return (
    <div className="page-longitud">
      <HeroLongitud />
      <InstrumentosLongitud />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Longitud;