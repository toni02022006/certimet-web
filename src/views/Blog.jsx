import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Blog.css';

const categories = ['Todos', 'Metrología', 'Automatización', 'Normativas'];

// Diccionario para mapear cómo viene de la BD a cómo se ve en tu menú
const mapCategoriaVisual = {
  'METROLOGIA': 'Metrología',
  'AUTOMATIZACION': 'Automatización',
  'NORMATIVAS': 'Normativas'
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [blogPosts, setBlogPosts] = useState([]); // Estado para los datos reales

  // ==========================================
  // CONEXIÓN CON EL BACKEND
  // ==========================================
  useEffect(() => {
    const fetchArticulosPúblicos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blog');
        if (response.ok) {
          const data = await response.json();
          
          // 1. Obtenemos la fecha de hoy en formato 'YYYY-MM-DD' para comparar correctamente
          const hoy = new Date().toISOString().split('T')[0];

          // 2. Filtramos: Solo artículos activos Y cuya fecha de publicación ya haya llegado
          const articulosValidos = data.filter(post => {
            if (!post.activo) return false;
            const fechaPub = post.fecha_publicacion.split('T')[0];
            return fechaPub <= hoy;
          });

          // 3. Ordenamos del más nuevo al más antiguo
          articulosValidos.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));

          // 4. Adaptamos los datos de la Base de Datos a la estructura de tus tarjetas visuales
          const formattedPosts = articulosValidos.map((post, index) => {
            // Formatear fecha a estilo "15 Jun 2026"
            const fechaObjeto = new Date(post.fecha_publicacion);
            const opcionesFecha = { day: '2-digit', month: 'short', year: 'numeric' };
            const fechaBonita = fechaObjeto.toLocaleDateString('es-ES', opcionesFecha);

            return {
              id: post.id,
              title: post.titulo,
              excerpt: post.subtitulo || 'Sin descripción',
              category: mapCategoriaVisual[post.categoria] || 'General',
              date: fechaBonita,
              readTime: `${post.minutos_lectura} min`,
              // Si no subió imagen, ponemos una por defecto corporativa
              image: post.imagen_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
              // El primer artículo de la lista es automáticamente el destacado
              featured: index === 0 
            };
          });

          setBlogPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error al cargar el blog:', error);
      }
    };

    fetchArticulosPúblicos();
  }, []);

  // Filtrar posts según la categoría seleccionada
  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'Todos' ? true : post.category === activeCategory
  );

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="blog-page">
      {/* ================= HERO SECTION ================= */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Actualidad y <span>Recursos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Noticias, artículos técnicos y guías sobre metrología y automatización industrial.
          </motion.p>
        </div>
      </div>

      {/* ================= FILTROS DE CATEGORÍAS ================= */}
      <div className="blog-filters-container">
        <div className="blog-filters">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= GRILLA DE ARTÍCULOS ================= */}
      <div className="blog-content-wrapper">
        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory} 
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id} 
                className={`blog-card ${post.featured && activeCategory === 'Todos' ? 'featured-card' : ''}`}
                variants={itemVariants}
                layout
              >
                {/* Imagen del Post */}
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-card-category">{post.category}</div>
                </div>

                {/* Contenido del Post */}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {post.date}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-card-footer">
                      <Link to={`/blog/${post.id}`} className="read-more-btn" style={{ textDecoration: 'none' }}>
                        Leer Artículo
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredPosts.length === 0 && (
          <div className="no-posts-message">
            <p>No se encontraron artículos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;