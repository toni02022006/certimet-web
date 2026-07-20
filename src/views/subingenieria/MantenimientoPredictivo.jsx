import React, { useEffect } from 'react';
import HeroMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/HeroMantenimiento';
import DefinicionMantenimiento from '../../components/ingenieria/MantenimientoPredictivo/DefinicionMantenimiento';

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
      
      {/* Aquí podrás ir agregando los demás componentes de esta subpágina luego */}
      {/* <SolucionesMantenimiento /> */}
      {/* <BeneficiosMantenimiento /> */}
    </div>
  );
};

export default MantenimientoPredictivo;