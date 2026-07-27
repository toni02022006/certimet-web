import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ArticuloDetalle.css';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Hook para la barra de progreso de lectura
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`);
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
    return (
      <div className="articulo-loader">
        <div className="spinner-certimet"></div>
        <p>Preparando lectura...</p>
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="articulo-loader">
        <h2>Artículo no encontrado</h2>
        <Link to="/blog" className="link-retorno-simple">← Volver al Blog</Link>
      </div>
    );
  }

  const fechaBonita = new Date(articulo.fecha_publicacion).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  // Configuraciones de Animación (Variantes)
  const animacionContenedor = {
    oculto: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const animacionElemento = {
    oculto: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <article className="articulo-elegante-page">
      {/* BARRA DE PROGRESO DE LECTURA */}
      <motion.div className="barra-progreso-lectura" style={{ scaleX }} />

      {/* HEADER COMPACTO Y AZUL */}
      <header className="header-compacto">
        <div className="header-limite">
          <Link to="/blog" className="link-retorno">
            <span className="flecha-hover">←</span> Volver a los artículos
          </Link>

          <motion.div 
            className="header-textos"
            variants={animacionContenedor}
            initial="oculto"
            animate="visible"
          >
            <motion.span variants={animacionElemento} className="etiqueta-categoria">
              {articulo.categoria || 'General'}
            </motion.span>
            
            <motion.h1 variants={animacionElemento} className="titulo-principal">
              {articulo.titulo}
            </motion.h1>
            
            {articulo.subtitulo && (
              <motion.p variants={animacionElemento} className="subtitulo-header">
                {articulo.subtitulo}
              </motion.p>
            )}

            <motion.div variants={animacionElemento} className="fila-meta">
              <div className="meta-item">
                <span className="icono-meta">✍️</span>
                <span>{articulo.autor ? `${articulo.autor.nombre} ${articulo.autor.apellidos}` : 'Equipo Certimet'}</span>
              </div>
              <span className="punto-separador">•</span>
              <div className="meta-item">
                <span className="icono-meta">📅</span>
                <span>{fechaBonita}</span>
              </div>
              <span className="punto-separador">•</span>
              <div className="meta-item">
                <span className="icono-meta">⏱️</span>
                <span>{articulo.minutos_lectura || 1} min lectura</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* CUERPO DEL ARTÍCULO */}
      <main className="cuerpo-ancho">
        
        {articulo.imagen_url && (
          <motion.div 
            className="marco-imagen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="mascara-hover">
              <img 
                src={articulo.imagen_url} 
                alt={articulo.titulo} 
                className="imagen-proporcional animacion-zoom" 
              />
            </div>
          </motion.div>
        )}

        <motion.div 
          className="contenedor-texto-amplio"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div 
            className="quill-contenido-limpio"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />
        </motion.div>

        <motion.footer 
          className="footer-sencillo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/blog" className="boton-verde-final">
            Explorar más publicaciones
          </Link>
        </motion.footer>
      </main>
    </article>
  );
};

export default ArticuloDetalle;