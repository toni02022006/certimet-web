import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './ProductosRelacionados.css';
import { useCarrito } from '../../context/CarritoContext';

const ProductosRelacionados = ({ productoId, categoriaId }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();

  // Referencias para la animación a 60fps sin re-renderizar
  const sliderRef = useRef(null);
  const requestRef = useRef(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(1); // 1 = avanza, -1 = retrocede
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchRelacionados = async () => {
      if (!categoriaId) {
        setCargando(false);
        return;
      }
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/relacionados/${productoId}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          setProductos([]);
        }
      } catch (error) {
        console.error('Error al obtener relacionados:', error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };
    fetchRelacionados();
  }, [productoId, categoriaId]);

  // Animación continua de rebote (incluso si hay pocos productos)
  useEffect(() => {
    if (productos.length === 0 || isHovered) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const slider = sliderRef.current;
    if (!slider) return;

    const step = 1; // Píxeles por frame (velocidad)

    const animate = () => {
      const containerWidth = slider.parentElement.offsetWidth;
      const trackWidth = slider.scrollWidth;

      // Calculamos la diferencia absoluta de espacio
      const diff = Math.abs(trackWidth - containerWidth);

      // Si miden exactamente lo mismo, no hay espacio para rebotar
      if (diff === 0) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      // Avanzamos el offset
      offsetRef.current += step * directionRef.current;

      // Lógica de rebote en los límites
      if (offsetRef.current >= diff) {
        offsetRef.current = diff;
        directionRef.current = -1; // Cambia de dirección
      } else if (offsetRef.current <= 0) {
        offsetRef.current = 0;
        directionRef.current = 1; // Cambia de dirección
      }

      // Si hay MUCHOS productos (desborda), los movemos a la izquierda (-)
      // Si hay POCOS productos (sobra espacio), los movemos a la derecha (+)
      const translateValue = trackWidth > containerWidth 
        ? -offsetRef.current 
        : offsetRef.current;

      slider.style.transform = `translateX(${translateValue}px)`;
      requestRef.current = requestAnimationFrame(animate);
    };

    // Iniciamos el ciclo
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [productos, isHovered]);

  if (cargando) return <div className="relacionados-cargando">Cargando productos similares...</div>;
  if (productos.length === 0) return null;

  const urlBase = import.meta.env.VITE_API_URL;
  const imagenFallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';

  return (
    <div className="productos-relacionados">
      <h2 className="relacionados-titulo">Productos similares</h2>
      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="slider-track" ref={sliderRef}>
          {productos.map((prod) => {
            const rutaProducto = prod.slug ? `/producto/${prod.slug}` : `/producto/${prod.id}`;
            const imagenSrc = prod.imagen_principal_url
              ? `${urlBase}${prod.imagen_principal_url}`
              : imagenFallback;
            const tieneOferta = prod.precio_oferta && prod.precio_oferta < prod.precio_regular;

            return (
              <div className="relacionado-card" key={prod.id}>
                <Link to={rutaProducto} className="relacionado-enlace">
                  <div className="relacionado-imagen">
                    <img
                      src={imagenSrc}
                      alt={prod.nombre}
                      onError={(e) => {
                        if (!e.target.dataset.error) {
                          e.target.dataset.error = true;
                          e.target.src = imagenFallback;
                        }
                      }}
                    />
                  </div>
                  <div className="relacionado-info">
                    <h3 className="relacionado-nombre">{prod.nombre}</h3>
                    <div className="relacionado-precios">
                      {tieneOferta ? (
                        <>
                          <span className="relacionado-precio-antiguo">
                            S/ {Number(prod.precio_regular).toFixed(2)}
                          </span>
                          <span className="relacionado-precio-oferta">
                            S/ {Number(prod.precio_oferta).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="relacionado-precio-normal">
                          S/ {Number(prod.precio_regular).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                <button
                  className="relacionado-agregar"
                  onClick={(e) => {
                    e.preventDefault();
                    agregarProducto(prod, 1);
                  }}
                  disabled={prod.stock <= 0}
                >
                  <ShoppingCart size={16} />
                  {prod.stock > 0 ? 'Añadir al carro' : 'Agotado'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductosRelacionados;