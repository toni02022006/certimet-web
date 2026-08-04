import React, { useEffect } from 'react';
import HeroTelemetria from '../../components/ingenieria/Telemetria/HeroTelemetria';
import ProblemasTelemetria from '../../components/ingenieria/Telemetria/ProblemasTelemetria';
import DefinicionTelemetria from '../../components/ingenieria/Telemetria/DefinicionTelemetria';
import TransformacionDigital from '../../components/ingenieria/Telemetria/TransformacionDigital';
import BeneficiosTelemetria from '../../components/ingenieria/Telemetria/BeneficiosTelemetria';
import CarruselSectores from '../../components/ingenieria/Telemetria/CarruselSectores';
import FaqTelemetria from '../../components/ingenieria/Telemetria/FaqTelemetria';

const Telemetria = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-telemetria">
      <HeroTelemetria />
      <ProblemasTelemetria />
      <DefinicionTelemetria />
      <BeneficiosTelemetria />
      {/* Nuevo componente agregado aquí */}
      <TransformacionDigital />
      <CarruselSectores />
      <FaqTelemetria />
      
    </div>
  );
};

export default Telemetria;