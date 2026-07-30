import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ IMPORTAMOS EL CONTEXTO DEL CARRITO
import { useCarrito } from '../../context/CarritoContext';

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

// IMAGEN PARA MANTENIMIENTO PREDICTIVO
import imgMantenimiento from '../../image/ingenieria/img2.png';

import '../layout/Header.css'; 
import './HeaderTienda.css';

// ===============================================================
// DATOS ESTRUCTURADOS: MEGA MENÚS (Desde Header Principal)
// ===============================================================
const laboratoriosData = {
  metrologia: {
    tabName: <>Laboratorio<br/>de Metrología</>,
    infoTitle: "Esto es lo que encontrarás aquí",
    infoBullets: [
      "Laboratorios especializados en las principales magnitudes físicas.",
      "Calibraciones acreditadas por INACAL bajo la norma ISO/IEC 17025:2017.",
      "Procedimientos alineados a estándares nacionales e internacionales.",
      "Resultados confiables, trazables y respaldados técnicamente."
    ],
    items: [
      { name: "Laboratorio de Masa", path: "/laboratorio/masa", icBase: icMasa, icHover: icMasaV },
      { name: "Laboratorio de Temperatura", path: "/laboratorio/temperatura", icBase: icTemp, icHover: icTempV },
      { name: "Laboratorio de Fuerza y Presión", path: "/laboratorio/fuerza-y-presion", icBase: icFuerza, icHover: icFuerzaV },
      { name: "Laboratorio de Físico Químico", path: "/laboratorio/fisico-quimico", icBase: icFisico, icHover: icFisicoV },
      { name: "Laboratorio de Electricidad", path: "/laboratorio/electricidad", icBase: icElec, icHover: icElecV },
      { name: "Laboratorio de Tiempo y Frecuencia", path: "/laboratorio/tiempo-frecuencia", icBase: icTempo, icHover: icTempoV },
      { name: "Laboratorio de Longitud", path: "/laboratorio/longitud", icBase: icLongitud, icHover: icLongitudV },
      { name: "Laboratorio de Fotometría y Acústica", path: "/laboratorio/fotometria-acustica", icBase: icFoto, icHover: icFotoV },
      { name: "Laboratorio de Humedad", path: "/laboratorio/humedad", icBase: icHumedad, icHover: icHumedadV },
      { name: "Laboratorio de Flujo", path: "/laboratorio/flujo", icBase: icFlujo, icHover: icFlujoV }
    ]
  },
  ensayo: {
    tabName: <>Laboratorio<br/>de Ensayo</>,
    infoTitle: "¿Necesitas Analizar tu espuma contra incendios?",
    infoDesc: <>En el <span style={{color: '#00d639'}}>laboratorio de ensayo de CERTIMET</span> le ofrecemos el servicio del análisis de espuma contra incendio. Los profesionales de extinción de incendios coinciden en que las pruebas anuales de su inventario de espuma son cruciales para mantener el nivel más alto posible de preparación para emergencias.</>,
    items: [
      { name: "Análisis de Espuma Contra Incendios", path: "/laboratorio", icBase: icFuerza, icHover: icFuerzaV }
    ]
  },
  servicios: {
    tabName: "Servicios",
    infoTitle: "Esto es lo que encontrarás aquí",
    infoBullets: [
      "Laboratorios especializados en las principales magnitudes físicas.",
      "Calibraciones acreditadas por INACAL bajo la norma ISO/IEC 17025:2017.",
      "Procedimientos alineados a estándares nacionales e internacionales.",
      "Resultados confiables, trazables y respaldados técnicamente."
    ],
    items: [
      { name: "Mantenimiento", path: "/servicios", icBase: icElec, icHover: icElecV },
      { name: "Mapeo Térmico", path: "/servicios", icBase: icTemp, icHover: icTempV },
      { name: "Análisis Termográfico", path: "/servicios", icBase: icFoto, icHover: icFotoV },
      { name: "Servicios Integrales", path: "/servicios", icBase: icFisico, icHover: icFisicoV },
      { name: "Servicio 2", path: "/servicios", icBase: icTempo, icHover: icTempoV },
      { name: "Servicio 3", path: "/servicios", icBase: icLongitud, icHover: icLongitudV }
    ]
  },
  certilab: {
    tabName: "CERTILAB",
    isLoginForm: true, 
    items: [
      { name: "Conoce el estatus de tus calibraciones", path: "/certilab", icBase: icFisico, icHover: icFisicoV },
      { name: "Descarga tus certificados", path: "/certilab", icBase: icLongitud, icHover: icLongitudV },
      { name: "Consulta cuándo se realizó tu servicio", path: "/certilab", icBase: icTempo, icHover: icTempoV }
    ]
  }
};

