// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al parsear el usuario del localStorage", e);
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook ultra-seguro: Si por alguna razón falla el contexto, devuelve valores por defecto y no rompe la app
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    console.warn("⚠️ Advertencia: useAuth se está usando fuera de un AuthProvider o hay un problema de importación.");
    // Devolvemos un objeto seguro por defecto para que no falle la desestructuración
    return {
      user: null,
      login: () => {},
      logout: () => {},
      isAuthenticated: false
    };
  }
  
  return context;
};