import React from 'react';
// Componentes específicos de Tiempo y Frecuencia
import HeroTiempoFrecuencia from '../../components/laboratorio/Laboratorio_de_TiempoyFrecuencia/HeroTiempoFrecuencia';
import InstrumentosTiempoFrecuencia from '../../components/laboratorio/Laboratorio_de_TiempoyFrecuencia/InstrumentosTiempoFrecuencia';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';
// Componentes reutilizables (genéricos)

const TiempoFrecuencia = () => {
  return (
    <div className="page-tiempofrecuencia">
      <HeroTiempoFrecuencia />
      <InstrumentosTiempoFrecuencia />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default TiempoFrecuencia;