const ingenieriaMegaData = {
  mantenimiento: {
    tabName: <>Mantenimiento<br/>Predictivo</>,
    title: "Mantenimiento Predictivo Industrial en Perú para Activos Críticos",
    desc: "Monitoreo inteligente para la detección temprana de fallas y continuidad operativa en entornos industriales exigentes.",
    bullets: [
      "Monitoreo continuo de vibración, temperatura y variables eléctricas",
      "Reducción de paradas no programadas e incremento de disponibilidad",
      "Análisis predictivo en tiempo real con integración IoT y nube"
    ],
    btnText: "Nuestras soluciones →",
    btnLink: "/ingenieria/mantenimiento-predictivo",
    img: imgMantenimiento
  },
  control: {
    tabName: <>Control de<br/>Procesos</>,
    title: "Optimización y Control Avanzado de Procesos",
    desc: "Soluciones de automatización para maximizar el rendimiento, reducir variabilidad y asegurar la calidad del producto final.",
    bullets: [
      "Diseño e implementación de lazos de control PID",
      "Sistemas SCADA y HMI personalizados",
      "Integración de PLCs y redes industriales"
    ],
    btnText: "Ver soluciones →",
    btnLink: "/ingenieria/control",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600" 
  },
  vision: {
    tabName: <>Visión<br/>Artificial</>,
    title: "Sistemas de Visión Artificial para Inspección de Calidad",
    desc: "Implementación de cámaras inteligentes y algoritmos de Machine Learning para inspección automatizada en líneas de producción.",
    bullets: [
      "Detección de defectos y control dimensional de alta precisión",
      "Clasificación automática de productos en tiempo real",
      "Lectura de códigos OCR/OBR en alta velocidad"
    ],
    btnText: "Conoce más →",
    btnLink: "/ingenieria/vision",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" 
  },
  eficiencia: {
    tabName: <>Eficiencia<br/>Energética</>,
    title: "Gestión y Optimización de la Eficiencia Energética",
    desc: "Sistemas integrales para el monitoreo, análisis y reducción del consumo energético en plantas industriales.",
    bullets: [
      "Auditorías energéticas y cumplimiento ISO 50001",
      "Dashboards de consumo en tiempo real",
      "Control automático de iluminación y climatización"
    ],
    btnText: "Soluciones energéticas →",
    btnLink: "/ingenieria/eficiencia",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600" 
  },
  telemetria: {
    tabName: <>Sistemas de<br/>Telemetría 4.0</>,
    title: "Adquisición de Datos y Telemetría Industrial 4.0",
    desc: "Conectividad robusta para la transmisión de datos desde sensores remotos hasta plataformas en la nube.",
    bullets: [
      "Implementación de redes inalámbricas industriales (LoRaWAN, 5G)",
      "Integración con platforms IoT y gemelos digitales",
      "Monitoreo remoto de variables críticas"
    ],
    btnText: "Saber más →",
    btnLink: "/ingenieria/telemetria",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
  }
};

