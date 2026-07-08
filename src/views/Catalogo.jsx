import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Catalogo.css';

const Catalogo = () => {
  const { idCategoria } = useParams(); 
  const navigate = useNavigate(); // Para poder redireccionar al limpiar filtros
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState('destacados');

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        let url = 'http://localhost:3000/api/productos';
        
        // Si hay una categoría en la URL, se la mandamos al backend
        if (idCategoria) {
          url += `?categoria_id=${idCategoria}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [idCategoria]); 

  // Obtenemos el nombre de la categoría actual usando el primer producto (si existe)
  const nombreCategoriaActual = (idCategoria && productos.length > 0) 
    ? productos[0].categoria?.nombre 
    : null;

  return (
    <div className="catalogo-page-container">
      <div className="catalogo-layout">
        
        {/* =========================================
            SIDEBAR (FILTROS Y SUBCATEGORÍAS) 
            ========================================= */}
        <aside className="sidebar-filtros">
          
          {/* BOTÓN PARA LIMPIAR FILTROS (Solo aparece si estás dentro de una categoría) */}
          {idCategoria && (
            <div className="grupo-filtro" style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => navigate('/tienda/catalogo')}
                style={{
                  width: '100%', padding: '10px', backgroundColor: '#e6f0fa',
                  color: '#0056b3', border: '1px solid #0056b3', borderRadius: '6px',
                  cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                ← Ver todos los productos
              </button>
            </div>
          )}

          {/* SUBCATEGORÍAS DINÁMICAS */}
          {idCategoria ? (
            <div className="grupo-filtro">
              <h4>Subcategorías de {nombreCategoriaActual || 'esta sección'}</h4>
              <ul className="lista-filtros">
                {/* Aquí en el futuro mapearás las subcategorías reales desde tu BD */}
                <li><label><input type="checkbox" /> Equipos Portátiles</label></li>
                <li><label><input type="checkbox" /> Equipos de Banco</label></li>
                <li><label><input type="checkbox" /> Sensores Industriales</label></li>
                <li><label><input type="checkbox" /> Accesorios</label></li>
              </ul>
            </div>
          ) : (
            <div className="grupo-filtro">
              <h4>Todas las Categorías</h4>
              <ul className="lista-filtros">
                <li><label><input type="checkbox" /> Analítica</label></li>
                <li><label><input type="checkbox" /> Variables de Procesos</label></li>
                <li><label><input type="checkbox" /> Laboratorio</label></li>
                <li><label><input type="checkbox" /> SSOMA</label></li>
              </ul>
            </div>
          )}

          <div className="grupo-filtro">
            <h4>Disponibilidad</h4>
            <ul className="lista-filtros">
              <li><label><input type="checkbox" /> En Stock (Envío inmediato)</label></li>
              <li><label><input type="checkbox" /> Bajo pedido</label></li>
            </ul>
          </div>
          
          <div className="grupo-filtro">
            <h4>Rango de Precio</h4>
            <ul className="lista-filtros">
              <li><label><input type="radio" name="precio" /> Menos de S/ 500</label></li>
              <li><label><input type="radio" name="precio" /> S/ 500 a S/ 1500</label></li>
              <li><label><input type="radio" name="precio" /> Más de S/ 1500</label></li>
            </ul>
          </div>
        </aside>

        {/* =========================================
            CONTENIDO PRINCIPAL 
            ========================================= */}
        <main className="contenido-resultados">
          
          <header className="cabecera-resultados">
            <div className="texto-resultados">
              {/* Título dinámico: Muestra la categoría si existe, o "toda la tienda" */}
              <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '8px' }}>
                {idCategoria ? nombreCategoriaActual : 'Catálogo Completo'}
              </h1>
              1 - {productos.length} resultados encontrados
            </div>
            
            <div className="caja-ordenar">
              <label>Ordenar por: </label>
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="destacados">Destacados</option>
                <option value="precio-bajo">Precio: De más bajo a más alto</option>
                <option value="precio-alto">Precio: De más alto a más bajo</option>
                <option value="recientes">Llegadas más recientes</option>
              </select>
            </div>
          </header>

          {cargando ? (
            <p>Cargando catálogo...</p>
          ) : productos.length === 0 ? (
            <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <h3>No hay productos en esta categoría aún.</h3>
              <p>Estamos trabajando para traer los mejores equipos pronto.</p>
            </div>
          ) : (
            <div className="grilla-catalogo">
              {productos.map(prod => (
                <Link to={`/producto/${prod.id}`} key={prod.id} className="tarjeta-catalogo">
                  <div className="tarjeta-img-box">
                    <img 
                      src={prod.imagen_principal_url ? `http://localhost:3000${prod.imagen_principal_url}` : 'https://via.placeholder.com/200'} 
                      alt={prod.nombre} 
                    />
                  </div>
                  <div className="tarjeta-marca">{prod.categoria?.nombre || 'CERTIMET'}</div>
                  <h3 className="tarjeta-titulo">{prod.nombre}</h3>
                  <div className="tarjeta-precio">
                    <span>S/</span>{Number(prod.precio_regular).toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Catalogo;