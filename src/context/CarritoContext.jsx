import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

// 1. Creamos el Contexto
export const CarritoContext = createContext();

// Hook personalizado para usar el carrito fácilmente en cualquier componente
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState({
    detalles: [],
    subtotal: 0,
    descuento: 0,
    total: 0,
    cupon: null
  });
  const [cartCount, setCartCount] = useState(0);
  const [loadingCarrito, setLoadingCarrito] = useState(true);

  const API_URL = 'http://localhost:3000/api/carrito';

  // Función para obtener ID de usuario (si está logueado) o Session ID (invitado)
  const getCredenciales = () => {
    const usuarioStr = localStorage.getItem('usuario');
    let usuario_id = null;
    let session_id = localStorage.getItem('session_id');

    // Si hay un usuario logueado, tomamos su ID
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        usuario_id = usuario.id;
      } catch (e) {
        console.error("Error parseando usuario:", e);
      }
    }

    // Si NO hay usuario logueado y NO hay session_id, creamos uno
    if (!usuario_id && !session_id) {
      session_id = 'guest_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem('session_id', session_id);
    }

    return { usuario_id, session_id };
  };

  // 2. Función para Traer el Carrito desde la BD
  const cargarCarrito = async () => {
    try {
      setLoadingCarrito(true);
      const { usuario_id, session_id } = getCredenciales();
      
      let query = '?';
      if (usuario_id) query += `usuario_id=${usuario_id}`;
      else if (session_id) query += `session_id=${session_id}`;

      const response = await fetch(`${API_URL}${query}`);
      if (response.ok) {
        const data = await response.json();
        setCarrito(data);
        
        // Calcular la cantidad total de artículos para la burbuja (badge) del Header
        const totalItems = data.detalles?.reduce((acc, item) => acc + item.cantidad, 0) || 0;
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error("Error al cargar carrito desde el servidor:", error);
    } finally {
      setLoadingCarrito(false);
    }
  };

  // Cargar el carrito cuando la app inicia o cuando el usuario hace login/logout
  useEffect(() => {
    cargarCarrito();
    
    // Escuchamos cambios en el storage por si el usuario se loguea en otra pestaña
    const handleStorageChange = (e) => {
      if (e.key === 'usuario' || e.key === 'token') {
        cargarCarrito();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 3. Función para Agregar Producto (Reemplaza a la lógica de ProductoDetalle.jsx)
  const agregarProducto = async (producto, cantidad) => {
    const { usuario_id, session_id } = getCredenciales();
    
    try {
      const res = await fetch(`${API_URL}/agregar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          usuario_id, 
          session_id, 
          producto_id: producto.id, 
          cantidad 
        })
      });

      if (res.ok) {
        // Recargamos el carrito desde el backend para tener los totales exactos
        await cargarCarrito();
        
        Swal.fire({
          title: '¡Producto agregado!',
          text: `Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito.`,
          icon: 'success',
          confirmButtonText: 'Seguir comprando',
          confirmButtonColor: '#00c652',
        });
      } else {
        const err = await res.json();
        throw new Error(err.error);
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo agregar el producto al carrito', 'error');
    }
  };

  // 4. Actualizar Cantidad (+ o - en la vista de Carrito)
  const actualizarCantidad = async (item_id, nuevaCantidad) => {
    try {
      const res = await fetch(`${API_URL}/item/${item_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad })
      });
      if (res.ok) await cargarCarrito();
    } catch (error) {
      console.error("Error actualizando cantidad:", error);
    }
  };

  // 5. Eliminar un ítem
  const eliminarProducto = async (item_id) => {
    try {
      const res = await fetch(`${API_URL}/item/${item_id}`, { method: 'DELETE' });
      if (res.ok) await cargarCarrito();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      cartCount,
      loadingCarrito,
      cargarCarrito,
      agregarProducto,
      actualizarCantidad,
      eliminarProducto
    }}>
      {children}
    </CarritoContext.Provider>
  );
};