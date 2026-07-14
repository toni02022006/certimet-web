// src/components/store/Checkout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, CreditCard, Truck, MapPin, User, Mail, Phone, FileText } from 'lucide-react';
import './Checkout.css';

// Lista de métodos de pago
const METODOS_PAGO = [
  { id: 'visa', label: 'Visa', icon: '💳' },
  { id: 'mastercard', label: 'Mastercard', icon: '💳' },
  { id: 'amex', label: 'American Express', icon: '💳' },
  { id: 'diners', label: 'Diners Club', icon: '💳' },
  { id: 'pagoefectivo', label: 'PagoEfectivo', icon: '🏦' },
  { id: 'transferencia', label: 'Transferencia Bancaria', icon: '🏦' },
  { id: 'yape', label: 'Yape', icon: '📱' },
  { id: 'plin', label: 'Plin', icon: '📱' },
];

// Métodos que requieren tarjeta
const METODOS_TARJETA = ['visa', 'mastercard', 'amex', 'diners'];

const Checkout = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [ordenId, setOrdenId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Datos del formulario
  const [direccion, setDireccion] = useState({
    titulo: '',
    direccion: '',
    distrito: '',
    provincia: '',
    codigo_postal: '',
    referencia: ''
  });

  // ========== NUEVO: TIPO DE COMPROBANTE ==========
  const [tipoComprobante, setTipoComprobante] = useState('boleta'); // 'boleta' | 'factura'
  const [datosFactura, setDatosFactura] = useState({
    ruc: '',
    razonSocial: '',
    direccionFiscal: ''
  });

  const [metodoPago, setMetodoPago] = useState('');
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    expiracion: '',
    cvv: '',
    titular: ''
  });

  // Referencia para el input de fecha
  const fechaInputRef = useRef(null);

  // Cargar usuario, carrito y dirección
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (!token || !user) {
      navigate('/tienda/login?returnTo=/tienda/checkout');
      return;
    }
    setUsuario(user);

    const items = JSON.parse(localStorage.getItem('carrito') || '[]');
    if (items.length === 0) {
      navigate('/tienda');
      return;
    }
    setCarrito(items);

    // Cargar dirección guardada en localStorage o desde el backend
    const cargarDireccion = async () => {
      let dirGuardada = JSON.parse(localStorage.getItem('direccion_envio') || 'null');
      if (dirGuardada) {
        setDireccion(dirGuardada);
        return;
      }

      // Si no hay dirección guardada, intentar obtener del backend
      try {
        const res = await fetch('http://localhost:3000/api/usuario/direcciones', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const direcciones = await res.json();
          if (direcciones.length > 0) {
            const primeraDir = direcciones[0];
            const dir = {
              titulo: primeraDir.titulo || '',
              direccion: primeraDir.direccion || '',
              distrito: primeraDir.distrito || '',
              provincia: primeraDir.provincia || '',
              codigo_postal: primeraDir.codigo_postal || '',
              referencia: primeraDir.referencia || ''
            };
            setDireccion(dir);
            localStorage.setItem('direccion_envio', JSON.stringify(dir));
          }
        }
      } catch (error) {
        console.error('Error cargando direcciones del usuario:', error);
      }
    };

    cargarDireccion();
  }, [navigate]);

  // Formatear número de tarjeta
  const formatearNumeroTarjeta = (value) => {
    const digitos = value.replace(/\D/g, '');
    const grupos = digitos.match(/.{1,4}/g);
    return grupos ? grupos.join(' ') : digitos;
  };

  // Manejar cambio de tarjeta
  const handleTarjetaChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numero') {
      setTarjeta({ ...tarjeta, numero: formatearNumeroTarjeta(value) });
    } else if (name === 'expiracion') {
      let val = value.replace(/\D/g, '');
      if (val.length >= 2) {
        val = val.slice(0, 2) + '/' + val.slice(2, 4);
      }
      setTarjeta({ ...tarjeta, expiracion: val });
    } else {
      setTarjeta({ ...tarjeta, [name]: value });
    }
  };

  // Manejar dirección
  const handleDireccionChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  // ========== NUEVO: Manejar datos de factura ==========
  const handleFacturaChange = (e) => {
    const { name, value } = e.target;
    setDatosFactura({ ...datosFactura, [name]: value });
  };

  // Validar dirección
  const validarDireccion = () => {
    if (!direccion.direccion.trim() || !direccion.distrito.trim() || !direccion.provincia.trim()) {
      setError('Completa todos los campos obligatorios (dirección, distrito, provincia)');
      return false;
    }
    setError('');
    return true;
  };

  const handleDireccionSubmit = (e) => {
    e.preventDefault();
    if (validarDireccion()) {
      localStorage.setItem('direccion_envio', JSON.stringify(direccion));
      setPaso(2);
    }
  };

  // Validar pago (incluye validación de factura si aplica)
  const validarPago = () => {
    // Validar tipo de comprobante
    if (tipoComprobante === 'factura') {
      if (!/^\d{11}$/.test(datosFactura.ruc.replace(/\s/g, ''))) {
        setError('Ingresa un RUC válido (11 dígitos)');
        return false;
      }
      if (!datosFactura.razonSocial.trim()) {
        setError('Ingresa la Razón Social');
        return false;
      }
      if (!datosFactura.direccionFiscal.trim()) {
        setError('Ingresa la Dirección Fiscal');
        return false;
      }
    }

    if (!metodoPago) {
      setError('Selecciona un método de pago');
      return false;
    }
    if (METODOS_TARJETA.includes(metodoPago)) {
      const num = tarjeta.numero.replace(/\s/g, '');
      if (!/^\d{15,16}$/.test(num)) {
        setError('Número de tarjeta inválido (debe tener 15 o 16 dígitos)');
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(tarjeta.expiracion)) {
        setError('Fecha de expiración inválida (MM/AA)');
        return false;
      }
      if (!/^\d{3,4}$/.test(tarjeta.cvv)) {
        setError('CVV inválido (3 o 4 dígitos)');
        return false;
      }
      if (!tarjeta.titular.trim()) {
        setError('Ingresa el nombre del titular');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handlePagoSubmit = (e) => {
    e.preventDefault();
    if (validarPago()) {
      setPaso(3);
    }
  };

  // Confirmar compra
  const confirmarCompra = () => {
    setCargando(true);
    setTimeout(() => {
      const num = Math.floor(Math.random() * 1000000);
      setOrdenId(`CERT-${String(num).padStart(6, '0')}`);
      localStorage.removeItem('carrito');
      localStorage.removeItem('direccion_envio');
      window.dispatchEvent(new Event('carritoActualizado'));
      setCargando(false);
      setPaso(4);
    }, 1800);
  };

  // Navegación
  const irAtras = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  // Calcular totales
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const envio = subtotal > 500 ? 0 : 20;
  const total = subtotal + envio;

  // Renderizar paso
  const renderPaso = () => {
    switch (paso) {
      case 1: return renderDireccion();
      case 2: return renderPago();
      case 3: return renderConfirmacion();
      case 4: return renderExito();
      default: return null;
    }
  };

  // ===== PASO 1: DIRECCIÓN =====
  const renderDireccion = () => (
    <div className="checkout-paso">
      <h2>Dirección de envío</h2>
      <form onSubmit={handleDireccionSubmit} className="checkout-form">
        <div className="form-group">
          <label>Título (ej. Casa, Oficina)</label>
          <input
            type="text"
            name="titulo"
            value={direccion.titulo}
            onChange={handleDireccionChange}
            placeholder="Casa"
          />
        </div>
        <div className="form-group">
          <label>Dirección *</label>
          <input
            type="text"
            name="direccion"
            value={direccion.direccion}
            onChange={handleDireccionChange}
            placeholder="Av. Canadá 3263"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Distrito *</label>
            <input
              type="text"
              name="distrito"
              value={direccion.distrito}
              onChange={handleDireccionChange}
              placeholder="San Luis"
              required
            />
          </div>
          <div className="form-group">
            <label>Provincia *</label>
            <input
              type="text"
              name="provincia"
              value={direccion.provincia}
              onChange={handleDireccionChange}
              placeholder="Lima"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Código postal</label>
            <input
              type="text"
              name="codigo_postal"
              value={direccion.codigo_postal}
              onChange={handleDireccionChange}
              placeholder="15021"
            />
          </div>
          <div className="form-group">
            <label>Referencia</label>
            <input
              type="text"
              name="referencia"
              value={direccion.referencia}
              onChange={handleDireccionChange}
              placeholder="Cerca al metro"
            />
          </div>
        </div>
        {error && <div className="checkout-error">{error}</div>}
        <div className="checkout-actions">
          <button type="button" className="btn-atras" onClick={() => navigate('/tienda/carrito')}>
            <ChevronLeft size={18} /> Volver al carrito
          </button>
          <button type="submit" className="btn-continuar">
            Continuar <ChevronRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );

  // ===== PASO 2: MÉTODO DE PAGO (con selección de comprobante) =====
  const renderPago = () => (
    <div className="checkout-paso">
      <h2>Método de pago</h2>

      {/* ========== NUEVO: TIPO DE COMPROBANTE ========== */}
      <div className="tipo-comprobante-section">
        <h4><FileText size={18} /> Tipo de comprobante</h4>
        <div className="comprobante-options">
          <div
            className={`comprobante-option ${tipoComprobante === 'boleta' ? 'seleccionado' : ''}`}
            onClick={() => {
              setTipoComprobante('boleta');
              setError('');
            }}
          >
            <span className="comprobante-icon">🧾</span>
            <span className="comprobante-label">Boleta</span>
            {tipoComprobante === 'boleta' && <CheckCircle size={16} className="check-ok" />}
          </div>
          <div
            className={`comprobante-option ${tipoComprobante === 'factura' ? 'seleccionado' : ''}`}
            onClick={() => {
              setTipoComprobante('factura');
              setError('');
            }}
          >
            <span className="comprobante-icon">📄</span>
            <span className="comprobante-label">Factura</span>
            {tipoComprobante === 'factura' && <CheckCircle size={16} className="check-ok" />}
          </div>
        </div>

        {/* Campos para Factura (condicionales) */}
        {tipoComprobante === 'factura' && (
          <div className="datos-factura animated-fade">
            <div className="form-row">
              <div className="form-group">
                <label>RUC *</label>
                <input
                  type="text"
                  name="ruc"
                  value={datosFactura.ruc}
                  onChange={handleFacturaChange}
                  placeholder="20123456789"
                  maxLength="11"
                />
              </div>
              <div className="form-group">
                <label>Razón Social *</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={datosFactura.razonSocial}
                  onChange={handleFacturaChange}
                  placeholder="CERTIMET S.A.C."
                />
              </div>
            </div>
            <div className="form-group">
              <label>Dirección Fiscal *</label>
              <input
                type="text"
                name="direccionFiscal"
                value={datosFactura.direccionFiscal}
                onChange={handleFacturaChange}
                placeholder="Av. Canadá 3263, San Luis"
              />
            </div>
          </div>
        )}
      </div>

      {/* Métodos de pago */}
      <div className="metodos-grid">
        {METODOS_PAGO.map(metodo => (
          <div
            key={metodo.id}
            className={`metodo-item ${metodoPago === metodo.id ? 'seleccionado' : ''}`}
            onClick={() => {
              setMetodoPago(metodo.id);
              setError('');
            }}
          >
            <span className="metodo-icon">{metodo.icon}</span>
            <span className="metodo-label">{metodo.label}</span>
            {metodoPago === metodo.id && <CheckCircle size={16} className="check-ok" />}
          </div>
        ))}
      </div>

      {metodoPago && METODOS_TARJETA.includes(metodoPago) && (
        <div className="datos-tarjeta">
          <h4><CreditCard size={18} /> Datos de la tarjeta</h4>
          <div className="form-group">
            <label>Número de tarjeta</label>
            <input
              type="text"
              name="numero"
              value={tarjeta.numero}
              onChange={handleTarjetaChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="tarjeta-input"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha expiración (MM/AA)</label>
              <div className="fecha-wrapper">
                <input
                  type="text"
                  name="expiracion"
                  value={tarjeta.expiracion}
                  onChange={handleTarjetaChange}
                  placeholder="12/25"
                  maxLength="5"
                  ref={fechaInputRef}
                />
                <button
                  type="button"
                  className="btn-calendario"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'month';
                    input.style.display = 'none';
                    document.body.appendChild(input);
                    input.addEventListener('change', (e) => {
                      const val = e.target.value;
                      if (val) {
                        const [year, month] = val.split('-');
                        setTarjeta({ ...tarjeta, expiracion: `${month}/${year.slice(-2)}` });
                      }
                      document.body.removeChild(input);
                    });
                    if (input.showPicker) {
                      input.showPicker();
                    } else {
                      input.click();
                    }
                  }}
                >
                  📅
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                value={tarjeta.cvv}
                onChange={handleTarjetaChange}
                placeholder="123"
                maxLength="4"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Titular</label>
            <input
              type="text"
              name="titular"
              value={tarjeta.titular}
              onChange={handleTarjetaChange}
              placeholder="Como aparece en la tarjeta"
            />
          </div>
        </div>
      )}

      {metodoPago && !METODOS_TARJETA.includes(metodoPago) && (
        <div className="datos-pago-sin-tarjeta">
          <p>Serás redirigido a la pasarela para completar el pago.</p>
          <p><strong>Simulación:</strong> Se generará un comprobante de pago.</p>
        </div>
      )}

      {error && <div className="checkout-error">{error}</div>}
      <div className="checkout-actions">
        <button type="button" className="btn-atras" onClick={irAtras}>
          <ChevronLeft size={18} /> Atrás
        </button>
        <button type="button" className="btn-continuar" onClick={handlePagoSubmit}>
          Continuar <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  // ===== PASO 3: CONFIRMACIÓN (incluye datos de factura) =====
  const renderConfirmacion = () => {
    const metodoLabel = METODOS_PAGO.find(m => m.id === metodoPago)?.label || metodoPago;
    const comprobanteLabel = tipoComprobante === 'boleta' ? 'Boleta' : 'Factura';

    return (
      <div className="checkout-paso confirmacion">
        <h2>Confirmar pedido</h2>
        <div className="confirmacion-grid">
          {/* COLUMNA IZQUIERDA: DATOS DEL CLIENTE */}
          <div className="confirmacion-datos">
            <h4><User size={18} /> Datos del cliente</h4>
            <div className="dato-linea">
              <User size={16} />
              <span><strong>Nombre:</strong> {usuario?.nombre} {usuario?.apellidos}</span>
            </div>
            <div className="dato-linea">
              <Mail size={16} />
              <span><strong>Correo:</strong> {usuario?.correo}</span>
            </div>
            <div className="dato-linea">
              <Phone size={16} />
              <span><strong>Teléfono:</strong> {usuario?.telefono || 'No registrado'}</span>
            </div>

            <h4 style={{ marginTop: '20px' }}><MapPin size={18} /> Dirección de envío</h4>
            <div className="dato-linea">
              <span className="dato-label">Dirección:</span>
              <span>{direccion.direccion}</span>
            </div>
            <div className="dato-linea">
              <span className="dato-label">Distrito:</span>
              <span>{direccion.distrito}</span>
            </div>
            <div className="dato-linea">
              <span className="dato-label">Provincia:</span>
              <span>{direccion.provincia}</span>
            </div>
            {direccion.codigo_postal && (
              <div className="dato-linea">
                <span className="dato-label">Código postal:</span>
                <span>{direccion.codigo_postal}</span>
              </div>
            )}
            {direccion.referencia && (
              <div className="dato-linea">
                <span className="dato-label">Referencia:</span>
                <span>{direccion.referencia}</span>
              </div>
            )}

            <h4 style={{ marginTop: '20px' }}><FileText size={18} /> Comprobante</h4>
            <div className="dato-linea">
              <span className="dato-label">Tipo:</span>
              <span>{comprobanteLabel}</span>
            </div>
            {tipoComprobante === 'factura' && (
              <>
                <div className="dato-linea">
                  <span className="dato-label">RUC:</span>
                  <span>{datosFactura.ruc}</span>
                </div>
                <div className="dato-linea">
                  <span className="dato-label">Razón Social:</span>
                  <span>{datosFactura.razonSocial}</span>
                </div>
                <div className="dato-linea">
                  <span className="dato-label">Dirección Fiscal:</span>
                  <span>{datosFactura.direccionFiscal}</span>
                </div>
              </>
            )}

            <h4 style={{ marginTop: '20px' }}><CreditCard size={18} /> Método de pago</h4>
            <div className="dato-linea">
              <span className="dato-label">Método:</span>
              <span>{metodoLabel}</span>
            </div>
            {METODOS_TARJETA.includes(metodoPago) && (
              <div className="dato-linea">
                <span className="dato-label">Tarjeta:</span>
                <span>•••• {tarjeta.numero.slice(-4)}</span>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: PRODUCTOS */}
          <div className="confirmacion-productos">
            <h4><Truck size={18} /> Productos</h4>
            {carrito.map(item => (
              <div key={item.id} className="confirmacion-item">
                <span className="item-nombre">
                  {item.nombre} <span className="item-cantidad">x{item.cantidad}</span>
                </span>
                <span className="item-precio">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <div className="confirmacion-subtotal">
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="confirmacion-envio">
              <span>Envío</span>
              <span>{envio === 0 ? 'Gratis' : `S/ ${envio.toFixed(2)}`}</span>
            </div>
            <div className="confirmacion-total">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="checkout-actions">
          <button type="button" className="btn-atras" onClick={irAtras}>
            <ChevronLeft size={18} /> Atrás
          </button>
          <button type="button" className="btn-confirmar" onClick={confirmarCompra} disabled={cargando}>
            {cargando ? 'Procesando...' : 'Confirmar compra'}
          </button>
        </div>
      </div>
    );
  };

  // ===== PASO 4: ÉXITO =====
  const renderExito = () => (
    <div className="checkout-paso exito">
      <div className="exito-icon">✅</div>
      <h2>¡Compra exitosa!</h2>
      <p>Tu pedido ha sido registrado con el número:</p>
      <h3 className="orden-id">{ordenId}</h3>
      <p>Te enviaremos un correo con los detalles de tu compra.</p>
      <div className="exito-actions">
        <Link to="/tienda" className="btn-seguir">Seguir comprando</Link>
        <Link to="/tienda/cuenta" className="btn-ver-pedidos">Ver mis pedidos</Link>
      </div>
    </div>
  );

  // Barra de progreso
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          {['Dirección', 'Pago', 'Confirmar', 'Éxito'].map((label, index) => {
            const num = index + 1;
            const isActive = paso >= num;
            const isCompleted = paso > num;
            return (
              <div key={num} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-circle">{isCompleted ? '✓' : num}</div>
                <span className="step-label">{label}</span>
                {num < 4 && <div className="step-line" />}
              </div>
            );
          })}
        </div>
      </div>
      {renderPaso()}
    </div>
  );
};

export default Checkout;