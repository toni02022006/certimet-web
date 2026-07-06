import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingSocials from './FloatingSocials';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      {/* 1. La cabecera se queda fija arriba */}
      <Header />
      
      {/* 2. El Outlet es el "hueco" dinámico donde React inyectará el Home, Contacto, etc. */}
      <main className="main-content-area">
        <Outlet /> 
      </main>

      {/* 3. El pie de página va al final */}
      <Footer />
      {/* 4. Los botones sociales flotantes */}
      <FloatingSocials />

    </div>
  );
};

export default Layout;