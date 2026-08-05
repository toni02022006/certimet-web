import React from 'react';
import { useComparacion } from '../context/ComparacionContext';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Scale, Trash2, ArrowLeft } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';
import './Comparar.css';

const Comparar = () => {
  const { productosComparar, quitarProducto, limpiarComparacion } = useComparacion();
  const { agregarProducto } = useCarrito();

  // Definición de atributos a comparar
  const atributos = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'sku', label: 'SKU' },
    { key: 'marca', label: 'Marca', esRelacion: true, campo: 'marca' },
    { key: 'categoria', label: 'Categoría', esRelacion: true, campo: 'categoria' },
    { key: 'precio_regular', label: 'Precio', format: (val) => `S/ ${Number(val).toFixed(2)}` },
    { key: 'stock', label: 'Stock' },
    { key: 'peso_kg', label: 'Peso (kg)', format: (val) => val ? Number(val).toFixed(2) : '-' },
    { 
      key: 'dimensiones', 
      label: 'Dimensiones (cm)', 
      format: (producto) => {
        const l = producto.largo_cm ? Number(producto.largo_cm).toFixed(1) : '-';
        const a = producto.ancho_cm ? Number(producto.ancho_cm).toFixed(1) : '-';
        const al = producto.alto_cm ? Number(producto.alto_cm).toFixed(1) : '-';
        return `${l} × ${a} × ${al}`;
      }
    },
    { key: 'garantia_meses', label: 'Garantía (meses)', format: (val) => val || '-' },
    { key: 'condicion', label: 'Condición' },
  ];

  // Si no hay productos
  if (productosComparar.length === 0) {
    return (
      <div className="comparar-vacio animate-fade-in">
        <Scale size={56} className="icono-vacio" />
        <h2>No hay productos para comparar</h2>
        <p>Agrega productos desde el catálogo o sus páginas de detalle para evaluarlos aquí.</p>
        <Link to="/tienda/catalogo" className="btn-volver">
          <ArrowLeft size={18} /> Ir al catálogo
        </Link>
      </div>
    );
  }

  const urlBase = import.meta.env.VITE_API_URL;
  const imagenFallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';

  return (
    <div className="comparar-container animate-fade-in">
      <div className="comparar-header">
        <h1>Comparar Productos</h1>
        <div className="comparar-acciones">
          <button onClick={limpiarComparacion} className="btn-limpiar">
            <Trash2 size={16} /> Limpiar todo
          </button>
          <Link to="/tienda/catalogo" className="btn-seguir">
            Seguir comprando
          </Link>
        </div>
      </div>

      {/* Tarjetas de productos */}
      <div className="comparar-grid">
        {productosComparar.map((producto) => {
          const imagenSrc = producto.imagen_principal_url
            ? `${urlBase}${producto.imagen_principal_url}`
            : imagenFallback;

          return (
            <div className="comparar-columna" key={producto.id}>
              <button 
                className="comparar-eliminar" 
                onClick={() => quitarProducto(producto.id)}
                title="Quitar de comparación"
              >
                <X size={18} />
              </button>
              <div className="comparar-imagen">
                <img
                  src={imagenSrc}
                  alt={producto.nombre}
                  onError={(e) => {
                    if (!e.target.dataset.error) {
                      e.target.dataset.error = true;
                      e.target.src = imagenFallback;
                    }
                  }}
                />
              </div>
              <h3 className="comparar-nombre" title={producto.nombre}>{producto.nombre}</h3>
              <Link to={`/producto/${producto.slug || producto.id}`} className="comparar-link">
                Ver detalles
              </Link>
              <button
                className="comparar-agregar-carrito"
                onClick={() => agregarProducto(producto, 1)}
              >
                <ShoppingCart size={16} /> Agregar
              </button>
            </div>
          );
        })}
      </div>

      {/* Tabla de comparación */}
      <div className="comparar-tabla-wrapper">
        <table className="comparar-tabla">
          <thead>
            <tr>
              <th className="th-atributo">Atributo</th>
              {productosComparar.map((p) => (
                <th key={p.id} className="th-producto">{p.nombre}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {atributos.map((attr) => (
              <tr key={attr.key}>
                <td className="atributo-label">{attr.label}</td>
                {productosComparar.map((producto) => {
                  let valor;

                  if (attr.esRelacion) {
                    const relacion = producto[attr.campo];
                    valor = relacion?.nombre || '-';
                  } 
                  else if (attr.key === 'dimensiones' && attr.format) {
                    valor = attr.format(producto);
                  }
                  else if (attr.format) {
                    const raw = producto[attr.key];
                    valor = attr.format(raw);
                  }
                  else {
                    const raw = producto[attr.key];
                    valor = raw !== null && raw !== undefined ? String(raw) : '-';
                  }

                  if (typeof valor === 'object' && valor !== null) {
                    console.warn(`Valor de ${attr.key} es un objeto:`, valor);
                    valor = '-'; 
                  }

                  // Destacar el precio si es el atributo actual
                  const esPrecio = attr.key === 'precio_regular';

                  return (
                    <td 
                      key={`${producto.id}-${attr.key}`} 
                      className={esPrecio ? 'valor-destacado' : ''}
                    >
                      {valor}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparar;