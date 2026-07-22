import React from 'react';
// Ajusta la ruta para importar el componente que acabamos de crear
import HeroFuerzaPresion from '../../components/laboratorio/Laboratorio_Fuerza_Presión/HeroFuerzaPresion';
import InstrumentosFuerza from '../../components/laboratorio/Laboratorio_Fuerza_Presión/InstrumentosFuerza';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';
const FuerzaPresion = () => {
  return (
    <div className="page-fuerza-presion">
      {/* Llamamos al componente del Hero y la Intro */}
      <HeroFuerzaPresion />
      <InstrumentosFuerza />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
      {/* <OtrasSecciones /> */}
    </div>
  );
};

export default FuerzaPresion;