import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext'; 
import PagoListener from './components/PagoListener';

// Importa tus Layouts
import Layout from './components/layout/Layout';
import LayoutTienda from './components/layout/LayoutTienda';

// Importa tus vistas
import Home from './views/Home';
import Contacto from './views/Contacto';
import Playground from './views/Playground'; 
import TrabajaConNosotros from './views/TrabajaConNosotros'; 
import Blog from './views/Blog'; 
import Denuncias from './views/Denuncias';
import Tienda from './views/Tienda'; 
import Login from './views/Login';
import Registro from './components/cuenta/Registro';
import Cuenta from './components/cuenta/Cuenta';
import SeguimientoPedido from './components/cuenta/SeguimientoPedido';
import RecuperarPassword from './components/cuenta/RecuperarPassword';
import VerificarCodigo from './components/cuenta/VerificarCodigo';
import ProductoDetalle from './components/store/ProductoDetalle';
import ArticuloDetalle from './views/ArticuloDetalle';
import Nosotros from './views/Nosotros'; 
import Catalogo from './views/Catalogo'; 
import ScrollToTop from './components/ScrollToTop';
import Laboratorio from './views/Laboratorio';
import AutentificacionCalibracion from './components/autentificacion/AutentificacionCalibracion';
import AutentificacionInformes from './components/autentificacion/AutentificacionInformes';
import FuerzaPresion from './views/sublaboratorios/FuerzaPresion';
import Electricidad from './views/sublaboratorios/Electricidad';
import TiempoFrecuencia from './views/sublaboratorios/TiempoFrecuencia';
import Temperatura from './views/sublaboratorios/Temperatura';
import Longitud from './views/sublaboratorios/Longitud';
import Humedad from './views/sublaboratorios/Humedad';
import FotometriaAcustica from './views/sublaboratorios/FotometriaAcustica';
import Flujo from './views/sublaboratorios/Flujo';
import FisicoQuimico from './views/sublaboratorios/FisicoQuimico';
import Masa from './views/sublaboratorios/Masa';
import Ingenieria from './views/Ingenieria';
import MantenimientoPredictivo from './views/subingenieria/MantenimientoPredictivo';
import Carrito from './components/store/Carrito';
import Checkout from './components/store/Checkout';
import CheckoutInvitado from './components/store/CheckoutInvitado';
import SeguimientoInvitado from './page/SeguimientoInvitado';

function App() {
  // ==========================================================================
  // EFECTO: Cambia el título de la pestaña cuando el usuario sale de la web
  // ==========================================================================
  useEffect(() => {
    // Guarda el título original que tenga tu página en ese momento
    const tituloOriginal = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Mensaje que aparece cuando cambian a otra pestaña
        document.title = "¡Vuelve, te extrañamos! 😢 | CERTIMET";
      } else {
        // Regresa al título normal cuando vuelven
        document.title = tituloOriginal;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    // 👇 Envolvemos todo el enrutador con el CarritoProvider
    <CarritoProvider>
      <BrowserRouter basename="/certimet-web/">
        
        {/* ✅ AQUÍ VA EL COMPONENTE: Escucha los cambios de ruta y sube el scroll */}
        <ScrollToTop />
        <PagoListener />

        <Routes>
          
          {/* =======================================================
              RUTAS WEB CORPORATIVA (Con Header Normal y Footer)
              ======================================================= */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/denuncias" element={<Denuncias />} />
            <Route path="/blog/:id" element={<ArticuloDetalle />} />
            <Route path="/laboratorio" element={<Laboratorio />} />
            <Route path="/ingenieria" element={<Ingenieria />} />
            
            <Route path="/laboratorio/fuerza-y-presion" element={<FuerzaPresion />} />
            <Route path="/laboratorio/electricidad" element={<Electricidad />} />
            <Route path="/laboratorio/tiempo-frecuencia" element={<TiempoFrecuencia />} />
            <Route path="/laboratorio/temperatura" element={<Temperatura />} />
            <Route path="/laboratorio/longitud" element={<Longitud />} />
            <Route path="/laboratorio/humedad" element={<Humedad />} />
            <Route path="/laboratorio/fotometria-acustica" element={<FotometriaAcustica />} />
            <Route path="/laboratorio/flujo" element={<Flujo />} />
            <Route path="/laboratorio/fisico-quimico" element={<FisicoQuimico />} />
            <Route path="/laboratorio/masa" element={<Masa />} />

            <Route path='ingenieria/mantenimiento-predictivo' element={<MantenimientoPredictivo />}/>

            <Route path="/autentificacion/calibracion" element={<AutentificacionCalibracion />} />
            <Route path="/autentificacion/informes" element={<AutentificacionInformes />} />
          </Route>

          {/* =======================================================
              RUTAS E-COMMERCE (Con Header Tienda y Footer)
              ======================================================= */}
          <Route element={<LayoutTienda />}>
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/login" element={<Login />} />
            <Route path="/tienda/registro" element={<Registro />} />
            <Route path="/tienda/cuenta" element={<Cuenta />} />
            <Route path="/tienda/recuperar" element={<RecuperarPassword />} />
            <Route path="/tienda/verificar-codigo" element={<VerificarCodigo />} />
            <Route path="/tienda/seguimiento/:id" element={<SeguimientoPedido />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/tienda/carrito" element={<Carrito />} />
            <Route path="/tienda/checkout" element={<Checkout />} />
            <Route path="/tienda/checkout-invitado" element={<CheckoutInvitado />} />
            <Route path="/tienda/seguimiento-invitado/:id" element={<SeguimientoInvitado />} />
            
            {/* ✅ NUEVAS RUTAS DEL CATÁLOGO */}
            <Route path="/tienda/catalogo" element={<Catalogo />} />
            <Route path="/tienda/categoria/:idCategoria" element={<Catalogo />} />
            
          </Route>

          {/* =======================================================
              RUTAS AISLADAS (Sin Header ni Footer)
              ======================================================= */}
          <Route path="/playground" element={<Playground />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
          
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;