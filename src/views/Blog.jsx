import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogCertimet.css';

// ✅ URL FIJA PARA PRUEBA
const API_BASE = 'https://api.certimet.pe';

const categories = ['Todos', 'Metrología', 'Automatización', 'Normativas'];

const mapCategoriaVisual = {
  'METROLOGIA': 'Metrología',
  'AUTOMATIZACION': 'Automatización',
  'NORMATIVAS': 'Normativas'
};

// Íconos Modernos Minimalistas
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const TimeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px', verticalAlign: 'middle'}}>
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px', verticalAlign: 'middle'}}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [blogPosts, setBlogPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        console.log('🔍 Intentando obtener artículos desde:', `${API_BASE}/api/blog`);
        const response = await fetch(`${API_BASE}/api/blog`);
        console.log('📡 Respuesta recibida, status:', response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('📦 Datos recibidos:', data);
        
        const hoy = new Date().toISOString().split('T')[0];
        const validos = data.filter(post => post.activo && post.fecha_publicacion.split('T')[0] <= hoy);
        validos.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
        
        const formatted = validos.map((post, index) => ({
          id: post.id,
          title: post.titulo,
          excerpt: post.subtitulo || 'Sin descripción',
          category: mapCategoriaVisual[post.categoria] || 'General',
          date: new Date(post.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
          readTime: `${post.minutos_lectura || 1} min`,
          image: post.imagen_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          featured: index === 0
        }));
        
        console.log('✅ Artículos formateados:', formatted);
        setBlogPosts(formatted);
      } catch (error) {
        console.error('❌ Error fetching blog:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchArticulos();
  }, []);

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'Todos' || post.category === activeCategory
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const renderFlippingText = (text, delayOffset = 0) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="cbp-letter-flip"
        style={{ animationDelay: `${delayOffset + (index * 0.05)}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="cbp-wrapper">
      
      {/* CABECERA EDITORIAL */}
      <section className="cbp-hero-section">
        <div className="cbp-hero-bg"></div>
        <div className="cbp-hero-grid"></div>
        
        <div className="cbp-hero-content">
          <h1>
            {renderFlippingText("Nuestro", 0)}
            <span className="cbp-blog-spin">
              {renderFlippingText("blog", 0.5)}
            </span>
            {renderFlippingText("y recursos", 0.7)}
          </h1>
          <p>Innovación, guías especializadas y las últimas tendencias en metrología y automatización industrial, diseñadas para profesionales.</p>
        </div>

        {/* FILTROS */}
        <nav className="cbp-nav-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`cbp-filter-item ${activeCategory === cat ? 'cbp-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="cbp-main-container">
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '120px 0', color: '#64748b' }}>
             <p style={{fontSize: '1.2rem'}}>Cargando contenido premium...</p>
          </div>
        ) : (
          <>
            <div className="cbp-grid" key={`grid-anim-${activeCategory}-${currentPage}`}>
              {currentPosts.map(post => {
                const isFeatured = post.featured && activeCategory === 'Todos' && currentPage === 1;
                
                if (isFeatured) {
                  return (
                    <article key={post.id} className="cbp-featured-post">
                      <div className="cbp-featured-image">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className="cbp-featured-content">
                        <span className="cbp-tag">{post.category}</span>
                        <h2 className="cbp-featured-title">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="cbp-featured-excerpt">{post.excerpt}</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                           <Link to={`/blog/${post.id}`} className="cbp-read-more" style={{fontSize: '1.1rem'}}>
                            Leer artículo completo <ArrowRight />
                          </Link>
                          <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                            <TimeIcon /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                }

                return (
                  <article key={post.id} className="cbp-post-card">
                    <div className="cbp-card-img-box">
                      <img src={post.image} alt={post.title} />
                    </div>
                    
                    <div className="cbp-card-body">
                      <div className="cbp-card-meta-top">
                        <span className="cbp-card-cat">{post.category}</span>
                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}><TimeIcon /> {post.readTime}</span>
                      </div>
                      
                      <h3 className="cbp-card-title">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      
                      <p className="cbp-card-desc">{post.excerpt}</p>
                      
                      <div className="cbp-card-footer">
                        <span><CalendarIcon /> {post.date}</span>
                        <Link to={`/blog/${post.id}`} className="cbp-read-more">
                          Leer <ArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {!cargando && currentPosts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
                <h3 style={{ fontWeight: 500, fontSize: '1.5rem', color: '#00234a' }}>No hay artículos disponibles</h3>
                <p>Intenta seleccionando otra categoría.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="cbp-pagination-modern">
                <button 
                  className="cbp-page-arrow" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`cbp-page-dot ${currentPage === index + 1 ? 'cbp-active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button 
                  className="cbp-page-arrow" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;