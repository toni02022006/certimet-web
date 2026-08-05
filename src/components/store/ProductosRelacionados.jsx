import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './ProductosRelacionados.css';
import { useCarrito } from '../../context/CarritoContext';

const ProductosRelacionados = ({ productoId, categoriaId }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    const fetchRelacionados = async () => {
      if (!categoriaId) {
        console.warn('❌ No hay categoriaId, no se buscan relacionados');
        setCargando(false);
        return;
      }

      try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/relacionados/${productoId}`;
        console.log('🔍 Buscando productos relacionados en:', url);
        const response = await fetch(url);

        if (!response.ok) {
          console.error('❌ Error HTTP:', response.status);
          setProductos([]);
          return;
        }

        const data = await response.json();
        console.log('✅ Productos relacionados recibidos:', data);
        setProductos(data);
      } catch (error) {
        console.error('❌ Error de red al obtener relacionados:', error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    fetchRelacionados();
  }, [productoId, categoriaId]);

  if (cargando) {
    return <div className="relacionados-cargando">Cargando productos similares...</div>;
  }

  if (productos.length === 0) {
    // No mostrar nada si no hay productos (puedes cambiar a null o un mensaje)
    return null;
  }

  const urlBase = import.meta.env.VITE_API_URL;
  const imagenFallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';

  return (
    <div className="productos-relacionados">
      <h2 className="relacionados-titulo">Productos similares</h2>
      <div className="relacionados-grid">
        {productos.map((prod) => {
          const imagenSrc = prod.imagen_principal_url
            ? `${urlBase}${prod.imagen_principal_url}`
            : imagenFallback;

          const tieneOferta = prod.precio_oferta && prod.precio_oferta < prod.precio_regular;

          return (
            <div className="relacionado-card" key={prod.id}>
              <Link to={`/tienda/producto/${prod.slug || prod.id}`} className="relacionado-enlace">
                <div className="relacionado-imagen">
                  <img src={imagenSrc} alt={prod.nombre} />
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
  );
};

export default ProductosRelacionados;