// ================= MEGA MENÚ DE PRODUCTOS (Estilo Falabella) =================
const menuProductosMega = [
  {
    id: "aut",
    name: "Automatización y Control",
    path: "/tienda/categoria/2",
    secciones: [
      {
        title: "Control y Autómatas",
        links: [{ name: "PLCs", path: "#" }, { name: "Pantallas HMI", path: "#" }, { name: "Módulos de E/S", path: "#" }, { name: "Fuentes de poder", path: "#" }]
      },
      {
        title: "Accionamientos",
        links: [{ name: "Variadores de frecuencia", path: "#" }, { name: "Arrancadores Suaves", path: "#" }, { name: "Servomotores", path: "#" }]
      },
      {
        title: "Maniobra y Protección",
        links: [{ name: "Contactores", path: "#" }, { name: "Relés Térmicos", path: "#" }, { name: "Interruptores", path: "#" }, { name: "Guardamotores", path: "#" }]
      }
    ]
  },
  {
    id: "ana",
    name: "Analítica",
    path: "/tienda/categoria/3",
    secciones: [
      {
        title: "Análisis de Gases",
        links: [{ name: "Analizadores de combustión", path: "#" }, { name: "Detectores de gases portátiles", path: "#" }]
      },
      {
        title: "Análisis de Líquidos",
        links: [{ name: "Medidores de pH", path: "#" }, { name: "Conductividad", path: "#" }, { name: "Turbidez", path: "#" }]
      }
    ]
  },
  {
    id: "var",
    name: "Variables de Procesos",
    path: "/tienda/categoria/4",
    secciones: [
      {
        title: "Temperatura",
        links: [{ name: "Transmisores", path: "#" }, { name: "Termocuplas", path: "#" }, { name: "RTD (PT100)", path: "#" }]
      },
      {
        title: "Presión y Nivel",
        links: [{ name: "Transmisores de presión", path: "#" }, { name: "Manómetros", path: "#" }, { name: "Sensores ultrasónicos", path: "#" }]
      },
      {
        title: "Caudal",
        links: [{ name: "Caudalímetros magnéticos", path: "#" }, { name: "Flujómetros másicos", path: "#" }]
      }
    ]
  },
  {
    id: "lab",
    name: "Laboratorio",
    path: "/tienda/categoria/5",
    secciones: [
      {
        title: "Equipos Generales",
        links: [{ name: "Balanzas Analíticas", path: "#" }, { name: "Agitadores", path: "#" }, { name: "Incubadoras", path: "#" }]
      },
      {
        title: "Calibración",
        links: [{ name: "Calibradores de lazo", path: "#" }, { name: "Hornos secos", path: "#" }]
      }
    ]
  },
  {
    id: "sso",
    name: "SSOMA",
    path: "/tienda/categoria/6",
    secciones: [
      {
        title: "Seguridad Industrial",
        links: [{ name: "Bloqueo y Etiquetado (LOTO)", path: "#" }, { name: "EPP Especializado", path: "#" }]
      },
      {
        title: "Monitoreo Ambiental",
        links: [{ name: "Sonómetros", path: "#" }, { name: "Dosímetros", path: "#" }]
      }
    ]
  },
  {
    id: "cal",
    name: "Calidad de ambiente",
    path: "/tienda/categoria/7",
    secciones: [
      {
        title: "Climatización",
        links: [{ name: "Termohigrómetros", path: "#" }, { name: "Anemómetros", path: "#" }]
      },
      {
        title: "Calidad del Aire",
        links: [{ name: "Medidores de CO2", path: "#" }, { name: "Contadores de partículas", path: "#" }]
      }
    ]
  }
];

