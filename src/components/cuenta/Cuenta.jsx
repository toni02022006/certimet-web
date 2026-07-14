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
        // Obtener perfil
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

        // Obtener direcciones
        const dirRes = await fetch('http://localhost:3000/api/usuario/direcciones', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (dirRes.ok) {
          const dirs = await dirRes.json();
          setDirecciones(dirs);
        }

        // Obtener pedidos
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
        
        {/* SIDEBAR DE USUARIO */}
        <div className="cuenta-sidebar">
          <div className="cuenta-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h2>{usuario?.nombre} {usuario?.apellidos}</h2>
          <p className="cuenta-email">{usuario?.correo}</p>
          
          <div className="cuenta-sidebar-divider"></div>
          
          <button className="btn-cerrar-sesion" onClick={handleLogout}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="cuenta-main">
          
          {/* SECCIÓN PERFIL */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <h3>Información de Perfil</h3>
              </div>
              {!editando && (
                <button className="btn-editar" onClick={() => setEditando(true)}>
                  Editar perfil
                </button>
              )}
            </div>

            {!editando ? (
              <div className="cuenta-info-grid">
                <div className="info-card">
                  <span className="info-label">Nombre completo</span>
                  <span className="info-value">{usuario?.nombre} {usuario?.apellidos}</span>
                </div>
                <div className="info-card">
                  <span className="info-label">Correo electrónico</span>
                  <span className="info-value">{usuario?.correo}</span>
                </div>
                <div className="info-card">
                  <span className="info-label">Número de teléfono</span>
                  <span className="info-value">{usuario?.telefono || 'No registrado'}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleActualizar} className="cuenta-form animated-fade">
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Nombre(s)</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                      required
                      placeholder="Tus apellidos"
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="Ej. +51 987654321"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-guardar">Guardar cambios</button>
                  <button type="button" className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>

          {/* SECCIÓN DIRECCIONES */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <h3>Mis Direcciones de Envío</h3>
              </div>
              <button 
                className={`btn-toggle-direccion ${mostrarFormDireccion ? 'btn-active' : ''}`} 
                onClick={() => setMostrarFormDireccion(!mostrarFormDireccion)}
              >
                {mostrarFormDireccion ? 'Cancelar' : '+ Agregar dirección'}
              </button>
            </div>

            {mostrarFormDireccion && (
              <form onSubmit={handleAgregarDireccion} className="cuenta-form direccion-form animated-fade">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Nombre o Título (ej: Casa, Oficina)</label>
                    <input
                      type="text"
                      value={nuevaDireccion.titulo}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, titulo: e.target.value})}
                      required
                      placeholder="Ej. Mi Casa"
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección completa</label>
                    <input
                      type="text"
                      value={nuevaDireccion.direccion}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, direccion: e.target.value})}
                      required
                      placeholder="Calle, avenida o jirón y nro."
                    />
                  </div>
                </div>
                
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Distrito</label>
                    <input
                      type="text"
                      value={nuevaDireccion.distrito}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, distrito: e.target.value})}
                      required
                      placeholder="Ej. Miraflores"
                    />
                  </div>
                  <div className="form-group">
                    <label>Provincia</label>
                    <input
                      type="text"
                      value={nuevaDireccion.provincia}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, provincia: e.target.value})}
                      required
                      placeholder="Ej. Lima"
                    />
                  </div>
                  <div className="form-group">
                    <label>Código postal (Opcional)</label>
                    <input
                      type="text"
                      value={nuevaDireccion.codigo_postal}
                      onChange={(e) => setNuevaDireccion({...nuevaDireccion, codigo_postal: e.target.value})}
                      placeholder="Ej. 15046"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Referencia (Opcional)</label>
                  <input
                    type="text"
                    value={nuevaDireccion.referencia}
                    onChange={(e) => setNuevaDireccion({...nuevaDireccion, referencia: e.target.value})}
                    placeholder="Ej. Frente al parque principal, portón verde"
                  />
                </div>
                
                <button type="submit" className="btn-guardar btn-full">Guardar dirección</button>
              </form>
            )}

            {direcciones.length === 0 ? (
              <div className="cuenta-vacio">
                <p>Aún no tienes direcciones registradas para tus envíos.</p>
              </div>
            ) : (
              <div className="direcciones-grid">
                {direcciones.map(dir => (
                  <div className="direccion-card" key={dir.id}>
                    <div className="dir-header">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dir-icon">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <h4>{dir.titulo}</h4>
                    </div>
                    <p className="dir-body">{dir.direccion}</p>
                    <p className="dir-sub">{dir.distrito}, {dir.provincia} {dir.codigo_postal ? `- ${dir.codigo_postal}` : ''}</p>
                    {dir.referencia && <p className="dir-ref"><span>Ref:</span> {dir.referencia}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECCIÓN PEDIDOS */}
          <div className="cuenta-section">
            <div className="cuenta-section-header">
              <div className="section-title-group">
                <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Mis Pedidos Recientes</h3>
              </div>
              <Link to="/tienda" className="btn-ir-tienda">
                Comprar más
              </Link>
            </div>

            {pedidos.length === 0 ? (
              <div className="cuenta-vacio">
                <p>No tienes pedidos registrados todavía.</p>
                <Link to="/tienda" className="btn-comprar-primero">Explorar la tienda</Link>
              </div>
            ) : (
              <div className="pedidos-tabla-wrapper">
                <table className="pedidos-tabla">
                  <thead>
                    <tr>
                      <th>N° Pedido</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map(ped => (
                      <tr key={ped.id}>
                        <td className="ped-id">#{ped.id}</td>
                        <td>{new Date(ped.fecha_pedido).toLocaleDateString()}</td>
                        <td className="ped-total">S/ {parseFloat(ped.total).toFixed(2)}</td>
                        <td>
                          <span className={`estado-badge ${ped.estado_pedido?.toLowerCase()}`}>
                            {ped.estado_pedido}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cuenta;