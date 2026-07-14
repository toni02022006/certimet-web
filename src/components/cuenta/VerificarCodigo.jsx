// src/components/cuenta/VerificarCodigo.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VerificarCodigo.css';

const VerificarCodigo = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setError('');
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
    }
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    if (nuevaPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (nuevaPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/restablecer-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, nuevaPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al restablecer');
      alert('Contraseña actualizada correctamente. Inicia sesión.');
      navigate('/tienda/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="verificar-page">
      <div className="verificar-container">
        <h2>{step === 1 ? 'Verificar código' : 'Nueva contraseña'}</h2>
        {error && <div className="verificar-error">{error}</div>}
        {mensaje && <div className="verificar-exito">{mensaje}</div>}

        {step === 1 ? (
          <form onSubmit={handleVerificarCodigo} className="verificar-form">
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
            <div className="form-group">
              <label>Código de verificación</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                required
                placeholder="Ej: A7D3F9"
                maxLength="6"
                style={{ textTransform: 'uppercase' }}
              />
              <small>El código expira en 1:30 min y tienes 3 intentos.</small>
            </div>
            <button type="submit" className="btn-verificar">Verificar código</button>
          </form>
        ) : (
          <form onSubmit={handleCambiarPassword} className="verificar-form">
            <div className="form-group">
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-restablecer">Restablecer contraseña</button>
          </form>
        )}
        <div className="verificar-footer">
          <Link to="/tienda/login">Volver a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigo;