import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SeguimientoInvitado.css';

const pasosEnvio = [
  { estado: 'PENDIENTE', label: 'Confirmación', desc: 'Pago verificado.' },
  { estado: 'EN_PREPARACION', label: 'Preparación', desc: 'Empaquetando.' },
  { estado: 'ENVIADO', label: 'Enviado', desc: 'En camino a agencia.' },
  { estado: 'DESPACHADO', label: 'Despacho', desc: 'Salió de almacén.' },
  { estado: 'EN_TRANSITO', label: 'En Tránsito', desc: 'Hacia distribución.' },
  { estado: 'EN_REPARTO', label: 'Última Milla', desc: 'En camino a ti.' },
  { estado: 'ENTREGADO', label: 'Entregado', desc: 'Pedido entregado.' }
];

const SeguimientoInvitado = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchPedidoPublico = async () => {
      try {
        setCargando(true);
        const { data } = await axios.get(`${API_URL}/api/pedidos/publico/${id}`);
        setPedido(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar seguimiento:', err);
        setError('No se pudo encontrar el pedido o el enlace es incorrecto.');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      fetchPedidoPublico();
    }
  }, [id]);

  if (cargando) return <div className="sig-loading">Cargando estado del pedido...</div>;
  if (error) return (
    <div className="sig-error">
      <h2>⚠️ Ups</h2>
      <p>{error}</p>
      <Link to="/tienda">Ir a la Tienda</Link>
    </div>
  );

  const estadoPedido = pedido?.estado_pedido || 'PENDIENTE';
  const indiceActual = pasosEnvio.findIndex(p => p.estado === estadoPedido);

  // Si el estado es PENDIENTE, no marcamos ningún paso completado (progreso = -1)
  // Si es cualquier otro, el progreso comienza en el índice 0 (Confirmación)
  const indiceProgreso = estadoPedido === 'PENDIENTE' ? -1 : (indiceActual >= 0 ? indiceActual : 0);
  const progreso = indiceProgreso >= 0 ? (indiceProgreso / (pasosEnvio.length - 1)) * 100 : 0;

  return (
    <div className="seguimiento-page">
      <div className="seguimiento-container">
        <div className="seguimiento-card">
          {/* Encabezado */}
          <div className="seguimiento-header">
            <h2>Seguimiento del Pedido <span>#{pedido.id}</span></h2>
            <p className="seguimiento-fecha">Realizado el: {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
          </div>

          {/* Stepper horizontal */}
          <div className="stepper-horizontal">
            <div className="stepper-linea-fondo"></div>
            <div className="stepper-linea-progreso" style={{ width: `${progreso}%` }}></div>

            {pasosEnvio.map((paso, index) => {
              const completado = indiceProgreso >= 0 && index <= indiceProgreso;
              const activo = index === indiceProgreso && indiceProgreso >= 0;
              return (
                <div key={paso.estado} className={`stepper-item ${completado ? 'completado' : ''} ${activo ? 'actual' : ''}`}>
                  <div className="stepper-icon-box">
                    {completado ? '✓' : index + 1}
                  </div>
                  <div className="stepper-content">
                    <h4>{paso.label}</h4>
                    <p>{paso.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pista con camión SVG animado */}
          <div className="animacion-track-container">
            <div className="pista">
              <div className="lineas-carretera"></div>
              <div className="pista-progreso" style={{ width: `${progreso}%` }}></div>
              <div className="vehiculo-container" style={{ left: `${Math.min(progreso, 95)}%` }}>
                <div className="camion-animado">
                  {/* SVG del camión apuntando a la derecha */}
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="14" width="30" height="16" rx="2" fill="#2563eb" />
                    <rect x="12" y="10" width="20" height="8" rx="2" fill="#3b82f6" />
                    <rect x="38" y="18" width="16" height="10" rx="2" fill="#1e40af" />
                    <circle cx="16" cy="34" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <circle cx="16" cy="34" r="3" fill="#94a3b8" />
                    <circle cx="34" cy="34" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <circle cx="34" cy="34" r="3" fill="#94a3b8" />
                    <circle cx="48" cy="30" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <circle cx="48" cy="30" r="3" fill="#94a3b8" />
                    <rect x="42" y="12" width="10" height="12" rx="2" fill="#1e40af" opacity="0.8" />
                    <circle cx="46" cy="18" r="2" fill="#facc15" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de volver */}
          <div className="seguimiento-footer">
            <Link to="/tienda" className="btn-volver-centrado">
              ← Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoInvitado;