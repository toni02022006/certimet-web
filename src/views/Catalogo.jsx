import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Catalogo.css';

const Catalogo = () => {
  // Si la ruta es /tienda/categoria/2, idCategoria valdrá 2. Si es /tienda, será undefined.
  const { idCategoria } = useParams(); 
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // Estado para el combo de Amazon "Ordenar por"
  const [orden, setOrden] = useState('destacados');

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        // Aquí armas la URL dependiendo de si estás viendo una categoría o todo
        let url = 'http://localhost:3000/api/productos';
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
  }, [idCategoria]); // Se vuelve a ejecutar si cambias de categoría

  return (
    <div className="catalogo-page-container">
      <div className="catalogo-layout">
        
        {/* =========================================
            SIDEBAR (FILTROS) 
            ========================================= */}
        <aside className="sidebar-filtros">
          <div className="grupo-filtro">
            <h4>Disponibilidad</h4>
            <ul className="lista-filtros">
              <li>
                <label><input type="checkbox" /> En Stock (Envío inmediato)</label>
              </li>
              <li>
                <label><input type="checkbox" /> Bajo pedido</label>
              </li>
            </ul>
          </div>

          <div className="grupo-filtro">
            <h4>Categorías</h4>
            <ul className="lista-filtros">
              <li><label><input type="checkbox" /> Analítica</label></li>
              <li><label><input type="checkbox" /> Variables de Procesos</label></li>
              <li><label><input type="checkbox" /> Laboratorio</label></li>
              <li><label><input type="checkbox" /> SSOMA</label></li>
              <li><label><input type="checkbox" /> Calidad de Ambiente</label></li>
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
          
          {/* Cabecera Amazon-style */}
          <header className="cabecera-resultados">
            <div className="texto-resultados">
              1 - {productos.length} de más de {productos.length} resultados <strong>{idCategoria ? 'en esta categoría' : 'en toda la tienda'}</strong>
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

          {/* Grilla de Productos */}
          {cargando ? (
            <p>Cargando catálogo...</p>
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