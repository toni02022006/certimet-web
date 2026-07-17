// src/components/cuenta/RecuperarPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RecuperarPassword.css';

// Rutas actualizadas
import logoCertimet from '../../image/baners/baners_inicio/Imagotipo v2.png';
import fondoEcommerce from '../../image/baners/baners_inicio/Ecommerce.jpg.jpeg';

const RecuperarPassword = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="recuperar-fullscreen-wrapper"
      style={{ backgroundImage: `url(${fondoEcommerce})` }}
    >
      <button className="btn-volver" onClick={() => navigate('/tienda/login')}>
        ← Volver al Login
      </button>

      <div className="recuperar-glass-container">
        <div className="recuperar-header-box">
          <div className="logo-pill">
            <img src={logoCertimet} alt="Certimet Logo" className="recuperar-logo" />
          </div>
          <h2>Recuperar contraseña</h2>
          <p className="recuperar-sub">Ingresa tu correo y te enviaremos un código de verificación.</p>
        </div>

        {error && <div className="recuperar-error">{error}</div>}
        {mensaje && <div className="recuperar-exito">{mensaje}</div>}

        {!enviado ? (
          <form onSubmit={handleSubmit} className="recuperar-form">
            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  placeholder="ejemplo@certimet.pe"
                />
              </div>
            </div>
            <button type="submit" className="btn-enviar-glass" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar código'}
            </button>
          </form>
        ) : (
          <div className="recuperar-actions">
            <button 
              onClick={() => navigate('/tienda/verificar-codigo')} 
              className="btn-enviar-glass"
            >
              Ir a verificar código
            </button>
          </div>
        )}

        <div className="recuperar-footer">
          <p>¿Recordaste tu contraseña?</p>
          <Link to="/tienda/login" className="btn-login-link">Volver a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;