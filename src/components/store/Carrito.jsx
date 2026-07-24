import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCarrito } from '../../context/CarritoContext';
import './Carrito.css'; 

// ✅ URL base específica para las imágenes (sin /api) para evitar el error 404
const IMAGE_BASE_URL = 'http://localhost:3000';

// URL de la API por si la necesitas para otras peticiones (opcional en este archivo)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Carrito = () => {
  const { carrito, loadingCarrito, actualizarCantidad, eliminarProducto } = useCarrito();
  const navigate = useNavigate();

  // ✅ Estado para controlar el modal de autenticación
  const [mostrarModalAuth, setMostrarModalAuth] = useState(false);

  // ✅ Función para manejar el clic en "Proceder al Pago"
  const handleProcederPago = () => {
    // Validamos si hay un token o usuario en localStorage (ajusta la key según tu proyecto)
    const token = localStorage.getItem('token'); 
    
    if (token) {
      // Si está logueado, va al checkout normal
      navigate('/tienda/checkout');
    } else {
      // Si no, mostramos el modal de opciones
      setMostrarModalAuth(true);
    }
  };

  if (loadingCarrito) {
    return (
      <div className="carrito-loading">
        <div className="spinner"></div>
        <h2>Cargando tu carrito...</h2>
      </div>
    );
  }

  if (!carrito.detalles || carrito.detalles.length === 0) {
    return (
      <div className="carrito-vacio-container wrapper">
        <ShoppingBag size={80} className="icono-vacio" />
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has agregado productos a tu carrito de compras.</p>
        <Link to="/tienda/catalogo" className="btn-volver-tienda">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="carrito-page-container wrapper">
      <div className="carrito-header">
        <h1>Mi Carrito de Compras</h1>
        <Link to="/tienda/catalogo" className="link-seguir-comprando">
          <ArrowLeft size={18} /> Seguir comprando
        </Link>
      </div>

      <div className="carrito-layout">
        {/* COLUMNA IZQUIERDA: Lista de Productos */}
        <div className="carrito-lista">
          <div className="carrito-table-header">
            <span className="col-producto">Producto</span>
            <span className="col-precio">Precio</span>
            <span className="col-cantidad">Cantidad</span>
            <span className="col-subtotal">Subtotal</span>
            <span className="col-acciones"></span>
          </div>

          <div className="carrito-items-wrapper">
            {carrito.detalles.map((item) => {
              
              // 👇 1. PROTECCIÓN DE PRECIOS: Buscamos el precio donde esté disponible
              const precioSeguro = item.precio_unitario || item.producto?.precio_oferta || item.producto?.precio_regular || 0;
              const subtotalSeguro = item.subtotal || (precioSeguro * item.cantidad) || 0;

              return (
                <div key={item.id} className="carrito-item-row">
                  <div className="item-info col-producto">
                    <img 
                      src={
                        item.producto?.imagen_principal_url 
                          // Usamos IMAGE_BASE_URL para construir la ruta correcta
                          ? `${IMAGE_BASE_URL}${item.producto.imagen_principal_url}` 
                          : 'https://via.placeholder.com/80?text=Sin+Imagen'
                      } 
                      alt={item.producto?.nombre} 
                      className="item-img"
                      // 👇 2. PROTECCIÓN DEL BUCLE INFINITO
                      onError={(e) => { 
                        // Verificamos si ya intentamos cambiar la imagen para evitar el bucle
                        if (!e.target.dataset.error) {
                          e.target.dataset.error = true;
                          // Usamos un SVG en base64 que NUNCA fallará por red
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+'; 
                        }
                      }}
                    />
                    <div className="item-details">
                      <Link to={`/producto/${item.producto?.id}`} className="item-name">
                        {item.producto?.nombre || 'Producto sin nombre'}
                      </Link>
                      <span className="item-sku">SKU: {item.producto?.sku || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="item-precio col-precio">
                    <span className="mobile-label">Precio:</span>
                    S/ {Number(precioSeguro).toFixed(2)}
                  </div>

                  <div className="item-cantidad col-cantidad">
                    <span className="mobile-label">Cantidad:</span>
                    <div className="selector-cantidad-btn">
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                        className="btn-minus-plus"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="numero">{item.cantidad}</span>
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="btn-minus-plus"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="item-subtotal-calc col-subtotal">
                    <span className="mobile-label">Subtotal:</span>
                    S/ {Number(subtotalSeguro).toFixed(2)}
                  </div>

                  <div className="item-acciones col-acciones">
                    <button 
                      className="btn-eliminar-item" 
                      onClick={() => eliminarProducto(item.id)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: Resumen de Compra */}
        <div className="carrito-resumen">
          <h3>Resumen del Pedido</h3>
          
          <div className="resumen-fila">
            <span>Subtotal ({carrito.detalles.reduce((acc, i) => acc + i.cantidad, 0)} productos)</span>
            <span>S/ {Number(carrito.subtotal).toFixed(2)}</span>
          </div>
          
          {Number(carrito.descuento) > 0 && (
            <div className="resumen-fila descuento">
              <span>Descuento</span>
              <span>- S/ {Number(carrito.descuento).toFixed(2)}</span>
            </div>
          )}

          <div className="resumen-fila total">
            <span>Total a Pagar</span>
            <span>S/ {Number(carrito.total).toFixed(2)}</span>
          </div>

          <p className="resumen-igv-nota">Los precios incluyen IGV</p>

          {/* ✅ NUEVO: Botón actualizado con el evento onClick de validación */}
          <button 
            className="btn-proceder-pago"
            onClick={handleProcederPago}
          >
            Proceder al Pago
          </button>

          <div className="metodos-pago-seguro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <p>Pago 100% seguro con Mercado Pago</p>
          </div>
        </div>
      </div>

      {/* ✅ NUEVO: Modal para usuarios que no han iniciado sesión */}
      {mostrarModalAuth && (
        <div className="modal-overlay" style={modalStyles.overlay}>
          <div className="modal-content" style={modalStyles.content}>
            <h3 style={modalStyles.title}>¿Cómo deseas continuar?</h3>
            <p style={modalStyles.text}>Para finalizar tu compra de forma segura, selecciona una opción:</p>
            
            <div style={modalStyles.botones}>
              <button 
                style={modalStyles.btnInvitado} 
                onClick={() => navigate('/tienda/checkout-invitado')}
              >
                Continuar como Invitado
              </button>
              
              <div style={modalStyles.divisor}>
                <span style={modalStyles.linea}></span>
                <span style={modalStyles.oText}>O</span>
                <span style={modalStyles.linea}></span>
              </div>

              <button 
                style={modalStyles.btnSecundario} 
                onClick={() => navigate('/tienda/login?redirect=checkout')}
              >
                Iniciar Sesión
              </button>
              <button 
                style={modalStyles.btnSecundario} 
                onClick={() => navigate('/tienda/registro')}
              >
                Crear una Cuenta
              </button>
            </div>
            
            <button 
              style={modalStyles.btnCerrar} 
              onClick={() => setMostrarModalAuth(false)}
            >
              Cancelar y volver al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos en línea para el modal (los mantenemos aquí para no afectar tu CSS global)
const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
  },
  content: {
    backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px',
    width: '90%', maxWidth: '420px', textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  title: { margin: '0 0 10px 0', fontSize: '1.4rem', color: '#333' },
  text: { color: '#666', fontSize: '0.95rem', marginBottom: '25px' },
  botones: { display: 'flex', flexDirection: 'column', gap: '12px' },
  btnInvitado: {
    backgroundColor: '#0056b3', color: '#fff', padding: '14px', border: 'none',
    borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
    transition: 'background-color 0.3s'
  },
  divisor: {
    display: 'flex', alignItems: 'center', margin: '15px 0', color: '#888'
  },
  linea: { flex: 1, height: '1px', backgroundColor: '#e0e0e0' },
  oText: { padding: '0 10px', fontSize: '0.9rem' },
  btnSecundario: {
    backgroundColor: '#fff', color: '#333', padding: '12px', border: '1px solid #ccc',
    borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem',
    transition: 'all 0.3s'
  },
  btnCerrar: {
    marginTop: '25px', background: 'none', border: 'none', color: '#888',
    cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline'
  }
};

export default Carrito;