import React from 'react';
import { Link } from 'react-router-dom';

// Importaciones actualizadas apuntando a la nueva carpeta "store"
import HeroTienda from '../components/store/HeroTienda'; 
import CategoriasTienda from '../components/store/CategoriasTienda';
import BannersTienda from '../components/store/BannersTienda';
import ProductosDestacados from '../components/store/ProductosDestacados';
import MarcasTienda from '../components/store/MarcasTienda';

// Asegúrate de que tu CSS siga en la misma ruta o actualízala si también la moviste
import './Tienda.css';

const Tienda = () => {
  return (
    <div className="tienda-page">
      
      {/* Componentes modulares */}
      <HeroTienda />
      <CategoriasTienda />
      <BannersTienda />
      <ProductosDestacados />
      <MarcasTienda />

      {/* BOTÓN FLOTANTE ESPECÍFICO DE LA TIENDA */}
      <Link to="/tienda/registro" className="btn-flotante-registro">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Registrarse
      </Link>

    </div>
  );
};

export default Tienda;