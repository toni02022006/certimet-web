import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderTienda from '../store/HeaderTienda'; // Tu nuevo header de tienda
import Footer from './Footer'; // Reciclamos tu footer normal de CERTIMET
import SeoHelmet from '../seo/SeoHelmet'; // Verifica que esta ruta coincida con la ubicación real de tu componente

const LayoutTienda = () => {
  const location = useLocation();
  const ruta = location.pathname;

  return (
    <>
      {/* El componente SEO inyectará las metaetiquetas dinámicamente según la ruta actual */}
      <SeoHelmet ruta={ruta} />
      
      <div className="layout-tienda-wrapper">
        <HeaderTienda />
        
        {/* El Outlet es donde React inyectará la vista (Ej: Tienda.jsx o el Carrito) */}
        <main className="main-content-area">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LayoutTienda;