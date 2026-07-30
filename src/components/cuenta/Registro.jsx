import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';

import logoCertimet from '../../image/baners/baners_inicio/Imagotipo v2.png';
import fondoEcommerce from '../../image/baners/baners_inicio/Ecommerce.jpg.jpeg';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          apellidos: form.apellidos,
          correo: form.correo,
          telefono: form.telefono,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      setExito(true);
      setTimeout(() => navigate('/tienda/login'), 3000); 
    } catch (err) {
      setError(err.message);
    }
  };

  if (exito) {
    return (
      <div className="registro-fullscreen-wrapper" style={{ backgroundImage: `url(${fondoEcommerce})` }}>
        <div className="registro-glass-container exito-container">
          <img src={logoCertimet} alt="Certimet Logo" className="registro-logo" />
          <h2 className="registro-texto-verde">¡Registro exitoso!</h2>
          <p className="registro-sub">Tu cuenta ha sido creada correctamente. En un momento serás redirigido al inicio de sesión.</p>
          <button className="registro-btn-glass" onClick={() => navigate('/tienda/login')}>
            Ir a Iniciar Sesión ahora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="registro-fullscreen-wrapper"
      style={{ backgroundImage: `url(${fondoEcommerce})` }}
    >
      <button className="registro-btn-volver" onClick={() => navigate('/tienda/login')}>
        ← Volver al Login
      </button>

      <div className="registro-glass-container">
        <div className="registro-header-box">
          <img src={logoCertimet} alt="Certimet Logo" className="registro-logo" />
          <h2 className="registro-title-main">Crear cuenta</h2>
          <p className="registro-sub">Regístrate como cliente y empieza a comprar</p>
        </div>

        {error && <div className="registro-error">{error}</div>}

        <form onSubmit={handleSubmit} className="registro-form">
          
          <div className="registro-form-row">
            <div className="registro-form-group">
              <label className="registro-label">Nombre(s)</label>
              <div className="registro-input-wrapper">
                <input
                  className="registro-input"
                  type="text"
                  name="nombre"
                  placeholder="Juan"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="registro-form-group">
              <label className="registro-label">Apellidos</label>
              <div className="registro-input-wrapper">
                <input
                  className="registro-input"
                  type="text"
                  name="apellidos"
                  placeholder="Pérez"
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="registro-form-group">
            <label className="registro-label">Correo electrónico</label>
            <div className="registro-input-wrapper">
              <input
                className="registro-input"
                type="email"
                name="correo"
                placeholder="ejemplo@certimet.pe"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="registro-form-group">
            <label className="registro-label">Teléfono</label>
            <div className="registro-input-wrapper">
              <input
                className="registro-input"
                type="tel"
                name="telefono"
                placeholder="987 654 321"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="registro-form-row">
            <div className="registro-form-group">
              <label className="registro-label">Contraseña</label>
              <div className="registro-input-wrapper">
                <input
                  className="registro-input"
                  type="password"
                  name="password"
                  placeholder="Mín. 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
            </div>
            <div className="registro-form-group">
              <label className="registro-label">Confirmar contraseña</label>
              <div className="registro-input-wrapper">
                <input
                  className="registro-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repítela"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="registro-btn-glass">
            Crear mi cuenta
          </button>
        </form>

        <div className="registro-footer">
          <p className="registro-footer-text">¿Ya tienes cuenta?</p>
          <Link to="/tienda/login" className="registro-btn-login-link">Iniciar sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;