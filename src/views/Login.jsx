import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

import logoCertimet from '../image/baners/baners_inicio/Imagotipo v2.webp';
import fondoEcommerce from '../image/baners/baners_inicio/Ecommerce.webp';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password, origen: 'ecommerce' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Credenciales incorrectas');
      }
      const rolUsuario = data.usuario.rol.toLowerCase();
      if (rolUsuario !== 'cliente') {
        throw new Error('Acceso denegado. Los administradores deben ingresar por el panel de gestión.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      sessionStorage.setItem('necesita_actualizar', 'true');
      navigate('/tienda');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="login-fullscreen-wrapper"
      style={{ backgroundImage: `url(${fondoEcommerce})` }}
    >
      <button className="login-btn-volver" onClick={() => navigate('/tienda')}>
        ← Volver a la tienda
      </button>

      <div className="login-glass-container">
        <div className="login-header-box">
          <div className="login-logo-pill">
            <img src={logoCertimet} alt="Certimet Logo" className="login-logo" />
          </div>
          <h2 className="login-title-main">¡Hola! Qué bueno verte</h2>
          <p className="login-sub">Inicia sesión para continuar con tu compra</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label">Correo Electrónico</label>
            <div className="login-input-wrapper">
              <input
                className="login-input"
                type="email"
                placeholder="ejemplo@certimet.pe"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <label className="login-label">Contraseña</label>
            <div className="login-input-wrapper">
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <label className="login-remember-me">
              <input type="checkbox" className="login-checkbox" /> Recordarme
            </label>
            <Link to="/tienda/recuperar" className="login-forgot-link">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="login-btn-glass" disabled={loading}>
            {loading ? 'Validando...' : 'Ingresar a mi cuenta'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">¿Eres nuevo en Certimet?</p>
          <Link to="/tienda/registro" className="login-btn-registro-link">Crear una cuenta nueva</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;