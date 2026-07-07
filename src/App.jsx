import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import ProductoDetalle from './views/ProductoDetalle';
import ArticuloDetalle from './views/ArticuloDetalle';
import Nosotros from './views/Nosotros'; 
import Catalogo from './views/Catalogo'; // ✅ NUEVO IMPORT AQUÍ
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter basename="/certimet-web/">
      
      {/* ✅ AQUÍ VA EL COMPONENTE: Escucha los cambios de ruta y sube el scroll */}
      <ScrollToTop />

      <Routes>
        
        {/* =======================================================
            RUTAS WEB CORPORATIVA (Con Header Normal y Footer)
            ======================================================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/laboratorio" element={<div>Página Laboratorio</div>} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/denuncias" element={<Denuncias />} />
          <Route path="/blog/:id" element={<ArticuloDetalle />} />
        </Route>

        {/* =======================================================
            RUTAS E-COMMERCE (Con Header Tienda y Footer)
            ======================================================= */}
        <Route element={<LayoutTienda />}>
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          
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
  );
}

export default App;