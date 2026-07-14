// src/components/cuenta/Registro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';

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
      setTimeout(() => navigate('/tienda/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (exito) {
    return (
      <div className="registro-page">
        <div className="registro-container">
          <div className="registro-exito">
            <h2>✅ ¡Registro exitoso!</h2>
            <p>Ya puedes iniciar sesión con tus credenciales.</p>
            <Link to="/tienda/login" className="btn-login">Ir a Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registro-page">
      <div className="registro-container">
        <h2>Crear cuenta</h2>
        <p className="registro-sub">Regístrate como cliente y empieza a comprar</p>

        {error && <div className="registro-error">{error}</div>}

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre(s)</label>
              <input
                type="text"
                name="nombre"
                placeholder="Juan"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                placeholder="Pérez"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@certimet.pe"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="987654321"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-registro">Registrarse</button>
        </form>

        <div className="registro-footer">
          <p>¿Ya tienes cuenta? <Link to="/tienda/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;