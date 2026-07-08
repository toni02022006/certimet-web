import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; 
import './ProductoDetalle.css'; 

const ProductoDetalle = () => {
  const { id } = useParams(); 
  
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  
  // Estado para saber qué imagen se está mostrando en el cuadro grande
  const [imagenActiva, setImagenActiva] = useState('');

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:3000/api/productos/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
          // Por defecto, la imagen grande será la principal
          setImagenActiva(data.imagen_principal_url);
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

  // Lógica para mostrar las rutas de las imágenes
  const urlBase = 'http://localhost:3000';
  const principalReal = producto.imagen_principal_url ? `${urlBase}${producto.imagen_principal_url}` : 'https://via.placeholder.com/500?text=Sin+Imagen';
  
  // La imagen que se muestra en grande es la activa
  const imagenGrande = imagenActiva ? `${urlBase}${imagenActiva}` : principalReal;

  // Función para limpiar el HTML y reemplazar &nbsp; por espacios normales
  const limpiarHTML = (html) => {
    if (!html) return '';
    // Reemplazar &nbsp; por espacios normales
    let cleaned = html.replace(/&nbsp;/g, ' ');
    return cleaned;
  };

  return (
    <div className="detalle-container">
      
      <nav className="breadcrumb-container">
        <Link to="/tienda" className="breadcrumb-link">Tienda</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/tienda/catalogo" className="breadcrumb-link">Catálogo</Link>
        <span className="breadcrumb-separator">›</span>
        {producto.categoria && (
          <>
            <Link to={`/tienda/categoria/${producto.categoria.id}`} className="breadcrumb-link">
              {producto.categoria.nombre}
            </Link>
            <span className="breadcrumb-separator">›</span>
          </>
        )}
        <span className="breadcrumb-current">{producto.nombre}</span>
      </nav>

      <div className="amazon-grid">
        
        <div className="col-imagenes">
          <div className="galeria-miniaturas">
            {/* 1. Miniatura de la Imagen Principal */}
            <img 
              src={principalReal} 
              className={`miniatura ${imagenActiva === producto.imagen_principal_url ? 'activa' : ''}`} 
              alt="Principal"
              onMouseEnter={() => setImagenActiva(producto.imagen_principal_url)} 
            />
            
            {/* Miniaturas de la galería */}
            {producto.imagenes && producto.imagenes.map((img) => (
              <img 
                key={img.id}
                src={`${urlBase}${img.url_imagen}`} 
                className={`miniatura ${imagenActiva === img.url_imagen ? 'activa' : ''}`} 
                alt="Galería" 
                onMouseEnter={() => setImagenActiva(img.url_imagen)} 
              />
            ))}
          </div>
          
          <div className="imagen-principal-container">
             <img src={imagenGrande} alt={producto.nombre} className="imagen-principal" />
          </div>
        </div>

        {/* COLUMNA 2: INFORMACIÓN */}
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

        {/* COLUMNA 3: BUY BOX */}
        <div className="col-buybox">
          <div className="buybox-precio">
            S/ {Number(producto.precio_regular).toFixed(2)}
          </div>
          <p style={{ fontSize: '14px', color: '#0056b3', marginBottom: '15px', fontWeight: '500' }}>Envío disponible a nivel nacional</p>
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
                <ShoppingCart size={18} /> Agregar al carrito
              </button>
              <button className="btn-certimet-buy">Comprar ahora</button>
            </>
          )}
        </div>

      </div>

      {/* SECCIÓN INFERIOR: DESCRIPCIÓN TÉCNICA - AHORA RENDERIZA HTML */}
      <div className="seccion-inferior">
        <h2>Descripción Técnica</h2>
        {/* 
          🔥 CORRECCIÓN: Usamos dangerouslySetInnerHTML para renderizar el HTML
          y además limpiamos los &nbsp; para que se vean como espacios normales
        */}
        <div 
          className="descripcion-larga"
          dangerouslySetInnerHTML={{ 
            __html: limpiarHTML(producto.descripcion_tecnica || 'Sin descripción técnica disponible.') 
          }} 
        />
      </div>

    </div>
  );
};

export default ProductoDetalle;