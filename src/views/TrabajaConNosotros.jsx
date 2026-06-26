import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/layout/Header'; 
import Footer from '../components/layout/Footer'; // ⬅️ Ajusta esta ruta según tu proyecto
import './TrabajaConNosotros.css';

// Empleos de prueba
const ofertasDummy = [
  {
    id: 1,
    isNew: true,
    published: "26/06/2026",
    deadline: "15/07/2026",
    category: "Ingeniería y Automatización",
    title: "INGENIERO DE AUTOMATIZACIÓN SENIOR - LIMA",
    tags: [
      { label: "Sede: LIMA", type: "gray" },
      { label: "Jornada: Tiempo Completo", type: "gray" },
      { label: "Presencial", type: "blue" },
      { label: "Salario: Acorde al mercado", type: "green" }
    ],
    details: {
      vacantes: 1,
      estudios: "Universitario Titulado / Colegiado",
      idioma: "Inglés Intermedio",
      habilidades: "Programación PLC, SCADA, Liderazgo de equipos"
    },
    requirements: [
      "¿Cuenta con colegiatura habilitada vigente? ||| TEXTO (Excluyente)",
      "¿Cuántos años de experiencia tiene programando PLC Siemens y Allen Bradley? ||| TEXTO (Excluyente)",
      "¿Reside en Lima Metropolitana o tiene disponibilidad para reubicarse? ||| SINO (Excluyente)",
      "Bríndeme su número de WhatsApp para contacto inmediato ||| TEXTO"
    ]
  }
];

const TrabajaConNosotros = () => {
  const [activeTab, setActiveTab] = useState('ofertas'); // 'ofertas', 'cv', 'rrhh'

  return (
    <>
      {/* ⬅️ HEADER AGREGADO AQUÍ */}
      <Header /> 

      <div className="work-page-wrapper">
        
        {/* 1. HERO SECTION */}
        <section className="work-hero-section">
          <div className="work-hero-overlay"></div>
          <div className="work-hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Bolsa de Trabajo CERTIMET
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Únete a nuestro equipo y desarrolla tu potencial en proyectos de metrología e ingeniería de alto impacto.
            </motion.p>
          </div>
        </section>

        {/* 2. CONTENEDOR PRINCIPAL FLOTANTE */}
        <section className="work-main-container">
          
          {/* HEADER DE LA TARJETA */}
          <div className="work-card-header">
            <h2>Trabaja con Nosotros</h2>
            <p>Descubre nuestras vacantes o postula de manera espontánea.</p>
          </div>

          {/* PESTAÑAS (TABS) */}
          <div className="work-tabs-container">
            <button 
              className={`work-tab ${activeTab === 'ofertas' ? 'active' : ''}`}
              onClick={() => setActiveTab('ofertas')}
            >
              VER OFERTAS DISPONIBLES
            </button>
            <button 
              className={`work-tab ${activeTab === 'cv' ? 'active' : ''}`}
              onClick={() => setActiveTab('cv')}
            >
              INGRESA TU CV 
            </button>
            <button 
              className={`work-tab ${activeTab === 'rrhh' ? 'active' : ''}`}
              onClick={() => setActiveTab('rrhh')}
            >
              ACCESO RR.HH.
            </button>
          </div>

          {/* CONTENIDO DE LAS PESTAÑAS */}
          <div className="work-tab-content">
            <AnimatePresence mode="wait">
              
              {/* PESTAÑA 1: OFERTAS */}
              {activeTab === 'ofertas' && (
                <motion.div 
                  key="ofertas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="offers-list"
                >
                  {ofertasDummy.map(job => (
                    <div className="job-card" key={job.id}>
                      
                      {/* Fila superior: Badges y Fechas */}
                      <div className="job-header-row">
                        <div className="job-meta-left">
                          {/* 👇 CAMBIO: Estrella movida a la derecha */}
                          {job.isNew && <span className="badge-new">NUEVO EMPLEO ✨</span>}
                          <span className="job-published">Publicado el: <strong>{job.published}</strong></span>
                          <span className="job-category">CATEGORÍA: {job.category}</span>
                        </div>
                        <div className="job-meta-right">
                          <button className="btn-postular">Postular Aquí</button>
                          <span className="job-deadline">Límite: {job.deadline}</span>
                        </div>
                      </div>

                      {/* Título y Tags */}
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-tags-row">
                        {job.tags.map((tag, idx) => (
                          <span key={idx} className={`job-tag tag-${tag.type}`}>
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* Detalles compactos */}
                      <div className="job-quick-details">
                        <p><strong>Vacantes:</strong> {job.details.vacantes} <span className="separator">|</span> 
                           <strong>Estudios:</strong> {job.details.estudios} <span className="separator">|</span> 
                           <strong>Idioma:</strong> {job.details.idioma}
                        </p>
                        <p><strong>Habilidades:</strong> <i>{job.details.habilidades}</i></p>
                      </div>

                      {/* Caja de Requisitos */}
                      <div className="job-requirements-box">
                        <h4>Requisitos Obligatorios:</h4>
                        <ul>
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>- {req}</li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  ))}
                </motion.div>
              )}

              {/* PESTAÑA 2: INGRESA TU CV */}
              {activeTab === 'cv' && (
                <motion.div 
                  key="cv"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="empty-tab-state"
                >
                  <h3>Postulación Espontánea</h3>
                  <p>Si no encuentras una vacante que se ajuste a tu perfil, déjanos tu CV y te contactaremos para futuras oportunidades.</p>
                  <button className="btn-solid-blue">Subir mi CV</button>
                </motion.div>
              )}

              {/* PESTAÑA 3: RRHH */}
              {activeTab === 'rrhh' && (
                <motion.div 
                  key="rrhh"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="empty-tab-state"
                >
                  <h3>Portal de Recursos Humanos</h3>
                  <p>Acceso exclusivo para el personal administrativo de CERTIMET.</p>
                  <button className="btn-outline-blue" style={{marginTop: '15px'}}>Iniciar Sesión</button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>
      </div>

      {/* ⬅️ FOOTER AGREGADO AQUÍ */}
      <Footer /> 
    </>
  );
};

export default TrabajaConNosotros;