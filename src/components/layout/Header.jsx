import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Importaciones de imágenes estáticas y logos
import logo from '../../image/Imagotipo-blanco-V2.png';
import logoColor from '../../image/LOGO2026.png';
import iconWhatsapp from '../../image/icons/whatsapp.webp';
import iconCorreo from '../../image/icons/correo.webp';
import iconTelefono from '../../image/icons/telefono.webp';
import './Header.css';

// ÍCONOS DEL MENÚ (ESTADO BASE BLANCO/GRIS)
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

// NUEVA IMAGEN PARA MANTENIMIENTO PREDICTIVO
import imgMantenimiento from '../../image/ingenieria/img2.png';

// ===============================================================
// DATOS ESTRUCTURADOS: METROLOGÍA
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
      { name: "Laboratorio de Masa", path: "/laboratorio", icBase: icMasa, icHover: icMasaV },
      { name: "Laboratorio de Temperatura", path: "/laboratorio", icBase: icTemp, icHover: icTempV },
      { name: "Laboratorio de Fuerza y Presión", path: "/laboratorio/fuerza-y-presion", icBase: icFuerza, icHover: icFuerzaV },
      { name: "Laboratorio de Físico Químico", path: "/laboratorio", icBase: icFisico, icHover: icFisicoV },
      { name: "Laboratorio de Electricidad", path: "/laboratorio", icBase: icElec, icHover: icElecV },
      { name: "Laboratorio de Tiempo y Frecuencia", path: "/laboratorio", icBase: icTempo, icHover: icTempoV },
      { name: "Laboratorio de Longitud", path: "/laboratorio", icBase: icLongitud, icHover: icLongitudV },
      { name: "Laboratorio de Fotometría y Acústica", path: "/laboratorio", icBase: icFoto, icHover: icFotoV },
      { name: "Laboratorio de Humedad", path: "/laboratorio", icBase: icHumedad, icHover: icHumedadV },
      { name: "Laboratorio de Flujo", path: "/laboratorio", icBase: icFlujo, icHover: icFlujoV }
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

// ===============================================================
// DATOS ESTRUCTURADOS: INGENIERÍA Y AUTOMATIZACIÓN (CORREGIDO)
// ===============================================================
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
    img: imgMantenimiento // Actualizado con tu imagen local
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
      "Integración con plataformas IoT y gemelos digitales",
      "Monitoreo remoto de variables críticas"
    ],
    btnText: "Saber más →",
    btnLink: "/ingenieria/telemetria",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
  }
};

const serviciosData = [
  { name: "Mantenimiento", path: "/servicios" },
  { name: "Mapeo Térmico", path: "/servicios" },
  { name: "Análisis Termográfico", path: "/servicios" }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estados para el Mega Menú (METROLOGÍA)
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('metrologia'); 
  const [hoveredItem, setHoveredItem] = useState(null);

  // Estados para el Mega Menú (INGENIERÍA)
  const [isIngenieriaMenuOpen, setIsIngenieriaMenuOpen] = useState(false);
  const [activeIngenieriaCategory, setActiveIngenieriaCategory] = useState('mantenimiento');
  
  // Estados para otros menús
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); 
  
  // Estados para el login de Certilab
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Controlar el Scroll
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

  const handleCertilabLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
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
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* BARRA SUPERIOR */}
      <div className="top-contact-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <Link to="/blog" className="btn-outline-top">Blog</Link>
          </div>
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
              // Solo cerramos si no estamos escribiendo en los inputs
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
                  {/* PESTAÑAS SUPERIORES */}
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

                  {/* PANEL INFERIOR OSCURO */}
                  <div className="mega-content-panel">
                    {/* Lista Izquierda */}
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

                    {/* Caja de Información Derecha */}
                    <div className={`mega-info-card ${laboratoriosData[activeCategory].isLoginForm ? 'certilab-mode' : ''}`}>
                      
                      {/* CONDICIONAL: SI ES CERTILAB, MOSTRAMOS EL LOGIN */}
                      {laboratoriosData[activeCategory].isLoginForm ? (
                        <div className="mega-certilab-login">
                          <img src={logo} alt="Certimet Logo" className="login-logo-mega" />
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
                        /* SI NO ES CERTILAB, MOSTRAMOS TEXTOS Y LISTAS NORMALES */
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
                  {/* PESTAÑAS SUPERIORES HORIZONTALES */}
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

                  {/* PANEL INFERIOR CON IMAGEN */}
                  <div className="ingenieria-content-panel">
                    
                    {/* Caja de Información Izquierda */}
                    <div className="ingenieria-info-box">
                      <h3>{ingenieriaMegaData[activeIngenieriaCategory].title}</h3>
                      <p>{ingenieriaMegaData[activeIngenieriaCategory].desc}</p>
                      
                      {/* Lista de viñetas corregida */}
                      <ul className="ingenieria-bullet-list">
                        {ingenieriaMegaData[activeIngenieriaCategory].bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                      
                      <Link to={ingenieriaMegaData[activeIngenieriaCategory].btnLink} className="btn-ingenieria-outline">
                        {ingenieriaMegaData[activeIngenieriaCategory].btnText}
                      </Link>
                    </div>

                    {/* Imagen Derecha */}
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

          {/* =========================================================
              MENÚ SIMPLE: SERVICIOS
              ========================================================= */}
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