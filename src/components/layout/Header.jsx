import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Importaciones de imágenes estáticas y logos
import logo from '../../image/Imagotipo-blanco-V2.png';
import logoColor from '../../image/LOGO2026.png';
import iconWhatsapp from '../../image/icons/whatsapp.webp';
import iconCorreo from '../../image/icons/correo.webp';
import iconTelefono from '../../image/icons/telefono.webp';
import './Header.css';

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

// DATOS ESTRUCTURADOS
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
      { name: "Análisis Metalográfico", path: "/laboratorio", icBase: icFisico, icHover: icFisicoV }, 
      { name: "Ensayo de Tracción y Compresión", path: "/laboratorio", icBase: icMasa, icHover: icMasaV }, 
      { name: "Análisis de Dureza", path: "/laboratorio", icBase: icMasa, icHover: icMasaV }, 
      { name: "Ensayo de Impacto (Charpy)", path: "/laboratorio", icBase: icTempo, icHover: icTempoV }, 
      { name: "Inspección por Ultrasonido", path: "/laboratorio", icBase: icElec, icHover: icElecV }, 
      { name: "Inspección por Líquidos Penetrantes", path: "/laboratorio", icBase: icFisico, icHover: icFisicoV },
      { name: "Inspección por Partículas Magnéticas", path: "/laboratorio", icBase: icElec, icHover: icElecV },
      { name: "Ensayos de Fatiga", path: "/laboratorio", icBase: icTempo, icHover: icTempoV }
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isIngenieriaOpen, setIsIngenieriaOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); 
  const [activeLab, setActiveLab] = useState(null); 
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* BARRA SUPERIOR */}
      <div className="top-contact-bar">
        <div className="top-bar-content">
          
          {/* LADO IZQUIERDO: Blog */}
          <div className="top-bar-left">
            <Link to="/blog" className="btn-outline-top">Blog</Link>
          </div>

          {/* LADO DERECHO: Contactos y Trabaja con nosotros */}
          <div className="top-bar-right">
            <a href="#" className="top-link">
              <img src={iconWhatsapp} alt="WhatsApp" className="top-icon" /> Cotiza con nosotros
            </a>
            <a href="mailto:ventas@certimet.pe" className="top-link">
              <img src={iconCorreo} alt="Correo" className="top-icon" /> ventas@certimet.pe
            </a>
            <span className="top-text">
              <img src={iconTelefono} alt="Teléfono" className="top-icon" /> (01) 380-3727 / (+51) 941 101 546
            </span>
            <Link to="/denuncias" className="top-link">Canal de denuncias</Link>
            
            {/* DESPLEGABLE DE AUTENTIFICACIÓN */}
            <div 
              className="top-dropdown-container"
              onMouseEnter={() => setIsAuthOpen(true)}
              onMouseLeave={() => setIsAuthOpen(false)}
            >
              <span className="top-link auth-trigger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="top-icon">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Autentificación <span className="arrow-down" style={{fontSize: '10px', marginLeft: '4px'}}>▾</span>
              </span>
              
              <AnimatePresence>
                {isAuthOpen && (
                  <motion.div 
                    className="top-dropdown-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/autentificacion/informes">Autentificación de informes</Link>
                    <Link to="/autentificacion/calibracion">Autentificación de calibración</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/trabaja-con-nosotros" className="btn-outline-top">Trabaja con nosotros</Link>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN PRINCIPAL */}
      <nav className="main-navigation">
        <div className="logo-box">
          <Link to="/">
            <img src={isScrolled ? logoColor : logo} alt="Certimet Logo" className="logo-img" />
          </Link>
        </div>
        
        <ul className="nav-links-group">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link></li>
          <li><Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''}>Nosotros</Link></li>
          
          {/* BOTÓN MEGA-MENÚ: LABORATORIO */}
          <li 
            className="nav-item-dropdown-mega"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => { setIsMenuOpen(false); setActiveLab(null); }}
          >
            <Link to="/laboratorio" className={location.pathname.startsWith('/laboratorio') ? 'active' : ''}>
              Laboratorio <span className="arrow-down">▾</span>
            </Link>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  layout 
                  className={`lab-dropdown-box ${activeLab ? 'is-expanded' : 'is-compact'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ul className="lab-left-menu">
                    <li className={activeLab === 'metrologia' ? 'active-row' : ''} onMouseEnter={() => setActiveLab('metrologia')}>
                      <span>Laboratorio de Metrología</span><span className="arrow-right">▸</span>
                    </li>
                    <li className={activeLab === 'ensayo' ? 'active-row' : ''} onMouseEnter={() => setActiveLab('ensayo')}>
                      <span>Laboratorio de Ensayo</span><span className="arrow-right">▸</span>
                    </li>                                                                     
                  </ul>
                  <AnimatePresence>
                    {activeLab && (
                      <motion.div className="lab-right-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
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

          {/* MENÚ SIMPLE: INGENIERÍA Y AUTOMATIZACIÓN */}
          <li 
            className="nav-item-dropdown-simple"
            onMouseEnter={() => setIsIngenieriaOpen(true)}
            onMouseLeave={() => setIsIngenieriaOpen(false)}
          >
            <Link to="/ingenieria" className={location.pathname.startsWith('/ingenieria') ? 'active' : ''}>
              Ingeniería y Automatización <span className="arrow-down">▾</span>
            </Link>
            <AnimatePresence>
              {isIngenieriaOpen && (
                <motion.div 
                  className="simple-dropdown-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="simple-dropdown-list">
                    {ingenieriaData.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* MENÚ SIMPLE: SERVICIOS */}
          <li 
            className="nav-item-dropdown-simple"
            onMouseEnter={() => setIsServiciosOpen(true)}
            onMouseLeave={() => setIsServiciosOpen(false)}
          >
            <Link to="/servicios" className={location.pathname.startsWith('/servicios') ? 'active' : ''}>
              Servicios <span className="arrow-down">▾</span>
            </Link>
            <AnimatePresence>
              {isServiciosOpen && (
                <motion.div 
                  className="simple-dropdown-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="simple-dropdown-list">
                    {serviciosData.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li><Link to="/tienda" className={location.pathname === '/tienda' ? 'active' : ''}>Tienda</Link></li>
          <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;