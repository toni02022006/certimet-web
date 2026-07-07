import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que la ruta cambie, mandamos el scroll al inicio absoluto
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}