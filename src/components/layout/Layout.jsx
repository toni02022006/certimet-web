import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingSocials from './FloatingSocials';
import SeoHelmet from '../seo/SeoHelmet'; // 👈 Importamos

const Layout = () => {
  const location = useLocation();
  const ruta = location.pathname; // Ej: '/nosotros', '/blog/123'

  return (
    <>
      {/* ✅ Inyectamos el SEO en el <head> */}
      <SeoHelmet ruta={ruta} />

      <div className="layout-wrapper">
        <Header />
        <main className="main-content-area">
          <Outlet />
        </main>
        <Footer />
        <FloatingSocials />
      </div>
    </>
  );
};

export default Layout;