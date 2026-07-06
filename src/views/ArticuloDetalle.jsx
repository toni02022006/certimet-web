import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ArticuloDetalle.css'; // Crearemos este CSS en el siguiente paso

const ArticuloDetalle = () => {
  const { id } = useParams(); // Capturamos el ID de la URL
  const [articulo, setArticulo] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticulo(data);
        }
      } catch (error) {
        console.error('Error al cargar el artículo:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchDetalle();
  }, [id]);

  if (cargando) {
    return <div className="loading-screen">Cargando artículo...</div>;
  }

  if (!articulo) {
    return (
      <div className="error-screen">
        <h2>Artículo no encontrado</h2>
        <Link to="/blog" className="back-btn">Volver al Blog</Link>
      </div>
    );
  }

  // Formatear la fecha
  const fechaBonita = new Date(articulo.fecha_publicacion).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <motion.div 
      className="articulo-detalle-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Botón de regreso */}
      <div className="detalle-container">
        <Link to="/blog" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Volver a todos los artículos
        </Link>
      </div>

      {/* Cabecera del Artículo */}
      <header className="detalle-header detalle-container">
        <span className="detalle-categoria">{articulo.categoria}</span>
        <h1 className="detalle-titulo">{articulo.titulo}</h1>
        {articulo.subtitulo && <p className="detalle-subtitulo">{articulo.subtitulo}</p>}
        
        <div className="detalle-meta">
          <div className="meta-item">
            <div className="autor-avatar">
              {articulo.autor?.nombre.charAt(0)}{articulo.autor?.apellidos.charAt(0)}
            </div>
            <span>Por <strong>{articulo.autor?.nombre} {articulo.autor?.apellidos}</strong></span>
          </div>
          <span className="meta-divider">•</span>
          <span className="meta-item">{fechaBonita}</span>
          <span className="meta-divider">•</span>
          <span className="meta-item">⏱️ {articulo.minutos_lectura} min de lectura</span>
        </div>
      </header>

      {/* Imagen de Portada (Si existe) */}
      {articulo.imagen_url && (
        <div className="detalle-imagen-container">
          <img src={articulo.imagen_url} alt={articulo.titulo} className="detalle-imagen" />
        </div>
      )}

      {/* Contenido (El HTML de Quill) */}
      <div className="detalle-container">
        <div 
          className="detalle-contenido"
          dangerouslySetInnerHTML={{ __html: articulo.contenido }}
        />
      </div>
    </motion.div>
  );
};

export default ArticuloDetalle;