const HeaderTienda = () => {
  // ✅ EXTRAEMOS EL CONTADOR DE PRODUCTOS DEL CONTEXTO
  const { cartCount } = useCarrito();

  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const searchRef = useRef(null);
  
  // ================= ESTADOS NUEVOS PARA MEGA MENÚS =================
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('metrologia'); 
  const [hoveredItem, setHoveredItem] = useState(null);

  const [isIngenieriaMenuOpen, setIsIngenieriaMenuOpen] = useState(false);
  const [activeIngenieriaCategory, setActiveIngenieriaCategory] = useState('mantenimiento');
  // ==================================================================

  // Estados para el Mega Menú de Productos y Certilab Login
  const [isProductosOpen, setIsProductosOpen] = useState(false); 
  const [activeProductCat, setActiveProductCat] = useState(menuProductosMega[0].id);
  
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const necesitaActualizar = sessionStorage.getItem('necesita_actualizar');
    if (necesitaActualizar === 'true') {
      sessionStorage.removeItem('necesita_actualizar');
      window.location.reload();
    }
  }, [location]);

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

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'usuario') {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de cierre inteligente (Metrología)
  useEffect(() => {
    if (!isFormFocused && !isMouseInside) {
      setIsMenuOpen(false);
    }
  }, [isFormFocused, isMouseInside]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSugerencias = async () => {
      if (busqueda.trim().length < 2) {
        setSugerencias([]);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/buscar/sugerencias?q=${encodeURIComponent(busqueda.trim())}`);
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

  const handleCategoriaClick = () => {
    setIsProductosOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsAuthenticated(false);
    setUsuario(null);
    navigate('/tienda');
  };

  // Login rápido Certilab
  const handleCertilabLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Credenciales incorrectas');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      sessionStorage.setItem('necesita_actualizar', 'true');
      
      setIsMenuOpen(false);
      navigate('/tienda');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <header className={`header-tienda-container ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* ================= BARRA SUPERIOR NAV ================= */}
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
              
              {/* =========================================================
                  BOTÓN MEGA-MENÚ: METROLOGÍA 
                  ========================================================= */}
              <li 
                className={`nav-item-dropdown-mega ${isMenuOpen ? 'menu-active-bg' : ''}`}
                onMouseEnter={() => {
                  setIsMenuOpen(true);
                  setIsMouseInside(true);
                }}
                onMouseLeave={() => {
                  setIsMouseInside(false);
                  if (!isFormFocused) {
                    setIsMenuOpen(false);
                    setHoveredItem(null);
                  }
                }}
              >
                <Link to="/laboratorio" className={location.pathname.startsWith('/laboratorio') ? 'active' : ''}>
                  Metrología <span className="arrow-down">▾</span>
                </Link>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div 
                      className="mega-dropdown-wrapper"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="mega-tabs-container">
                        {Object.keys(laboratoriosData).map((key) => (
                          <div 
                            key={key}
                            className={`mega-tab ${activeCategory === key ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCategory(key)}
                          >
                            {laboratoriosData[key].tabName}
                          </div>
                        ))}
                      </div>

                      <div className="mega-content-panel">
                        <div className="mega-items-list">
                          <ul>
                            {laboratoriosData[activeCategory].items.map((item, index) => (
                              <li key={index} 
                                  onMouseEnter={() => setHoveredItem(index)}
                                  onMouseLeave={() => setHoveredItem(null)}
                              >
                                <Link to={item.path} className={`mega-link-item ${hoveredItem === index ? 'hovered' : ''}`}>
                                  <div className="menu-icon-wrapper">
                                    <img src={item.icBase} alt="" className={`menu-ic ic-base ${hoveredItem === index ? 'hidden' : ''}`} />
                                    <img src={item.icHover} alt="" className={`menu-ic ic-hover ${hoveredItem === index ? 'visible' : ''}`} />
                                  </div>
                                  <span className="link-text-label">{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`mega-info-card ${laboratoriosData[activeCategory].isLoginForm ? 'certilab-mode' : ''}`}>
                          {laboratoriosData[activeCategory].isLoginForm ? (
                            <div className="mega-certilab-login">
                              <img src={logoBlanco} alt="Certimet Logo" className="login-logo-mega" />
                              <h4 className="login-mega-title">¡Hola! Qué bueno verte</h4>
                              <p className="login-mega-sub">Inicia sesión para continuar con tu compra</p>
                              
                              {loginError && <div className="login-mega-error">{loginError}</div>}
                              
                              <form onSubmit={handleCertilabLogin} className="login-mega-form">
                                <div className="mega-form-group">
                                  <label>Correo electrónico *</label>
                                  <input 
                                    type="email" 
                                    placeholder="ejemplo@certimet.pe" 
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    onFocus={() => setIsFormFocused(true)}
                                    onBlur={() => setIsFormFocused(false)}
                                    required 
                                  />
                                </div>
                                <div className="mega-form-group">
                                  <label>Contraseña *</label>
                                  <input 
                                    type="password" 
                                    placeholder="••••••••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setIsFormFocused(true)}
                                    onBlur={() => setIsFormFocused(false)}
                                    required 
                                  />
                                </div>
                                
                                <div className="mega-login-options">
                                  <label className="mega-remember-me">
                                    <input type="checkbox" /> Recordarme
                                  </label>
                                  <Link to="/tienda/recuperar" className="mega-forgot-link">¿Olvidaste tu contraseña?</Link>
                                </div>
                                
                                <button type="submit" className="btn-mega-login" disabled={loginLoading}>
                                  {loginLoading ? 'Validando...' : 'Ingresar a mi cuenta'}
                                </button>
                              </form>
                              
                              <div className="mega-login-footer">
                                <p>¿Eres nuevo en CERTIMET?</p>
                                <Link to="/tienda/registro" className="btn-mega-registro">Crea una cuenta</Link>
                              </div>
                            </div>
                          ) : (
                            <>
                              {laboratoriosData[activeCategory].infoTitle && (
                                <h3>{laboratoriosData[activeCategory].infoTitle}</h3>
                              )}
                              {laboratoriosData[activeCategory].infoDesc && (
                                <p className="mega-info-desc">{laboratoriosData[activeCategory].infoDesc}</p>
                              )}
                              {laboratoriosData[activeCategory].infoBullets && laboratoriosData[activeCategory].infoBullets.length > 0 && (
                                <ul>
                                  {laboratoriosData[activeCategory].infoBullets.map((bullet, idx) => (
                                    <li key={idx}>{bullet}</li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* =========================================================
                  BOTÓN MEGA-MENÚ: INGENIERÍA Y AUTOMATIZACIÓN 
                  ========================================================= */}
              <li 
                className={`nav-item-dropdown-mega ${isIngenieriaMenuOpen ? 'menu-active-bg' : ''}`}
                onMouseEnter={() => setIsIngenieriaMenuOpen(true)}
                onMouseLeave={() => setIsIngenieriaMenuOpen(false)}
              >
                <Link to="/ingenieria" className={location.pathname.startsWith('/ingenieria') ? 'active' : ''}>
                  Ingeniería y Automatización <span className="arrow-down">▾</span>
                </Link>

                <AnimatePresence>
                  {isIngenieriaMenuOpen && (
                    <motion.div 
                      className="mega-dropdown-wrapper"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="ingenieria-tabs-container">
                        {Object.keys(ingenieriaMegaData).map((key) => (
                          <div 
                            key={key}
                            className={`ingenieria-tab ${activeIngenieriaCategory === key ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIngenieriaCategory(key)}
                          >
                            {ingenieriaMegaData[key].tabName}
                          </div>
                        ))}
                      </div>

                      <div className="ingenieria-content-panel">
                        <div className="ingenieria-info-box">
                          <h3>{ingenieriaMegaData[activeIngenieriaCategory].title}</h3>
                          <p>{ingenieriaMegaData[activeIngenieriaCategory].desc}</p>
                          
                          <ul className="ingenieria-bullet-list">
                            {ingenieriaMegaData[activeIngenieriaCategory].bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                          
                          <Link to={ingenieriaMegaData[activeIngenieriaCategory].btnLink} className="btn-ingenieria-outline">
                            {ingenieriaMegaData[activeIngenieriaCategory].btnText}
                          </Link>
                        </div>
                        <div className="ingenieria-image-box">
                          <img 
                            src={ingenieriaMegaData[activeIngenieriaCategory].img} 
                            alt={ingenieriaMegaData[activeIngenieriaCategory].title} 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Otros enlaces simples */}
              <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
              <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link></li>
              <li><Link to="/servicio-cliente">Servicio al cliente</Link></li>
            </ul>
          </nav>

        </div>
      </div>

      {/* ================= BARRA PRINCIPAL SEARCH/CART ================= */}
      <div className="ht-main-bar">
        <div className="ht-content wrapper">
          
          <div className="ht-left">
            <Link to="/">
              <img src={isScrolled ? logoColor : logoBlanco} alt="CERTIMET" className="ht-logo" />
            </Link>
          </div>

          <div className="ht-center" ref={searchRef}>
            <form onSubmit={handleBuscar} className="ht-search-form">
              
              {/* ========================================================
                  BOTÓN Y MEGA MENÚ DE PRODUCTOS (Estilo Falabella)
                  ======================================================== */}
              <div 
                className="ht-btn-productos-wrapper"
                onMouseEnter={() => setIsProductosOpen(true)}
                onMouseLeave={() => { setIsProductosOpen(false); setActiveProductCat(menuProductosMega[0].id); }}
              >
                <div className="ht-btn-productos">
                  <span className="ht-hamburguer">≡</span> Productos
                </div>
                
                <AnimatePresence>
                  {isProductosOpen && (
                    <motion.div 
                      className="ht-mega-productos"
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* COLUMNA IZQUIERDA: CATEGORÍAS */}
                      <div className="ht-mega-prod-left">
                        <ul>
                          {menuProductosMega.map((cat) => (
                            <li 
                              key={cat.id} 
                              className={activeProductCat === cat.id ? 'active' : ''}
                              onMouseEnter={() => setActiveProductCat(cat.id)}
                            >
                              <Link to={cat.path} onClick={handleCategoriaClick}>
                                {cat.name} <span className="arrow">›</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="ht-ver-todo-mega">
                          <Link to="/tienda/catalogo" onClick={handleCategoriaClick}>
                            Ver todo el catálogo →
                          </Link>
                        </div>
                      </div>

                      {/* COLUMNA DERECHA: SUBCATEGORÍAS DINÁMICAS */}
                      <div className="ht-mega-prod-right">
                        {(() => {
                          const activeData = menuProductosMega.find(c => c.id === activeProductCat);
                          if (!activeData) return null;
                          return (
                            <>
                              <div className="ht-mega-prod-header">
                                <div className="ht-header-title">
                                  <h3>{activeData.name}</h3>
                                </div>
                                <Link to={activeData.path} onClick={handleCategoriaClick}>Ver todo</Link>
                              </div>
                              
                              <div className="ht-mega-prod-grid">
                                {activeData.secciones.map((sec, idx) => (
                                  <div key={idx} className="ht-mega-prod-column">
                                    <h4>{sec.title}</h4>
                                    <ul>
                                      {sec.links.map((link, lidx) => (
                                        <li key={lidx}>
                                          <Link to={link.path} onClick={handleCategoriaClick}>{link.name}</Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
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
              <span>Carrito</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HeaderTienda;