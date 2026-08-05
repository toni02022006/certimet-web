import React, { useState, useEffect, useRef } from 'react';
import { useComparacion } from '../../context/ComparacionContext';
import { Scale, X, Eye, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CompararProductos.css';

const CompararProductos = ({ producto, productosRelacionados = [] }) => {
  const { 
    productosComparar, 
    agregarMultiples,
    quitarProducto, 
    estaEnComparacion, 
    cantidad,
    limpiarComparacion
  } = useComparacion();
  
  const [relacionados, setRelacionados] = useState(productosRelacionados);
  const [cargandoRelacionados, setCargandoRelacionados] = useState(false);
  const [errorRelacionados, setErrorRelacionados] = useState(false);
  const llamadoRef = useRef(false);

  // Obtener relacionados si no vienen por prop
  useEffect(() => {
    if (llamadoRef.current || !producto?.id || !producto?.categoria_id) return;
    if (productosRelacionados.length > 0) {
      setRelacionados(productosRelacionados);
      return;
    }
    llamadoRef.current = true;
    const fetchRelacionados = async () => {
      setCargandoRelacionados(true);
      setErrorRelacionados(false);
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/relacionados/${producto.id}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setRelacionados(data);
        } else {
          setErrorRelacionados(true);
        }
      } catch (error) {
        console.error('Error al obtener relacionados para recomendación:', error);
        setErrorRelacionados(true);
      } finally {
        setCargandoRelacionados(false);
      }
    };
    fetchRelacionados();
  }, [producto?.id, producto?.categoria_id, productosRelacionados]);

  // Buscar un producto relacionado que NO esté en comparación
  const productoRecomendado = relacionados.find(
    (p) => !estaEnComparacion(p.id)
  );

  // --- Manejar agregar el recomendado y el actual juntos ---
  const handleAgregarRecomendado = () => {
    if (!productoRecomendado) return;
    // Agregar ambos (el actual y el recomendado) usando agregarMultiples
    agregarMultiples([producto, productoRecomendado]);
  };

  if (!producto) return null;

  const urlBase = import.meta.env.VITE_API_URL;
  const imagenFallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';

  return (
    <div className="comparar-productos-wrapper">
      {/* Banner de productos en comparación (solo si hay) */}
      {cantidad > 0 && (
        <div className="comparar-banner animate-slide-up">
          <div className="comparar-banner-header">
            <span className="comparar-banner-titulo">
              <Scale size={18} className="icon-scale" /> {cantidad} producto{cantidad > 1 ? 's' : ''} en comparación
            </span>
            <div className="comparar-banner-acciones">
              <button 
                className="comparar-limpiar-btn"
                onClick={limpiarComparacion}
                title="Limpiar comparación"
              >
                <Trash2 size={14} /> Limpiar
              </button>
              <Link to="/tienda/comparar" className="comparar-ver-link">
                <Eye size={16} /> Ver comparación
              </Link>
            </div>
          </div>

          {/* Mini lista de productos seleccionados */}
          {productosComparar.length > 0 && (
            <div className="comparar-mini-lista">
              {productosComparar.map((p) => (
                <div key={p.id} className="comparar-mini-item animate-pop-in">
                  <img 
                    src={p.imagen_principal_url ? `${urlBase}${p.imagen_principal_url}` : imagenFallback}
                    alt={p.nombre}
                    className="comparar-mini-img"
                    onError={(e) => {
                      if (!e.target.dataset.error) {
                        e.target.dataset.error = true;
                        e.target.src = imagenFallback;
                      }
                    }}
                  />
                  <span className="comparar-mini-nombre">{p.nombre}</span>
                  <button 
                    className="comparar-mini-remove"
                    onClick={() => quitarProducto(p.id)}
                    title="Quitar"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          PRODUCTO RECOMENDADO (SIEMPRE QUE EXISTA)
          ====================================================== */}
      {!cargandoRelacionados && !errorRelacionados && productoRecomendado && (
        <div className="comparar-recomendacion animate-fade-in">
          <div className="comparar-recomendacion-contenido">
            <div className="comparar-img-wrapper">
              <img 
                src={productoRecomendado.imagen_principal_url ? `${urlBase}${productoRecomendado.imagen_principal_url}` : imagenFallback}
                alt={productoRecomendado.nombre}
                className="comparar-recomendacion-img"
                onError={(e) => {
                  if (!e.target.dataset.error) {
                    e.target.dataset.error = true;
                    e.target.src = imagenFallback;
                  }
                }}
              />
            </div>
            <div className="comparar-recomendacion-info">
              <p className="comparar-recomendacion-mensaje">
                ¿Te puede interesar también este?
              </p>
              <h4 className="comparar-recomendacion-nombre">{productoRecomendado.nombre}</h4>
              <div className="comparar-recomendacion-precio">
                {productoRecomendado.precio_oferta ? (
                  <>
                    <span className="precio-antiguo">S/ {Number(productoRecomendado.precio_regular).toFixed(2)}</span>
                    <span className="precio-oferta">S/ {Number(productoRecomendado.precio_oferta).toFixed(2)}</span>
                  </>
                ) : (
                  <span>S/ {Number(productoRecomendado.precio_regular).toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
          <button 
            className="comparar-recomendacion-btn"
            onClick={handleAgregarRecomendado}
          >
            <Plus size={16} className="icon-plus" /> Añadir producto
          </button>
        </div>
      )}

      {/* Mensajes de carga o error */}
      {cargandoRelacionados && (
        <div className="comparar-cargando animate-pulse">Cargando recomendación...</div>
      )}
      {errorRelacionados && (
        <div className="comparar-error animate-fade-in">No se pudo cargar la recomendación</div>
      )}
    </div>
  );
};

export default CompararProductos;