// src/components/store/Carrito.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, CheckSquare, Square, Shield, Wrench } from 'lucide-react';
import './Carrito.css';

const Carrito = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // ids de productos seleccionados
  const [extras, setExtras] = useState({}); // { productId: { garantia: bool, calibracion: bool } }

  // Cargar carrito desde localStorage y restaurar selecciones previas
  useEffect(() => {
    const cargarCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      setItems(carrito);

      // Si no hay selecciones previas, seleccionar todos por defecto
      const storedSelected = JSON.parse(localStorage.getItem('selectedItems') || 'null');
      if (storedSelected && Array.isArray(storedSelected)) {
        setSelectedItems(new Set(storedSelected));
      } else {
        const allIds = carrito.map(item => item.id);
        setSelectedItems(new Set(allIds));
        localStorage.setItem('selectedItems', JSON.stringify(allIds));
      }

      // Cargar extras guardados
      const storedExtras = JSON.parse(localStorage.getItem('extras') || '{}');
      setExtras(storedExtras);
    };

    cargarCarrito();

    // Escuchar cambios en el storage (cuando se agrega desde otro componente)
    const handleStorageChange = () => {
      cargarCarrito();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Guardar selecciones y extras en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(Array.from(selectedItems)));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem('extras', JSON.stringify(extras));
  }, [extras]);

  const calcularTotal = () => {
    let subtotal = 0;
    let envio = 0;
    let cantidadProductos = 0;

    items.forEach(item => {
      if (selectedItems.has(item.id)) {
        const precioBase = item.precio * item.cantidad;
        const extraGarantia = extras[item.id]?.garantia ? 50 : 0;
        const extraCalibracion = extras[item.id]?.calibracion ? 30 : 0;
        subtotal += precioBase + extraGarantia + extraCalibracion;
        cantidadProductos += item.cantidad;
      }
    });

    // Simulación: envío gratis sobre S/ 500
    envio = subtotal > 500 ? 0 : 20;

    return { subtotal, envio, total: subtotal + envio, cantidadProductos };
  };

  const { subtotal, envio, total, cantidadProductos } = calcularTotal();

  // Toggle selección de producto
  const toggleSeleccion = (id) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedItems(newSet);
  };

  // Toggle extra (garantía o calibración) para un producto
  const toggleExtra = (id, tipo) => {
    setExtras(prev => {
      const productExtras = prev[id] || { garantia: false, calibracion: false };
      return {
        ...prev,
        [id]: {
          ...productExtras,
          [tipo]: !productExtras[tipo]
        }
      };
    });
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const index = carritoActual.findIndex(item => item.id === id);
    if (index !== -1) {
      if (nuevaCantidad > carritoActual[index].stock) {
        alert('No hay suficiente stock');
        return;
      }
      carritoActual[index].cantidad = nuevaCantidad;
      localStorage.setItem('carrito', JSON.stringify(carritoActual));
      setItems(carritoActual);
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Eliminar producto del carrito (permanentemente)
  const eliminarProducto = (id) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const nuevoCarrito = carritoActual.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setItems(nuevoCarrito);
    // Quitar de selecciones y extras
    const newSelected = new Set(selectedItems);
    newSelected.delete(id);
    setSelectedItems(newSelected);
    const newExtras = { ...extras };
    delete newExtras[id];
    setExtras(newExtras);
    window.dispatchEvent(new Event('storage'));
  };

  // Vaciar carrito (eliminar todos los productos)
  const vaciarCarrito = () => {
    if (items.length === 0) return;
    if (window.confirm('¿Estás seguro de vaciar el carrito? Se eliminarán todos los productos.')) {
      localStorage.setItem('carrito', '[]');
      setItems([]);
      setSelectedItems(new Set());
      setExtras({});
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Seleccionar o deseleccionar todos
  const seleccionarTodos = (seleccionar) => {
    if (seleccionar) {
      const allIds = items.map(item => item.id);
      setSelectedItems(new Set(allIds));
    } else {
      setSelectedItems(new Set());
    }
  };

  // Verificar si todos están seleccionados
  const todosSeleccionados = items.length > 0 && items.every(item => selectedItems.has(item.id));

  // Redirigir a checkout con los productos seleccionados
  const irCheckout = () => {
    if (selectedItems.size === 0) {
      alert('Selecciona al menos un producto para continuar');
      return;
    }
    // Guardar los productos seleccionados en localStorage temporal para checkout
    const productosSeleccionados = items.filter(item => selectedItems.has(item.id));
    // También guardar los extras correspondientes
    const productosConExtras = productosSeleccionados.map(item => ({
      ...item,
      extras: extras[item.id] || { garantia: false, calibracion: false }
    }));
    localStorage.setItem('checkoutItems', JSON.stringify(productosConExtras));

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para continuar');
      navigate('/tienda/login?returnTo=/tienda/checkout');
      return;
    }
    navigate('/tienda/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="carrito-vacio-container">
        <ShoppingBag size={64} />
        <h2>Tu carrito está vacío</h2>
        <p>Explora nuestros productos y agrega lo que necesites.</p>
        <Link to="/tienda" className="btn-seguir-comprando">Seguir comprando</Link>
      </div>
    );
  }

  const itemsSeleccionadosCount = selectedItems.size;

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>Carrito de compras</h1>
        <span className="productos-count">{items.length} productos</span>
      </div>

      <div className="carrito-grid">
        <div className="carrito-items">
          {/* Cabecera de selección masiva */}
          <div className="seleccion-masiva">
            <button 
              className={`btn-seleccionar-todos ${todosSeleccionados ? 'active' : ''}`}
              onClick={() => seleccionarTodos(!todosSeleccionados)}
            >
              {todosSeleccionados ? <CheckSquare size={18} /> : <Square size={18} />}
              {todosSeleccionados ? 'Deseleccionar todos' : 'Seleccionar todos'}
            </button>
            <span className="seleccionados-info">{itemsSeleccionadosCount} seleccionados</span>
          </div>

          {items.map(item => (
            <div key={item.id} className={`carrito-item ${selectedItems.has(item.id) ? 'seleccionado' : ''}`}>
              <div className="item-checkbox">
                <button 
                  className="btn-checkbox"
                  onClick={() => toggleSeleccion(item.id)}
                >
                  {selectedItems.has(item.id) ? <CheckSquare size={22} color="#2e7d32" /> : <Square size={22} color="#9aa3b0" />}
                </button>
              </div>

              <img
                src={item.imagen ? `http://localhost:3000${item.imagen}` : 'https://via.placeholder.com/80?text=Producto'}
                alt={item.nombre}
                className="item-imagen"
              />
              <div className="item-info">
                <Link to={`/producto/${item.id}`} className="item-nombre">
                  {item.nombre}
                </Link>
                <span className="item-sku">SKU: {item.sku}</span>
                <div className="item-precio">S/ {item.precio.toFixed(2)} c/u</div>

                {/* Extras */}
                <div className="item-extras">
                  <label className={`extra-label ${extras[item.id]?.garantia ? 'activo' : ''}`}>
                    <input
                      type="checkbox"
                      checked={extras[item.id]?.garantia || false}
                      onChange={() => toggleExtra(item.id, 'garantia')}
                    />
                    <Shield size={16} />
                    Garantía <span className="extra-precio">+S/ 50</span>
                  </label>
                  <label className={`extra-label ${extras[item.id]?.calibracion ? 'activo' : ''}`}>
                    <input
                      type="checkbox"
                      checked={extras[item.id]?.calibracion || false}
                      onChange={() => toggleExtra(item.id, 'calibracion')}
                    />
                    <Wrench size={16} />
                    Calibración <span className="extra-precio">+S/ 30</span>
                  </label>
                </div>
              </div>

              <div className="item-acciones">
                <div className="selector-cantidad">
                  <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <button className="btn-eliminar" onClick={() => eliminarProducto(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="item-subtotal">
                <div className="subtotal-base">
                  S/ {(item.precio * item.cantidad).toFixed(2)}
                </div>
                {selectedItems.has(item.id) && (
                  <div className="subtotal-extras">
                    {extras[item.id]?.garantia && <span>+S/ 50</span>}
                    {extras[item.id]?.calibracion && <span>+S/ 30</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="carrito-resumen">
          <h3>Resumen de compra</h3>
          <div className="resumen-linea">
            <span>Productos seleccionados</span>
            <span>{itemsSeleccionadosCount} de {items.length}</span>
          </div>
          <div className="resumen-linea">
            <span>Subtotal</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="resumen-linea">
            <span>Envío</span>
            <span>{envio === 0 ? 'Gratis' : `S/ ${envio.toFixed(2)}`}</span>
          </div>
          <div className="resumen-linea total">
            <span>Total a pagar</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={irCheckout} disabled={itemsSeleccionadosCount === 0}>
            Proceder al pago ({itemsSeleccionadosCount})
          </button>
          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <Link to="/tienda" className="btn-seguir-comprando">
            Seguir comprando
          </Link>
          <p className="nota-carrito">Los productos no seleccionados permanecerán en tu carrito</p>
        </div>
      </div>
    </div>
  );
};

export default Carrito;