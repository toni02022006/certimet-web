import React, { createContext, useState, useContext, useEffect } from 'react';

const ComparacionContext = createContext();

export const ComparacionProvider = ({ children }) => {
  const [productosComparar, setProductosComparar] = useState(() => {
    const stored = localStorage.getItem('comparacion');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('comparacion', JSON.stringify(productosComparar));
  }, [productosComparar]);

  const agregarProducto = (producto) => {
    if (productosComparar.length >= 4) {
      alert('Máximo 4 productos para comparar');
      return false;
    }
    if (productosComparar.some(p => p.id === producto.id)) {
      alert('Producto ya está en la comparación');
      return false;
    }
    setProductosComparar([...productosComparar, producto]);
    return true;
  };

  const agregarMultiples = (productos) => {
    const idsActuales = new Set(productosComparar.map(p => p.id));
    const nuevos = productos.filter(p => !idsActuales.has(p.id));
    if (nuevos.length === 0) return false;
    if (productosComparar.length + nuevos.length > 4) {
      alert('Máximo 4 productos para comparar');
      return false;
    }
    setProductosComparar([...productosComparar, ...nuevos]);
    return true;
  };

  const quitarProducto = (productoId) => {
    setProductosComparar(productosComparar.filter(p => p.id !== productoId));
  };

  const limpiarComparacion = () => {
    setProductosComparar([]);
  };

  const estaEnComparacion = (productoId) => {
    return productosComparar.some(p => p.id === productoId);
  };

  return (
    <ComparacionContext.Provider value={{
      productosComparar,
      agregarProducto,
      agregarMultiples,
      quitarProducto,
      limpiarComparacion,
      estaEnComparacion,
      cantidad: productosComparar.length
    }}>
      {children}
    </ComparacionContext.Provider>
  );
};

export const useComparacion = () => useContext(ComparacionContext);