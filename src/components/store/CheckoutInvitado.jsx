import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserCircle, CheckCircle2 } from 'lucide-react';
import { useCarrito } from '../../context/CarritoContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import './CheckoutInvitado.css'; 

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const CheckoutInvitado = () => {
  const { carrito, loadingCarrito, recargarCarrito } = useCarrito();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    razonSocial: '',     // Campo para Factura / RUC
    direccionFiscal: '', // Campo para Factura / RUC
    direccion: '',
    ciudad: 'Lima',
    codigoPostal: ''
  });

  const [loadingProceso, setLoadingProceso] = useState(false);

  useEffect(() => {
    if (!loadingCarrito && (!carrito.detalles || carrito.detalles.length === 0)) {
      navigate('/tienda/carrito');
    }
  }, [carrito, loadingCarrito, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnviarDatos = async (e) => {
    e.preventDefault();
    setLoadingProceso(true);

    try {
      const session_id = localStorage.getItem('session_id') || null;
      const usuario = localStorage.getItem('usuario');
      const usuario_id = usuario ? JSON.parse(usuario).id : null;

      // Payload para registrar el pedido sin pasarela de pagos
      const payload = {
        usuario_id: usuario_id ? Number(usuario_id) : null,
        session_id: session_id,
        datos_cliente: formData,
        total: carrito.total,
        detalles: carrito.detalles
      };

      // Endpoint de tu backend para registrar el pedido directamente
      const response = await axios.post(`${API_BASE_URL}/api/pedidos/crear-pedido-directo`, payload);
      
      const { pedido_id } = response.data;

      // Alerta de éxito indicando que el área correspondiente se comunicará
      await Swal.fire({
        icon: 'success',
        title: '¡Pedido Registrado con Éxito!',
        html: `Tu código de orden es <b>#${pedido_id || 'N/D'}</b>.<br><br>Hemos recibido tus datos correctamente. El área correspondiente se comunicará contigo a la brevedad.`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0f172a'
      });

      // Limpiamos el carrito localmente o recargamos contexto si lo maneja el backend al registrar
      if (typeof recargarCarrito === 'function') {
        recargarCarrito();
      }

      // Redirigir a la tienda o a una página de gracias
      navigate('/tienda');

    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      const mensajeError = error.response?.data?.error || 'No se pudo registrar el pedido. Intenta nuevamente.';
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensajeError,
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoadingProceso(false);
    }
  };

  if (loadingCarrito) return <div className="checkout-loading">Cargando...</div>;
  if (!carrito.detalles || carrito.detalles.length === 0) return null;

  return (
    <div className="checkout-page-container wrapper">
      {/* HEADER */}
      <div className="checkout-header-nav">
        <Link to="/tienda/carrito" className="btn-volver-carrito">
          <ArrowLeft size={18} /> Volver al Carrito
        </Link>
        <div className="pago-seguro-badge">
          <UserCircle size={18} />
          <span>Solicitud de Cotización / Pedido</span>
        </div>
      </div>

      <div className="checkout-layout">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="checkout-form-section">
          <div className="form-box">
            <h2>Datos de Contacto y Envío</h2>
            <p className="form-subtitle">Ingresa tus datos. Un asesor se comunicará contigo para coordinar el pago y la entrega.</p>
            
            <form onSubmit={handleEnviarDatos} className="checkout-form">
              
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
                    maxLength={formData.tipoDocumento === 'RUC' ? 11 : 15}
                    required 
                  />
                </div>
              </div>

              {/* CAMPOS CONDICIONALES PARA RUC */}
              {formData.tipoDocumento === 'RUC' && (
                <>
                  <div className="input-group slide-down">
                    <label>Razón Social</label>
                    <input 
                      type="text" 
                      name="razonSocial" 
                      value={formData.razonSocial} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="input-group slide-down">
                    <label>Dirección Fiscal</label>
                    <input 
                      type="text" 
                      name="direccionFiscal" 
                      value={formData.direccionFiscal} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </>
              )}

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

              <button type="submit" className="btn-confirmar-datos" disabled={loadingProceso}>
                {loadingProceso ? 'Registrando solicitud...' : 'Enviar Solicitud'}
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
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
              <div className="sum-row">
                <span>Subtotal</span>
                <span>S/ {Number(carrito.subtotal).toFixed(2)}</span>
              </div>
              <div className="sum-row">
                <span>Envío</span>
                <span className="sum-envio-calc">Por coordinar</span>
              </div>
              <div className="sum-row total-row">
                <span>Total Estimado</span>
                <span>S/ {Number(carrito.total).toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-aviso-atencion">
              <CheckCircle2 size={20} color="#00c652" />
              <p>No se realizará ningun cobro en línea. Un asesor validará stock y se pondrá en contacto contigo.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutInvitado;