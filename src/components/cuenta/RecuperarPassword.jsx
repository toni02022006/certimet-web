// src/components/cuenta/RecuperarPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecuperarPassword.css';

const RecuperarPassword = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/recuperar-solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al solicitar recuperación');
      setMensaje(data.message);
      setEnviado(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="recuperar-page">
      <div className="recuperar-container">
        <h2>Recuperar contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un código de verificación.</p>
        {error && <div className="recuperar-error">{error}</div>}
        {mensaje && <div className="recuperar-exito">{mensaje}</div>}
        {!enviado ? (
          <form onSubmit={handleSubmit} className="recuperar-form">
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="ejemplo@certimet.pe"
              />
            </div>
            <button type="submit" className="btn-enviar">Enviar código</button>
          </form>
        ) : (
          <div className="recuperar-actions">
            <Link to="/tienda/verificar-codigo" className="btn-ir-verificar">
              Ir a verificar código
            </Link>
          </div>
        )}
        <div className="recuperar-footer">
          <Link to="/tienda/login">Volver a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;