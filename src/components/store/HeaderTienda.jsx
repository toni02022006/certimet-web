import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Imágenes y Logos
import logoBlanco from '../../image/Imagotipo-blanco-V2.png';
import logoColor from '../../image/LOGO2026.png';
import iconUbicacion from '../../image/icons/ubicacion.png'; 
import iconCorreo from '../../image/icons/correo.webp';

// ÍCONOS DEL MENÚ (ESTADO BASE GRIS/BLANCO)
import icElec from '../../image/header_icons/elec.webp';
import icFisico from '../../image/header_icons/fisico.webp';
import icFlujo from '../../image/header_icons/flujo.webp';
import icFoto from '../../image/header_icons/fotometria.webp';
import icFuerza from '../../image/header_icons/fuerza.webp';
import icHumedad from '../../image/header_icons/humedad.webp';
import icLongitud from '../../image/header_icons/longitud.webp';
import icMasa from '../../image/header_icons/masa.webp';
import icTemp from '../../image/header_icons/temperatura.webp';
import icTempo from '../../image/header_icons/tempo.webp';

// ÍCONOS DEL MENÚ (ESTADO HOVER VERDE)
import icElecV from '../../image/header_icons/header_iconsverde/elec.webp';
import icFisicoV from '../../image/header_icons/header_iconsverde/fisico.webp';
import icFlujoV from '../../image/header_icons/header_iconsverde/flujo.webp';
import icFotoV from '../../image/header_icons/header_iconsverde/fotometria.webp';
import icFuerzaV from '../../image/header_icons/header_iconsverde/fuerza.webp';
import icHumedadV from '../../image/header_icons/header_iconsverde/humedad.webp';
import icLongitudV from '../../image/header_icons/header_iconsverde/longitud.webp';
import icMasaV from '../../image/header_icons/header_iconsverde/masa.webp';
import icTempV from '../../image/header_icons/header_iconsverde/temperatura.webp';
import icTempoV from '../../image/header_icons/header_iconsverde/tempo.webp';

import '../layout/Header.css'; 
import './HeaderTienda.css';

// ================= DATOS DEL MENÚ =================
const laboratoriosData = {
  metrologia: {
    titulo: "ÁREAS DE METROLOGÍA",
    items: [
      { name: "Laboratorio de Temperatura", path: "/laboratorio", icBase: icTemp, icHover: icTempV },
      { name: "Laboratorio de Fuerza y Presión", path: "/laboratorio", icBase: icFuerza, icHover: icFuerzaV },
      { name: "Laboratorio de Masa", path: "/laboratorio", icBase: icMasa, icHover: icMasaV },
      { name: "Laboratorio de Físico Químico", path: "/laboratorio", icBase: icFisico, icHover: icFisicoV },
      { name: "Laboratorio de Electricidad", path: "/laboratorio", icBase: icElec, icHover: icElecV },
      { name: "Laboratorio de Longitud", path: "/laboratorio", icBase: icLongitud, icHover: icLongitudV },
      { name: "Laboratorio de Tiempo y Frecuencia", path: "/laboratorio", icBase: icTempo, icHover: icTempoV },
      { name: "Laboratorio de Humedad", path: "/laboratorio", icBase: icHumedad, icHover: icHumedadV },
      { name: "Laboratorio de Fotometría y Acústica", path: "/laboratorio", icBase: icFoto, icHover: icFotoV }
    ]
  },
  ensayo: {
    titulo: "ÁREAS DE ENSAYO",
    items: [
      { name: "Ensayos Mecánicos", path: "/laboratorio", icBase: icFuerza, icHover: icFuerzaV }, 
      { name: "Ensayos No Destructivos (END)", path: "/laboratorio", icBase: icLongitud, icHover: icLongitudV }, 
      { name: "Análisis Metalográfico", path: "/laboratorio", icBase: icFisico, icHover: icFisicoV }
    ]
  }
};

const ingenieriaData = [
  { name: "Mantenimiento predictivo", path: "/ingenieria" },
  { name: "Sistemas de telemetría industrial 4.0", path: "/ingenieria" },
  { name: "Control de Procesos", path: "/ingenieria" },
  { name: "Vision Artificial", path: "/ingenieria" },
  { name: "Eficiencia Energética", path: "/ingenieria" }
];

const serviciosData = [
  { name: "Mantenimiento", path: "/servicios" },
  { name: "Mapeo Térmico", path: "/servicios" },
  { name: "Análisis Termográfico", path: "/servicios" }
];

