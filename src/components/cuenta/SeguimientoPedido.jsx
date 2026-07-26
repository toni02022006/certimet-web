import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Truck, MapPin, Home, XCircle } from 'lucide-react';
import './SeguimientoPedido.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const SeguimientoPedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
        }
      } catch (error) {
        console.error("Error fetching pedido:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id, token]);

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

  return (
    <div className="seguimiento-page">
      <div className="seguimiento-container">
        
        {/* CABECERA LIMPIA */}
        <div className="seguimiento-header">
          <div className="seguimiento-titulo-grupo">
            <h2>Seguimiento del Pedido <span>#{pedido.id}</span></h2>
            <p className="seguimiento-fecha">
              Realizado el: {new Date(pedido.fecha_pedido).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {/* FILA 1: ESTADOS (STEPPER HORIZONTAL) */}
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

        {/* FILA 2: ANIMACIÓN DEL CAMIÓN EN LA PISTA */}
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

        {/* FILA 3: BOTÓN DE VOLVER (NUEVO DISEÑO) */}
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