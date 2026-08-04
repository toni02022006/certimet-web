import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Truck, MapPin, Home, XCircle, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';
import './SeguimientoPedido.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SeguimientoPedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(false);
  
  const token = localStorage.getItem('token');

  const pasosLogistica = [
    { estado: 'PAGADO', titulo: 'Confirmación', descripcion: 'Pago verificado.', icono: CheckCircle },
    { estado: 'EN_PREPARACION', titulo: 'Preparación', descripcion: 'Empaquetando.', icono: Package },
    { estado: 'DESPACHADO', titulo: 'Despacho', descripcion: 'Salió de almacén.', icono: Truck },
    { estado: 'EN_TRANSITO', titulo: 'En Tránsito', descripcion: 'Hacia distribución.', icono: MapPin },
    { estado: 'EN_REPARTO', titulo: 'Última Milla', descripcion: 'En camino a ti.', icono: MapPin },
    { estado: 'ENTREGADO', titulo: 'Entregado', descripcion: 'Pedido entregado.', icono: Home },
  ];

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`${API_BASE_URL}/api/pedidos/${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setPedido(data);
        } else {
          setPedido(null);
        }
      } catch (error) {
        console.error("Error fetching pedido:", error);
        setPedido(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id, token]);

  const handleCancelar = async () => {
    if (!token) {
      Swal.fire('Error', 'Debes iniciar sesión para cancelar el pedido.', 'error');
      return;
    }

    const result = await Swal.fire({
      title: '¿Cancelar pedido?',
      text: 'Esta acción no se puede deshacer. Si el pedido ya fue pagado, se solicitará el reembolso.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    });

    if (!result.isConfirmed) return;

    setCancelando(true);
    try {
      // ✅ CAMBIO IMPORTANTE: método PUT en lugar de POST
      const res = await fetch(`${API_BASE_URL}/api/pedidos/${id}/cancelar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire('Cancelado', 'El pedido ha sido cancelado exitosamente.', 'success');
        // Actualizar el estado local a CANCELADO para reflejar inmediatamente
        setPedido({ ...pedido, estado_pedido: 'CANCELADO' });
      } else {
        Swal.fire('Error', data.error || 'No se pudo cancelar el pedido.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al cancelar el pedido.', 'error');
    } finally {
      setCancelando(false);
    }
  };

  if (loading) {
    return (
      <div className="seguimiento-page">
        <div className="seguimiento-loader">
          <div className="spinner"></div>
          <p>Cargando estado de tu pedido...</p>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="seguimiento-page">
        <div className="seguimiento-card error-card">
           <XCircle color="#ef4444" size={48} />
           <h2>Pedido no encontrado</h2>
           <p>No pudimos localizar la información de este pedido.</p>
           <Link to="/tienda/cuenta" className="btn-volver-centrado">Volver a mis pedidos</Link>
        </div>
      </div>
    );
  }

  if (pedido.estado_pedido === 'CANCELADO') {
    return (
      <div className="seguimiento-page">
        <div className="seguimiento-card error-card">
           <XCircle color="#ef4444" size={60} />
           <h2>Pedido Cancelado</h2>
           <p>Lo sentimos, este pedido ha sido cancelado y ya no está en curso.</p>
           <Link to="/tienda/cuenta" className="btn-volver-centrado">Volver a mis pedidos</Link>
        </div>
      </div>
    );
  }

  const indiceActual = pasosLogistica.findIndex(p => p.estado === pedido.estado_pedido);
  const indiceSeguro = Math.max(0, indiceActual);
  const porcentajeProgreso = (indiceSeguro / (pasosLogistica.length - 1)) * 100;

  // Mostrar botón de cancelar solo si está PENDIENTE o PAGADO (y el usuario está autenticado)
  const puedeCancelar = (pedido.estado_pedido === 'PENDIENTE' || pedido.estado_pedido === 'PAGADO') && token;

  return (
    <div className="seguimiento-page">
      <div className="seguimiento-container">
        
        <div className="seguimiento-header">
          <div className="seguimiento-titulo-grupo">
            <h2>Seguimiento del Pedido <span>#{pedido.id}</span></h2>
            <p className="seguimiento-fecha">
              Realizado el: {new Date(pedido.fecha_pedido).toLocaleDateString()}
            </p>
          </div>
          {puedeCancelar && (
            <button 
              className="btn-cancelar-pedido" 
              onClick={handleCancelar}
              disabled={cancelando}
            >
              <AlertTriangle size={18} />
              {cancelando ? 'Cancelando...' : 'Cancelar Pedido'}
            </button>
          )}
        </div>
        
        {/* Stepper horizontal */}
        <div className="stepper-horizontal">
          <div className="stepper-linea-fondo"></div>
          <div className="stepper-linea-progreso" style={{ width: `${porcentajeProgreso}%` }}></div>

          {pasosLogistica.map((paso, index) => {
            const completado = index <= indiceActual;
            const esActual = index === indiceActual;
            const Icono = paso.icono;

            return (
              <div key={paso.estado} className={`stepper-item ${completado ? 'completado' : ''} ${esActual ? 'actual' : ''}`}>
                <div className="stepper-icon-box">
                  <Icono size={20} strokeWidth={completado ? 2.5 : 2} />
                </div>
                <div className="stepper-content">
                  <h4>{paso.titulo}</h4>
                  <p>{paso.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animación del camión */}
        <div className="animacion-track-container">
          <div className="pista">
            <div className="pista-progreso" style={{ width: `${porcentajeProgreso}%` }}></div>
            <div className="vehiculo-container" style={{ left: `${porcentajeProgreso}%` }}>
              <div className="camion-animado">
                <Truck size={36} color="#0056b3" />
              </div>
            </div>
            <div className="lineas-carretera"></div>
          </div>
        </div>

        <div className="seguimiento-footer">
          <Link to="/tienda/cuenta" className="btn-volver-centrado">
            <ArrowLeft size={20} />
            Volver a mis pedidos
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SeguimientoPedido;