import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus Layouts
import Layout from './components/layout/Layout';
import LayoutTienda from './components/layout/LayoutTienda'; // <-- NUEVO

// Importa tus vistas
import Home from './views/Home';
import Contacto from './views/Contacto';
import Playground from './views/Playground'; 
import TrabajaConNosotros from './views/TrabajaConNosotros'; 
import Blog from './views/Blog'; 
import Denuncias from './views/Denuncias';
import Tienda from './views/Tienda'; 
import ArticuloDetalle from './views/ArticuloDetalle';

function App() {
  return (
    <BrowserRouter basename="/certimet-web/">
      <Routes>
        
        {/* =======================================================
            RUTAS WEB CORPORATIVA (Con Header Normal y Footer)
            ======================================================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<div>Página Nosotros</div>} />
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
          {/* En el futuro aquí agregarás: 
          <Route path="/tienda/carrito" element={<Carrito />} />
          <Route path="/tienda/login" element={<LoginTienda />} /> 
          */}
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