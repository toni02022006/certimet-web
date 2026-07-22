import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Truck, CreditCard } from 'lucide-react';
import { useCarrito } from '../../context/CarritoContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './Checkout.css';

// ✅ Constante única para la URL del backend (misma que Carrito.jsx y ProductoDetalle.jsx)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ✅ Public Key tomada de .env, no hardcodeada
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-PE' });

const Checkout = () => {
  const { carrito, loadingCarrito } = useCarrito();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    direccion: '',
    ciudad: 'Lima',
    codigoPostal: ''
  });

  const [loadingPago, setLoadingPago] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loadingCarrito && (!carrito.detalles || carrito.detalles.length === 0)) {
      navigate('/tienda/carrito');
    }
  }, [carrito, loadingCarrito, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerarPago = async (e) => {
    e.preventDefault();
    setLoadingPago(true);
    setError('');

    try {
      const usuario = localStorage.getItem('usuario');
      const usuario_id = usuario ? JSON.parse(usuario).id : null;
      const session_id = localStorage.getItem('session_id');

      const response = await fetch(`${API_BASE_URL}/api/pedidos/crear-preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id,
          session_id,
          datos_cliente: formData,
          total: carrito.total
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al procesar el pago');
      if (data.id) {
        setPreferenceId(data.id);
      } else {
        throw new Error('No se recibió el ID de preferencia');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingPago(false);
    }
  };

  if (loadingCarrito) return <div className="checkout-loading">Cargando...</div>;
  if (!carrito.detalles || carrito.detalles.length === 0) return null;

  return (
    <div className="checkout-page-container wrapper">
      <div className="checkout-header-nav">
        <Link to="/tienda/carrito" className="btn-volver-carrito">
          <ArrowLeft size={18} /> Volver al Carrito
        </Link>
        <div className="pago-seguro-badge">
          <ShieldCheck size={20} color="#00c652" />
          <span>Checkout Seguro</span>
        </div>
      </div>

      <div className="checkout-layout">
        {/* Columna izquierda – formulario */}
        <div className="checkout-form-section">
          <div className="form-box">
            <h2>1. Datos de Facturación y Envío</h2>
            <p className="form-subtitle">Ingresa tus datos para generar el comprobante y el envío.</p>
            {error && <div className="checkout-error-msg">{error}</div>}

            {preferenceId ? (
              <div className="checkout-success-step">
                <ShieldCheck size={48} color="#00c652" />
                <h3>¡Datos confirmados!</h3>
                <p>Procede con el pago en la sección derecha usando Mercado Pago.</p>
              </div>
            ) : (
              <form onSubmit={handleGenerarPago} className="checkout-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Apellidos</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Teléfono / Celular</label>
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row doc-row">
                  <div className="input-group doc-type">
                    <label>Doc.</label>
                    <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CE">C.E.</option>
                    </select>
                  </div>
                  <div className="input-group doc-num">
                    <label>Número de Documento</label>
                    <input 
                      type="text" 
                      name="numeroDocumento" 
                      value={formData.numeroDocumento} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Dirección de Envío</label>
                  <input type="text" name="direccion" placeholder="Ej: Av. Canadá 3263, San Luis" value={formData.direccion} onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Ciudad / Distrito</label>
                    <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Código Postal (Opcional)</label>
                    <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
                  </div>
                </div>

                <button type="submit" className="btn-confirmar-datos" disabled={loadingPago}>
                  {loadingPago ? 'Procesando...' : 'Confirmar Datos y Continuar'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Columna derecha – resumen y botón MP */}
        <div className="checkout-summary-section">
          <div className="summary-box">
            <h2>Resumen de la Orden</h2>
            <div className="summary-items-list">
              {carrito.detalles.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="sum-item-info">
                    <span className="sum-item-qty">{item.cantidad}x</span>
                    <span className="sum-item-name">{item.producto.nombre}</span>
                  </div>
                  <span className="sum-item-price">
                    S/ {Number((item.producto.precio_oferta || item.producto.precio_regular) * item.cantidad).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="sum-row"><span>Subtotal</span><span>S/ {Number(carrito.subtotal).toFixed(2)}</span></div>
              <div className="sum-row"><span>Envío</span><span className="sum-envio-calc">Por calcular</span></div>
              <div className="sum-row total-row"><span>Total a Pagar</span><span>S/ {Number(carrito.total).toFixed(2)}</span></div>
            </div>

            {/* Botón de Mercado Pago */}
            <div className="mercado-pago-container">
              {!preferenceId ? (
                <div className="mp-waiting-state">
                  <CreditCard size={32} color="#ccc" />
                  <p>Completa tus datos para habilitar el pago</p>
                </div>
              ) : (
                <div className="mp-active-state">
                  <h4>2. Realiza tu pago</h4>
                  <p className="mp-instruccion">Serás redirigido a la pasarela segura de Mercado Pago.</p>
                  <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: 'security_safety' } }}
                  />
                </div>
              )}
            </div>

            <div className="checkout-features">
              <div className="feat-item"><Truck size={18} /><span>Envíos a todo el Perú</span></div>
              <div className="feat-item"><ShieldCheck size={18} /><span>Garantía Certimet</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;