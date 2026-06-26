import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tu Layout (que contiene el Header y Footer)
import Layout from './components/layout/Layout';

// Importa tus vistas
import Home from './views/Home';
import Contacto from './views/Contacto';
import Playground from './views/Playground'; // ⬅️ Tu nueva vista
import TrabajaConNosotros from './views/TrabajaConNosotros'; // ⬅️ Tu nueva vista

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* =======================================================
            RUTAS PÚBLICAS (Con Header y Footer)
            Todas las rutas dentro de este bloque tendrán la cabecera
            ======================================================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<div>Página Nosotros</div>} />
          <Route path="/laboratorio" element={<div>Página Laboratorio</div>} />
          <Route path="/contacto" element={<Contacto />} />
          {/* Añade aquí las demás rutas normales de tu web */}
        </Route>

        {/* =======================================================
            RUTAS AISLADAS (Sin Header ni Footer)
            Al estar fuera del <Layout>, se ven completamente solas
            ======================================================= */}
        <Route path="/playground" element={<Playground />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;