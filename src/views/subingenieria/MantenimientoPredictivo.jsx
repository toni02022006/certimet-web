import React, { useEffect } from 'react';
import HeroMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/HeroMantenimiento';
import DefinicionMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/DefinicionMantenimiento';
import BeneficiosMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/BeneficiosMantenimiento';
import SolucionesMonitoreo from '../../components/ingenieria/MantenimientoPredictivo/SolucionesMonitoreo';
import DiferencialCertimet from '../../components/ingenieria/MantenimientoPredictivo/DiferencialCertimet';
import SolucionesRelacionadas from '../../components/ingenieria/MantenimientoPredictivo/SolucionesRelacionadas';
import FaqMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/FaqMantenimiento';

const MantenimientoPredictivo = () => {
  // Asegurarnos de que la página cargue desde arriba al entrar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-mantenimiento-predictivo">
      {/* Componente principal (Banner e Introducción) */}
      <HeroMantenimiento />
      <DefinicionMantenimiento />
      <BeneficiosMantenimiento />
      <SolucionesMonitoreo />
      <DiferencialCertimet />
      <SolucionesRelacionadas />
      <FaqMantenimiento />
    </div>
  );
};

export default MantenimientoPredictivo;