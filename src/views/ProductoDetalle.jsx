import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // <-- Asegúrate de tener este import
import './ProductoDetalle.css'; 

const ProductoDetalle = () => {
  const { id } = useParams(); 
  
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:3000/api/productos/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error("Error conectando con el servidor:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) return <div style={{ padding: '200px 20px', textAlign: 'center' }}>Cargando información del producto...</div>;
  if (!producto) return <div style={{ padding: '200px 20px', textAlign: 'center' }}>Producto no encontrado</div>;

  const imagenUrlReal = producto.imagen_principal_url ? `http://localhost:3000${producto.imagen_principal_url}` : 'https://via.placeholder.com/500?text=Sin+Imagen';

  return (
    <div className="detalle-container">
      <Link to="/tienda" className="btn-volver">
        ‹ Volver a la tienda
      </Link>

      <div className="amazon-grid">
        
        {/* Columna 1: Imágenes */}
        <div className="col-imagenes">
          <div className="galeria-miniaturas">
            <img src={imagenUrlReal} className="miniatura" alt="miniatura 1" />
            <img src={imagenUrlReal} className="miniatura" alt="miniatura 2" />
          </div>
          <div className="imagen-principal-container">
             <img src={imagenUrlReal} alt={producto.nombre} className="imagen-principal" />
          </div>
        </div>

        {/* Columna 2: Info Corta */}
        <div className="col-info">
          <h1 className="producto-titulo">{producto.nombre}</h1>
          <Link to="/tienda" className="producto-marca">Marca: {producto.categoria?.nombre || 'CERTIMET'}</Link>
          
          <hr className="separador" />
          
          <div className="precio-grande">
            <span className="moneda">S/</span> {Number(producto.precio_regular).toFixed(2)}
          </div>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Precio incluye IGV</p>
          
          <hr className="separador" />
          
          <h3 style={{ fontSize: '18px', margin: '15px 0 10px 0', fontWeight: '600' }}>Sobre este artículo</h3>
          <ul className="lista-caracteristicas">
            <li><strong>SKU:</strong> {producto.sku}</li>
            <li>{producto.descripcion_corta}</li>
          </ul>
        </div>

        {/* Columna 3: Buy Box */}
        <div className="col-buybox">
          <div className="buybox-precio">
            S/ {Number(producto.precio_regular).toFixed(2)}
          </div>
          
          <p style={{ fontSize: '14px', color: '#0056b3', marginBottom: '15px', fontWeight: '500' }}>
            Envío disponible a nivel nacional
          </p>

          {producto.stock > 0 ? (
            <div className="stock-disponible">En Stock</div>
          ) : (
            <div className="stock-disponible" style={{ color: '#d32f2f' }}>Agotado temporalmente</div>
          )}

          {producto.stock > 0 && (
            <>
              <div className="selector-cantidad">
                <label>Cantidad: </label>
                <select value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}>
                  {[...Array(Math.min(producto.stock, 10)).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                </select>
              </div>

              <button className="btn-certimet-cart">
                <ShoppingCart size={18} />
                Agregar al carrito
              </button>
              
              <button className="btn-certimet-buy">
                Comprar ahora
              </button>
            </>
          )}

          <div style={{ marginTop: '20px', fontSize: '13px', color: '#666', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Enviado por</span>
              <strong>Certimet Perú</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Vendido por</span>
              <strong>Certimet Perú</strong>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE INFERIOR */}
      <div className="seccion-inferior">
        <h2>Descripción Técnica</h2>
        <div className="descripcion-larga">
          {producto.descripcion_tecnica}
        </div>
      </div>

    </div>
  );
};

export default ProductoDetalle;