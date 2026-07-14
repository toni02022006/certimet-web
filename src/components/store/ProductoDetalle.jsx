import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, FileText, Truck, Store } from 'lucide-react';
import Swal from 'sweetalert2'; // ✅ IMPORTACIÓN DE SWEETALERT2
import './ProductoDetalle.css';

// ✅ Rutas relativas CORRECTAS desde components/store/
import logoMastercard from '../../image/tienda/MasterCard_Logo.png';
import logoPagoEfectivo from '../../image/tienda/pago-efectivo-2020.svg';
import logoPlin from '../../image/tienda/plin-logo.png';
import logoVisa from '../../image/tienda/Visalogo.svg';
import logoYape from '../../image/tienda/yape-logo.png';

// ================= DICCIONARIO DE CATEGORÍAS PRINCIPALES =================
const nombresCategoriasPrincipales = {
  2: "Automatización y Control",
  3: "Analítica",
  4: "Variables de Procesos",
  5: "Laboratorio",
  6: "SSOMA",
  7: "Calidad de ambiente"
};

// ================= ICONO WHATSAPP =================
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [imagenActiva, setImagenActiva] = useState('');

  // Estado para el acordeón
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    descripcion: false,
    detallada: false,
    especificaciones: false
  });

  const toggleSeccion = (seccion) => {
    setSeccionesAbiertas(prev => ({
      ...prev,
      [seccion]: !prev[seccion]
    }));
  };

  // Obtener producto
  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:3000/api/productos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
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

  // Agregar al carrito (usando localStorage)
  const agregarAlCarrito = () => {
    if (!producto) return;

    // Obtener carrito actual
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Verificar si el producto ya está en el carrito
    const existeIndex = carritoActual.findIndex(item => item.id === producto.id);

    if (existeIndex !== -1) {
      // Si existe, actualizar cantidad
      carritoActual[existeIndex].cantidad += cantidad;
    } else {
      // Si no existe, agregar nuevo item
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio_regular),
        cantidad: cantidad,
        imagen: producto.imagen_principal_url || '',
        sku: producto.sku
      });
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    // Disparar evento para actualizar el badge del header
    window.dispatchEvent(new Event('carritoActualizado'));

    // ✅ MENSAJE CENTRADO TOTALMENTE (SOLUCIÓN AL HEADER)
    Swal.fire({
      title: '¡Producto agregado!',
      text: `Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito.`,
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#00c652', // Verde como el botón de WhatsApp para mantener coherencia
      customClass: {
        container: 'swal2-modal-centrado'
      }
    });
  };

  // Comprar por WhatsApp
  const comprarWhatsApp = () => {
    const mensaje = `Hola, estoy interesado en comprar "${producto.nombre}" (SKU: ${producto.sku}). ¿Podrían darme más información?`;
    const url = `https://wa.me/51941101546?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (cargando) return <div style={{ padding: '200px 20px', textAlign: 'center' }}>Cargando información del producto...</div>;
  if (!producto) return <div style={{ padding: '200px 20px', textAlign: 'center' }}>Producto no encontrado</div>;

  const urlBase = 'http://localhost:3000';
  const principalReal = producto.imagen_principal_url ? `${urlBase}${producto.imagen_principal_url}` : 'https://via.placeholder.com/500?text=Sin+Imagen';
  const imagenGrande = imagenActiva ? `${urlBase}${imagenActiva}` : principalReal;

  const limpiarHTML = (html) => {
    if (!html) return '';
    return html.replace(/&nbsp;/g, ' ');
  };

  const restarCantidad = () => setCantidad(c => Math.max(1, c - 1));
  const sumarCantidad = () => setCantidad(c => Math.min(producto.stock, c + 1));

  return (
    <div className="detalle-container">

      <div className="two-column-layout">

        {/* COLUMNA IZQUIERDA: Breadcrumbs + Imágenes */}
        <div className="col-izquierda">
          <nav className="breadcrumb-container">
            <Link to="/tienda" className="breadcrumb-link">Tienda</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/tienda/catalogo" className="breadcrumb-link">Catálogo</Link>
            <span className="breadcrumb-separator">›</span>

            {producto.categoria && typeof producto.categoria === 'object' && producto.categoria.nombre && (
              <>
                {producto.categoria.parent_id && nombresCategoriasPrincipales[producto.categoria.parent_id] && (
                  <>
                    <Link to={`/tienda/categoria/${producto.categoria.parent_id}`} className="breadcrumb-link">
                      {nombresCategoriasPrincipales[producto.categoria.parent_id]}
                    </Link>
                    <span className="breadcrumb-separator">›</span>
                  </>
                )}
                <Link to={`/tienda/categoria/${producto.categoria.id}`} className="breadcrumb-link">
                  {producto.categoria.nombre}
                </Link>
                <span className="breadcrumb-separator">›</span>
              </>
            )}

            <span className="breadcrumb-current">{producto.nombre}</span>
          </nav>

          <div className="col-imagenes-wrapper">
            <div className="col-imagenes">
              <div className="galeria-miniaturas">
                <img
                  src={principalReal}
                  className={`miniatura ${imagenActiva === producto.imagen_principal_url ? 'activa' : ''}`}
                  alt="Principal"
                  onMouseEnter={() => setImagenActiva(producto.imagen_principal_url)}
                />
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

            <div className="btn-descargar-container">
              <button className="btn-descargar-ficha" onClick={() => {
                if (producto.ficha_tecnica_url) {
                  window.open(`${urlBase}${producto.ficha_tecnica_url}`, '_blank');
                } else {
                  Swal.fire({
                    icon: 'info',
                    title: 'Sin ficha técnica',
                    text: 'Este producto no cuenta con ficha técnica disponible.',
                    confirmButtonColor: '#0056b3',
                  });
                }
              }}>
                <FileText size={18} /> Descargar ficha técnica
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Info, precio, compras y logística */}
        <div className="col-derecha">
          <div className="info-producto-header">
            <div className="marca-sku-inline">
              <Link to="/tienda" className="producto-marca">
                {producto.categoria?.nombre || 'Categoría'}
              </Link>
            </div>
            <h1 className="producto-titulo">{producto.nombre}</h1>

            <div className="buybox-meta">
              <span className="sku">SKU {producto.sku}</span>
              <span className="divider">|</span>
              <span className="stock-texto">
                Stock disponible: {producto.stock > 0 ? producto.stock : <span style={{ color: '#d32f2f' }}>0</span>}
              </span>
            </div>
          </div>

          <div className="precio-grande-buybox">
            <span className="moneda">S/</span> {Number(producto.precio_regular).toFixed(2)}
            <span className="igv-texto">Inc. IGV</span>
          </div>

          <hr className="separador" />

          {producto.stock > 0 ? (
            <div className="bloque-compras">
              <div className="acciones-fila-1">
                <div className="selector-cantidad-btn">
                  <button onClick={restarCantidad}><Minus size={16} /></button>
                  <span className="numero">{cantidad}</span>
                  <button onClick={sumarCantidad}><Plus size={16} /></button>
                </div>
                <button className="btn-certimet-cart" onClick={agregarAlCarrito}>
                  <ShoppingCart size={18} /> Agregar al carro
                </button>
              </div>

              <div className="acciones-fila-2">
                <button className="btn-whatsapp" onClick={comprarWhatsApp}>
                  <WhatsappIcon /> Comprar por WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <div className="stock-agotado">Agotado temporalmente</div>
          )}

          <hr className="separador" />

          <div className="metodos-pago-container">
            <img src={logoVisa} alt="Visa" />
            <img src={logoPagoEfectivo} alt="Pago Efectivo" />
            <img src={logoMastercard} alt="MasterCard" />
            <img src={logoYape} alt="Yape" />
            <img src={logoPlin} alt="Plin" />
          </div>

          <hr className="separador" />

          <div className="info-logistica-grid">
            <div className="logistica-item">
              <Truck size={24} className="icon-log" />
              <div className="logistica-textos">
                <h4>Envíos</h4>
                <p>Envíos en Lima: 1 a 2 días hábiles</p>
                <p>Envío a Provincia: 2 a 4 días hábiles</p>
              </div>
            </div>
            <div className="logistica-item">
              <Store size={24} className="icon-log" />
              <div className="logistica-textos">
                <h4>Retiro en oficina</h4>
                <p>Lunes a Viernes de 8:30 am - 6:00 p.m</p>
                <p>Sábados de 08:30 am - 11:00 a.m</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN INFERIOR: DESCRIPCIONES (ACORDEÓN) */}
      <div className="secciones-inferiores">

        {producto.descripcion_corta && (
          <div className="seccion-acordeon">
            <div className="acordeon-header" onClick={() => toggleSeccion('descripcion')}>
              <h2>Descripción</h2>
              {seccionesAbiertas.descripcion ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            {seccionesAbiertas.descripcion && (
              <div
                className="acordeon-contenido descripcion-html"
                dangerouslySetInnerHTML={{ __html: limpiarHTML(producto.descripcion_corta) }}
              />
            )}
          </div>
        )}

        {producto.descripcion_detallada && (
          <div className="seccion-acordeon">
            <div className="acordeon-header" onClick={() => toggleSeccion('detallada')}>
              <h2>Descripción Detallada</h2>
              {seccionesAbiertas.detallada ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            {seccionesAbiertas.detallada && (
              <div
                className="acordeon-contenido descripcion-html"
                dangerouslySetInnerHTML={{ __html: limpiarHTML(producto.descripcion_detallada) }}
              />
            )}
          </div>
        )}

        {producto.descripcion_tecnica && (
          <div className="seccion-acordeon">
            <div className="acordeon-header" onClick={() => toggleSeccion('especificaciones')}>
              <h2>Especificaciones</h2>
              {seccionesAbiertas.especificaciones ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            {seccionesAbiertas.especificaciones && (
              <div
                className="acordeon-contenido descripcion-html"
                dangerouslySetInnerHTML={{ __html: limpiarHTML(producto.descripcion_tecnica) }}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductoDetalle;