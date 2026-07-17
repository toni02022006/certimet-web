import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

import logoCertimet from '../image/baners/baners_inicio/Imagotipo v2.png';
import fondoEcommerce from '../image/baners/baners_inicio/Ecommerce.jpg.jpeg';

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
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Credenciales incorrectas');
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
      // Imagen cruda sin filtros CSS ni gradientes azules
      style={{ backgroundImage: `url(${fondoEcommerce})` }}
    >
      <button className="btn-volver" onClick={() => navigate('/tienda')}>
        ← Volver a la tienda
      </button>

      <div className="login-glass-container">
        <div className="login-header-box">
          <div className="logo-pill">
            <img src={logoCertimet} alt="Certimet Logo" className="login-logo" />
          </div>
          <h2>¡Hola! Qué bueno verte</h2>
          <p className="login-sub">Inicia sesión para continuar con tu compra</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="ejemplo@certimet.pe"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Recordarme
            </label>
            <Link to="/tienda/recuperar" className="forgot-link">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="btn-login-glass" disabled={loading}>
            {loading ? 'Validando...' : 'Ingresar a mi cuenta'}
          </button>
        </form>

        <div className="login-footer">
          <p>¿Eres nuevo en Certimet?</p>
          <Link to="/tienda/registro" className="btn-registro-link">Crear una cuenta nueva</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;