// Rutas de Categorías de Productos
const categoriasProductos = [
  { name: "Automatización y Control", path: "/tienda/categoria/2" },
  { name: "Analítica", path: "/tienda/categoria/3" },
  { name: "Variables de Procesos", path: "/tienda/categoria/4" },
  { name: "Laboratorio", path: "/tienda/categoria/5" },
  { name: "SSOMA", path: "/tienda/categoria/6" },
  { name: "Calidad de ambiente", path: "/tienda/categoria/7" }
];

const HeaderTienda = () => {
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const searchRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIngenieriaOpen, setIsIngenieriaOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);
  const [isProductosOpen, setIsProductosOpen] = useState(false); 
  const [activeLab, setActiveLab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 

  // SOLUCIÓN: Detectar inicio de sesión pendiente de actualización
  useEffect(() => {
    const necesitaActualizar = sessionStorage.getItem('necesita_actualizar');
    if (necesitaActualizar === 'true') {
      sessionStorage.removeItem('necesita_actualizar');
      window.location.reload();
    }
  }, [location]);

  // Efecto para verificar autenticación al cargar y al cambiar el storage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('usuario');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsAuthenticated(true);
          setUsuario(parsedUser);
        } catch (e) {
          setIsAuthenticated(false);
          setUsuario(null);
        }
      } else {
        setIsAuthenticated(false);
        setUsuario(null);
      }
    };

    checkAuth();

    // Escuchar cambios en localStorage (por si se abre en otra pestaña)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'usuario') {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Efecto para obtener conteo del carrito (simulado, luego se conectará con API)
  useEffect(() => {
    const handleCarritoUpdate = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      setCartCount(carrito.length);
    };
    window.addEventListener('carritoActualizado', handleCarritoUpdate);
    return () => window.removeEventListener('carritoActualizado', handleCarritoUpdate);
  }, []);

  // Efecto para scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Efecto para sugerencias de búsqueda
  useEffect(() => {
    const fetchSugerencias = async () => {
      if (busqueda.trim().length < 2) {
        setSugerencias([]);
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/productos/buscar/sugerencias?q=${encodeURIComponent(busqueda.trim())}`);
        if (response.ok) {
          const data = await response.json();
          setSugerencias(data);
        }
      } catch (error) {
        console.error("Error buscando sugerencias:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSugerencias();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [busqueda]);

  const handleBuscar = (e) => {
    e.preventDefault();
    setMostrarSugerencias(false);
    if (busqueda.trim() !== '') {
      navigate(`/tienda/catalogo?buscar=${encodeURIComponent(busqueda.trim())}`);
    } else {
      navigate(`/tienda/catalogo`);
    }
  };

  // Función para forzar el cierre del menú de productos al hacer click
  const handleCategoriaClick = () => {
    setIsProductosOpen(false);
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsAuthenticated(false);
    setUsuario(null);
    navigate('/tienda');
  };

  return (
    <header className={`header-tienda-container ${isScrolled ? 'scrolled' : ''}`}>
      
      <div className="ht-top-bar">
        <div className="ht-content wrapper">
          
          <div className="ht-sub-left">
            <span className="ht-top-link">
              <img src={iconUbicacion} alt="Ubicación" className="ht-icon" /> 
              Av. Canadá 3263, San Luis 15021
            </span>
            <a href="mailto:ventas@certimet.pe" className="ht-top-link">
              <img src={iconCorreo} alt="Correo" className="ht-icon" /> 
              ventas@certimet.pe
            </a>
          </div>

          <nav className="ht-top-nav-menu">
            <ul className="ht-nav-links">
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link></li>
              <li><Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''}>Nosotros</Link></li>
              
              <li className="nav-item-dropdown-mega" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveLab(null); }}>
                <Link to="/laboratorio" className={location.pathname.startsWith('/laboratorio') ? 'active' : ''}>Laboratorio ▾</Link>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div className={`lab-dropdown-box ${activeLab ? 'is-expanded' : 'is-compact'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
                      <ul className="lab-left-menu">
                        <li className={activeLab === 'metrologia' ? 'active-row' : ''} onMouseEnter={() => setActiveLab('metrologia')}>
                          <span>Metrología</span><span className="arrow-right">▸</span>
                        </li>
                        <li className={activeLab === 'ensayo' ? 'active-row' : ''} onMouseEnter={() => setActiveLab('ensayo')}>
                          <span>Ensayo</span><span className="arrow-right">▸</span>
                        </li>                    
                      </ul>
                      <AnimatePresence>
                        {activeLab && (
                          <motion.div className="lab-right-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            <h3 className="panel-title">{laboratoriosData[activeLab].titulo}</h3>
                            <ul className="panel-grid">
                              {laboratoriosData[activeLab].items.map((item, index) => (
                                <li key={index}>
                                  <Link to={item.path} className="grid-link-item">
                                    <div className="menu-icon-wrapper">
                                      <img src={item.icBase} alt="" className="menu-ic ic-base" />
                                      <img src={item.icHover} alt="" className="menu-ic ic-hover" />
                                    </div>
                                    <span className="link-text-label">{item.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li className="nav-item-dropdown-simple" onMouseEnter={() => setIsIngenieriaOpen(true)} onMouseLeave={() => setIsIngenieriaOpen(false)}>
                <Link to="/ingenieria" className={location.pathname.startsWith('/ingenieria') ? 'active' : ''}>Ingeniería y Automatización ▾</Link>
                <AnimatePresence>
                  {isIngenieriaOpen && (
                    <motion.div className="simple-dropdown-box" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                      <ul className="simple-dropdown-list">
                        {ingenieriaData.map((item, index) => <li key={index}><Link to={item.path}>{item.name}</Link></li>)}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li className="nav-item-dropdown-simple" onMouseEnter={() => setIsServiciosOpen(true)} onMouseLeave={() => setIsServiciosOpen(false)}>
                <Link to="/servicios" className={location.pathname.startsWith('/servicios') ? 'active' : ''}>Servicios ▾</Link>
                <AnimatePresence>
                  {isServiciosOpen && (
                    <motion.div className="simple-dropdown-box" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                      <ul className="simple-dropdown-list">
                        {serviciosData.map((item, index) => <li key={index}><Link to={item.path}>{item.name}</Link></li>)}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
              <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link></li>
              <li><Link to="/servicio-cliente">Servicio al cliente</Link></li>
            </ul>
          </nav>

        </div>
      </div>

      <div className="ht-main-bar">
        <div className="ht-content wrapper">
          
          <div className="ht-left">
            <Link to="/">
              <img src={isScrolled ? logoColor : logoBlanco} alt="CERTIMET" className="ht-logo" />
            </Link>
          </div>

          <div className="ht-center" ref={searchRef}>
            <form onSubmit={handleBuscar} className="ht-search-form">
              
              <div 
                className="ht-btn-productos-wrapper"
                onMouseEnter={() => setIsProductosOpen(true)}
                onMouseLeave={() => setIsProductosOpen(false)}
              >
                <div className="ht-btn-productos">
                  <span className="ht-hamburguer">≡</span> Productos
                </div>
                
                <AnimatePresence>
                  {isProductosOpen && (
                    <motion.div 
                      className="ht-productos-dropdown"
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <ul className="ht-productos-list">
                        {categoriasProductos.map((cat, idx) => (
                          <li key={idx}>
                            <Link to={cat.path} onClick={handleCategoriaClick}>
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                        <li className="ht-ver-todo">
                          <Link to="/tienda/catalogo" onClick={handleCategoriaClick}>
                            Ver todo el catálogo →
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="ht-input-container">
                <input 
                  type="text" 
                  placeholder="Busca equipo, modelo, calibración..." 
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setMostrarSugerencias(true);
                  }}
                  onFocus={() => setMostrarSugerencias(true)}
                  className="ht-search-input"
                />

                <AnimatePresence>
                  {mostrarSugerencias && sugerencias.length > 0 && (
                    <motion.div 
                      className="ht-search-suggestions"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul>
                        {sugerencias.map(prod => (
                          <li key={prod.id}>
                            <Link 
                              to={`/producto/${prod.id}`} 
                              onClick={() => setMostrarSugerencias(false)}
                            >
                              <img 
                                src={prod.imagen_principal_url ? `http://localhost:3000${prod.imagen_principal_url}` : 'https://via.placeholder.com/50'} 
                                alt={prod.nombre} 
                              />
                              <span className="sug-text">{prod.nombre}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              <button type="submit" className="ht-search-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>

          <div className="ht-right">
            <div className="ht-asesor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30" className="ht-icon-svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div className="ht-asesor-text">
                <span className="ht-asesor-title">Asesores Comerciales</span>
                <span className="ht-asesor-wsp">✆ 941 101 546</span>
              </div>
            </div>

            {/* ENLACE DE LOGIN / MI CUENTA */}
            {!isAuthenticated ? (
              <Link className="ht-icon-link" to="/tienda/login">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26" className="ht-icon-svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Iniciar sesión</span>
              </Link>
            ) : (
              <div className="ht-user-menu">
                <Link to="/tienda/cuenta" className="ht-icon-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26" className="ht-icon-svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{usuario?.nombre || 'Mi cuenta'}</span>
                </Link>
                <button onClick={handleLogout} className="ht-logout-btn">
                  Cerrar sesión
                </button>
              </div>
            )}

            <Link className="ht-icon-link ht-carrito" to="/tienda/carrito">
              <div className="ht-carrito-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26" className="ht-icon-svg">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="ht-cart-badge">{cartCount}</span>
              </div>
              <span>Compras</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HeaderTienda;