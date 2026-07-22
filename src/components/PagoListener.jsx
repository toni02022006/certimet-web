import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCarrito } from '../context/CarritoContext';
/*Aqui en la url cambia de acuerdo al backen de ngrock hasta subir a produccion*/
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://c71a-201-218-159-227.ngrok-free.app';

const PagoListener = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cargarCarrito } = useCarrito();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('collection_status') || params.get('status');
    const paymentId = params.get('payment_id') || params.get('collection_id');

    if (!status || !paymentId) return;

    const confirmar = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pedidos/confirmar-pago`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_id: paymentId })
        });
        const data = await res.json();

        if (res.ok && data.estado === 'approved') {
          await cargarCarrito(); // recarga el carrito (ya vacío en el backend)
          Swal.fire({
            title: '¡Pago confirmado!',
            text: 'Tu pedido fue registrado como pagado.',
            icon: 'success',
            confirmButtonColor: '#00c652',
          });
        } else if (data.estado === 'pending' || data.estado === 'in_process') {
          Swal.fire({
            title: 'Pago pendiente',
            text: 'Tu pago está siendo procesado por Mercado Pago.',
            icon: 'info',
          });
        } else if (status !== 'approved') {
          Swal.fire({
            title: 'Pago no completado',
            text: 'No se pudo confirmar tu pago.',
            icon: 'error',
          });
        }
      } catch (err) {
        console.error('Error confirmando pago:', err);
      } finally {
        // Limpia los parámetros de la URL sin recargar la página
        navigate(location.pathname, { replace: true });
      }
    };

    confirmar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return null;
};

export default PagoListener;