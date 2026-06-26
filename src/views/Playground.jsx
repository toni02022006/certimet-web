import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Image, BarChart3, LineChart, LayoutTemplate } from 'lucide-react';
import './Playground.css';

const Playground = () => {
  // Variantes de Framer Motion para entradas escalonadas y efecto resorte
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
  };

  // Datos para los círculos de la izquierda basados en tu imagen
  const leftNodes = [
    { id: 'dot-1', colorClass: 'dot-blue' },
    { id: 'dot-2', colorClass: 'dot-red' },
    { id: 'dot-3', colorClass: 'dot-darkblue' },
    { id: 'dot-4', colorClass: 'dot-green' },
    { id: 'dot-5', colorClass: 'dot-blue' }
  ];

  return (
    <div className="hero-animation-container">
      {/* CAPA DE LÍNEAS SVG CON GLOW */}
      <svg className="flow-lines-svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(13, 110, 253, 0.1)" />
            <stop offset="50%" stopColor="#0d6efd" />
            <stop offset="100%" stopColor="#198754" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Líneas Izquierda -> Centro */}
        <path d="M 150 200 C 350 200, 400 400, 500 400" className="glowing-line" filter="url(#glow)" />
        <path d="M 150 300 C 350 300, 400 400, 500 400" className="glowing-line" filter="url(#glow)" />
        <path d="M 150 400 C 350 400, 400 400, 500 400" className="glowing-line" filter="url(#glow)" />
        <path d="M 150 500 C 350 500, 400 400, 500 400" className="glowing-line" filter="url(#glow)" />
        <path d="M 150 600 C 350 600, 400 400, 500 400" className="glowing-line" filter="url(#glow)" />

        {/* Líneas Centro -> Derecha */}
        <path d="M 650 400 C 750 400, 800 200, 900 200" className="glowing-line right" filter="url(#glow)" />
        <path d="M 650 400 C 750 400, 800 450, 900 450" className="glowing-line right" filter="url(#glow)" />
        <path d="M 650 400 C 750 400, 800 700, 900 700" className="glowing-line right" filter="url(#glow)" />
      </svg>

      <motion.div 
        className="layout-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* COLUMNA IZQUIERDA: Círculos Minimalistas con Hover 3D */}
        <div className="column left-col">
          {leftNodes.map((item) => (
            <motion.div key={item.id} variants={itemVariants} whileHover={{ scale: 1.2, zIndex: 10 }}>
              <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.1} transitionSpeed={2000}>
                <div className={`social-wrapper ${item.colorClass}-shadow`}>
                  <div className={`solid-circle ${item.colorClass}`}></div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* COLUMNA CENTRAL: Móvil con Glare (Brillo) y Flotación */}
        <div className="column center-col">
          <motion.div variants={itemVariants} className="floating-core">
            <Tilt 
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              glareEnable={true} 
              glareMaxOpacity={0.3} 
              glareColor="#ffffff" 
              glarePosition="all"
              scale={1.02}
              className="tilt-container"
            >
              <div className="phone-mockup">
                <div className="phone-notch"></div>
                <div className="phone-header">
                  <div className="avatar-circle"></div>
                  <div className="lines-group">
                    <div className="sk-line w-full"></div>
                    <div className="sk-line w-half"></div>
                  </div>
                </div>
                
                <div className="phone-image-placeholder">
                  <Image size={48} color="#94a3b8" strokeWidth={1.5} />
                </div>

                <div className="phone-body">
                  <div className="sk-line w-full"></div>
                  <div className="sk-line w-full"></div>
                  <div className="sk-line w-3/4"></div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="certimet-cta"
                  >
                    Automatización
                  </motion.button>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: Dashboards Interactivos Flotantes */}
        <div className="column right-col">
          <motion.div variants={itemVariants}>
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} className="dashboard-card float-delay-2">
              <div className="dash-header">
                <div className="mini-avatar blue"></div>
                <div className="sk-line w-half"></div>
                <div className="corner-dot orange"></div>
              </div>
              <div className="dash-body centered">
                <LineChart size={50} color="#0d6efd" strokeWidth={2} />
              </div>
            </Tilt>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} className="dashboard-card float-delay-4">
              <div className="dash-header">
                <div className="mini-avatar green"></div>
                <div className="sk-line w-3/4"></div>
                <div className="corner-dot orange"></div>
              </div>
              <div className="dash-body row">
                <div className="color-block purple">
                  <LayoutTemplate size={24} color="#fff" />
                </div>
                <div className="lines-group">
                  <div className="sk-line w-full"></div>
                  <div className="sk-line w-full"></div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} className="dashboard-card float-delay-1">
              <div className="dash-header">
                <div className="mini-avatar blue"></div>
                <div className="sk-line w-half"></div>
                <div className="corner-dot orange"></div>
              </div>
              <div className="dash-body">
                <BarChart3 size={50} color="#0d6efd" strokeWidth={2} />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Playground;