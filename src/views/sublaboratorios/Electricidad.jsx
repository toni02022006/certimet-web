import React from 'react';
// Ajusta las rutas según los componentes que vayas creando para esta sección
import HeroElectricidad from '../../components/laboratorio/Laboratorio_de_Electricidad/HeroElectricidad';
import InstrumentosElectricidad from '../../components/laboratorio/Laboratorio_de_Electricidad/InstrumentosElectricidad';
import PorQueElegirnos from '../../components/laboratorio/Laboratorio_Fuerza_Presión/PorQueElegirnos';
import LaboratoriosRelacionados from '../../components/laboratorio/Laboratorio_Fuerza_Presión/LaboratoriosRelacionados';
import FAQ from '../../components/laboratorio/Laboratorio_Fuerza_Presión/FAQ';
import AsesoramientoCTA from '../../components/laboratorio/Laboratorio_Fuerza_Presión/AsesoramientoCTA';

const Electricidad = () => {
  return (
    <div className="page-electricidad">
      {/* Llamamos al componente del Hero específico de Electricidad */}
      <HeroElectricidad />
      {/* Aquí irán los demás componentes a medida que los adaptes a la carpeta de Electricidad */}
      <InstrumentosElectricidad />
      <PorQueElegirnos />
      <LaboratoriosRelacionados />
      <FAQ />
      <AsesoramientoCTA />
    </div>
  );
};

export default Electricidad;