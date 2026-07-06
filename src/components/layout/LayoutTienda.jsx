import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderTienda from '../store/HeaderTienda'; // Tu nuevo header de tienda
import Footer from './Footer'; // Reciclamos tu footer normal de CERTIMET

const LayoutTienda = () => {
  return (
    <>
      <HeaderTienda />
      
      {/* El Outlet es donde React inyectará la vista (Ej: Tienda.jsx o el Carrito) */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default LayoutTienda;