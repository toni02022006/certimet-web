// src/components/cuenta/VerificarCodigo.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VerificarCodigo.css';

// Rutas actualizadas (las mismas que en login)
import logoCertimet from '../../image/baners/baners_inicio/Imagotipo v2.png';
import fondoEcommerce from '../../image/baners/baners_inicio/Ecommerce.jpg.jpeg';

const VerificarCodigo = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Código inválido');
      setMensaje(data.message);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (nuevaPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (nuevaPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/restablecer-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, nuevaPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al restablecer');
      
      // Mensaje de éxito integrado (sin alert)
      setMensaje('¡Contraseña actualizada! Redirigiendo al login...');
      setTimeout(() => navigate('/tienda/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="verificar-fullscreen-wrapper"
      style={{ backgroundImage: `url(${fondoEcommerce})` }}
    >
      <button className="btn-volver" onClick={() => navigate('/tienda/login')}>
        ← Volver al Login
      </button>

      <div className="verificar-glass-container">
        <div className="verificar-header-box">
          <div className="logo-pill">
            <img src={logoCertimet} alt="Certimet Logo" className="verificar-logo" />
          </div>
          <h2>{step === 1 ? 'Verificar código' : 'Nueva contraseña'}</h2>
          <p className="verificar-sub">
            {step === 1 
              ? 'Ingresa el código que enviamos a tu correo.' 
              : 'Crea una contraseña segura para tu cuenta.'}
          </p>
        </div>

        {error && <div className="verificar-error">{error}</div>}
        {mensaje && <div className="verificar-exito">{mensaje}</div>}

        {step === 1 ? (
          <form onSubmit={handleVerificarCodigo} className="verificar-form">
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
            <div className="form-group">
              <label>Código de verificación</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  required
                  placeholder="Ej: A7D3F9"
                  maxLength="6"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              <small className="verificar-small-text">El código expira en 1:30 min y tienes 3 intentos.</small>
            </div>
            <button type="submit" className="btn-verificar-glass" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCambiarPassword} className="verificar-form">
            <div className="form-group">
              <label>Nueva contraseña</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                  required
                  minLength="6"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>
            <button type="submit" className="btn-verificar-glass" disabled={loading}>
              {loading ? 'Actualizando...' : 'Restablecer contraseña'}
            </button>
          </form>
        )}
        
        <div className="verificar-footer">
          <p>¿Recordaste tu contraseña?</p>
          <Link to="/tienda/login" className="btn-login-link">Volver a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigo;