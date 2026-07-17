// src/components/cuenta/Cuenta.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cuenta.css';

const Cuenta = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
  });
  const [nuevaDireccion, setNuevaDireccion] = useState({
    titulo: '',
    direccion: '',
    distrito: '',
    provincia: '',
    codigo_postal: '',
    referencia: ''
  });
  const [mostrarFormDireccion, setMostrarFormDireccion] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/tienda/login');
      return;
    }

    const fetchData = async () => {
      try {
        const perfilRes = await fetch('http://localhost:3000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (perfilRes.ok) {
          const userData = await perfilRes.json();
          setUsuario(userData);
          setFormData({
            nombre: userData.nombre || '',
            apellidos: userData.apellidos || '',
            telefono: userData.telefono || '',
          });
        }

        const dirRes = await fetch('http://localhost:3000/api/usuario/direcciones', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (dirRes.ok) {
          const dirs = await dirRes.json();
          setDirecciones(dirs);
        }

        const pedRes = await fetch('http://localhost:3000/api/usuario/pedidos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (pedRes.ok) {
          const peds = await pedRes.json();
          setPedidos(peds);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/usuario/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updated = await res.json();
        setUsuario(updated);
        setEditando(false);
        alert('Datos actualizados correctamente');
      } else {
        alert('Error al actualizar');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAgregarDireccion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/usuario/direcciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevaDireccion)
      });
      if (res.ok) {
        const nueva = await res.json();
        setDirecciones([...direcciones, nueva]);
        setMostrarFormDireccion(false);
        setNuevaDireccion({
          titulo: '',
          direccion: '',
          distrito: '',
          provincia: '',
          codigo_postal: '',
          referencia: ''
        });
        alert('Dirección agregada correctamente');
      } else {
        alert('Error al agregar dirección');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/tienda');
  };

  const obtenerIniciales = () => {
    if (!usuario?.nombre) return 'U';
    const inicialNombre = usuario.nombre.charAt(0);
    const inicialApellido = usuario.apellidos ? usuario.apellidos.charAt(0) : '';
    return `${inicialNombre}${inicialApellido}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="cuenta-loading-container">
        <div className="cuenta-spinner"></div>
        <p>Cargando tu perfil...</p>
      </div>
    );
  }

  return (
    <div className="cuenta-page-wrapper">
      <div className="cuenta-container">
        
        {/* =======================================
            HERO BANNER SUPERIOR (Reemplaza al sidebar)
        ======================================= */}
        <div className="cuenta-hero-banner">
          <div className="hero-user-info">
            <div className="cuenta-avatar-premium">
              {obtenerIniciales()}
            </div>
            <div className="hero-text-content">
              <h2>{usuario?.nombre} {usuario?.apellidos}</h2>
              <p className="cuenta-email">{usuario?.correo}</p>
            </div>
          </div>
          
          <button className="btn-cerrar-sesion-premium" onClick={handleLogout}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>

        {/* =======================================
            GRILLA DE 3 COLUMNAS
        ======================================= */}
        <div className="cuenta-grid-3">
          
          {/* COLUMNA 1: PERFIL */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3>Perfil</h3>
              </div>
              {!editando && (
                <button className="btn-editar-premium" onClick={() => setEditando(true)}>
                  Editar
                </button>
              )}
            </div>

            {!editando ? (
              <div className="cuenta-info-list">
                <div className="info-card-premium">
                  <span className="info-label">Nombre completo</span>
                  <span className="info-value">{usuario?.nombre} {usuario?.apellidos}</span>
                </div>
                <div className="info-card-premium">
                  <span className="info-label">Correo electrónico</span>
                  <span className="info-value">{usuario?.correo}</span>
                </div>
                <div className="info-card-premium">
                  <span className="info-label">Número de teléfono</span>
                  <span className="info-value">{usuario?.telefono || 'No registrado'}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleActualizar} className="cuenta-form animated-fade">
                <div className="form-group">
                  <label>Nombre(s)</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                <div className="form-actions-col">
                  <button type="submit" className="btn-guardar-premium btn-full">Guardar</button>
                  <button type="button" className="btn-cancelar-premium btn-full" onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>

          {/* COLUMNA 2: DIRECCIONES */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3>Direcciones</h3>
              </div>
              <button 
                className={`btn-toggle-direccion ${mostrarFormDireccion ? 'btn-active' : ''}`} 
                onClick={() => setMostrarFormDireccion(!mostrarFormDireccion)}
              >
                {mostrarFormDireccion ? 'Cancelar' : '+ Nueva'}
              </button>
            </div>

            {mostrarFormDireccion && (
              <form onSubmit={handleAgregarDireccion} className="cuenta-form direccion-form animated-fade">
                <div className="form-group">
                  <label>Título (Ej. Casa)</label>
                  <input
                    type="text"
                    value={nuevaDireccion.titulo}
                    onChange={(e) => setNuevaDireccion({...nuevaDireccion, titulo: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dirección completa</label>
                  <input
                    type="text"
                    value={nuevaDireccion.direccion}
                    onChange={(e) => setNuevaDireccion({...nuevaDireccion, direccion: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Distrito</label>
                    <input
                      type="text"
                      value={nuevaDireccion.distrito}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, distrito: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Provincia</label>
                    <input
                      type="text"
                      value={nuevaDireccion.provincia}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, provincia: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Referencia (Opcional)</label>
                  <input
                    type="text"
                    value={nuevaDireccion.referencia}
                    onChange={(e) => setNuevaDireccion({...nuevaDireccion, referencia: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn-guardar-premium btn-full">Guardar</button>
              </form>
            )}

            {direcciones.length === 0 ? (
              <div className="cuenta-vacio">
                <div className="vacio-icon">📍</div>
                <p>No tienes direcciones.</p>
              </div>
            ) : (
              <div className="direcciones-list">
                {direcciones.map(dir => (
                  <div className="direccion-card-premium" key={dir.id}>
                    <div className="dir-header">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dir-icon">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                      <h4>{dir.titulo}</h4>
                    </div>
                    <div className="dir-content">
                      <p className="dir-body">{dir.direccion}</p>
                      <p className="dir-sub">{dir.distrito}, {dir.provincia}</p>
                      {dir.referencia && <p className="dir-ref">Ref: {dir.referencia}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLUMNA 3: PEDIDOS */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <h3>Pedidos Recientes</h3>
              </div>
            </div>

            {pedidos.length === 0 ? (
              <div className="cuenta-vacio">
                <div className="vacio-icon">🛍️</div>
                <p>No tienes pedidos todavía.</p>
                <Link to="/tienda" className="btn-guardar-premium" style={{ display: 'inline-block', marginTop: '15px', textDecoration: 'none' }}>
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              <div className="pedidos-list">
                {pedidos.map(ped => (
                  <div className="pedido-card-item" key={ped.id}>
                    <div className="pedido-card-header">
                      <span className="ped-id">Pedido #{ped.id}</span>
                      <span className={`estado-badge ${ped.estado_pedido?.toLowerCase()}`}>
                        {ped.estado_pedido}
                      </span>
                    </div>
                    <div className="pedido-card-body">
                      <div className="ped-info">
                        <span className="ped-label">Fecha</span>
                        <span className="ped-fecha">{new Date(ped.fecha_pedido).toLocaleDateString()}</span>
                      </div>
                      <div className="ped-info ped-monto">
                        <span className="ped-label">Total</span>
                        <span className="ped-total">S/ {parseFloat(ped.total).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/tienda" className="btn-editar-premium btn-full" style={{ textAlign: 'center', marginTop: '15px', display: 'block', textDecoration: 'none' }}>
                  Seguir Comprando
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cuenta;