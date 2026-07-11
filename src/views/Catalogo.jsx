import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Catalogo.css';

const Catalogo = () => {
  const { idCategoria } = useParams(); 
  const navigate = useNavigate();
  
  const [productosBase, setProductosBase] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // ================= ESTADOS DE FILTROS =================
  const [orden, setOrden] = useState('destacados');
  const [filtros, setFiltros] = useState({
    marcas: [],
    categorias: [],
    subcategorias: [],
    precio: 'todos',
    disponibilidad: 'todos'
  });

  // ================= ESTADOS DE ACORDEONES =================
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    categorias: true,
    marcas: true,
    precio: true,
    disponibilidad: true
  });

  // Estado para expandir/contraer las subcategorías dentro del filtro de categorías
  const [catExpandidas, setCatExpandidas] = useState({}); 

  // ================= CARGA DE DATOS =================
  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        let url = 'http://localhost:3000/api/productos';
        if (idCategoria) {
          url += `?categoria_id=${idCategoria}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProductosBase(data);
        }
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, [idCategoria]); 

  // ================= EXTRACCIÓN DINÁMICA DE DATOS =================
  
  // 1. Extraer Marcas Únicas
  const marcasDisponibles = useMemo(() => {
    const marcas = productosBase.map(p => p.marca?.nombre || p.marca || 'Sin Marca');
    return [...new Set(marcas)].filter(m => m !== 'Sin Marca'); 
  }, [productosBase]);

  // 2. Extraer Categorías y Subcategorías estructuradas
  const categoriasEstructura = useMemo(() => {
    const estructura = {};
    productosBase.forEach(p => {
      const cat = p.categoria?.nombre || p.categoria || 'Sin Categoría';
      const subcat = p.subcategoria?.nombre || p.subcategoria || null;
      
      if (cat !== 'Sin Categoría') {
        if (!estructura[cat]) {
          estructura[cat] = new Set();
        }
        if (subcat) {
          estructura[cat].add(subcat);
        }
      }
    });
    return estructura;
  }, [productosBase]);

  // ================= LÓGICA DE FILTRADO Y ORDENAMIENTO =================
  const productosProcesados = useMemo(() => {
    let resultado = [...productosBase];

    // Filtro por Marca
    if (filtros.marcas.length > 0) {
      resultado = resultado.filter(p => {
        const marcaProd = p.marca?.nombre || p.marca;
        return filtros.marcas.includes(marcaProd);
      });
    }

    // Filtro por Categoría Principal
    if (filtros.categorias.length > 0) {
      resultado = resultado.filter(p => {
        const catProd = p.categoria?.nombre || p.categoria;
        return filtros.categorias.includes(catProd);
      });
    }

    // Filtro por Subcategoría
    if (filtros.subcategorias.length > 0) {
      resultado = resultado.filter(p => {
        const subCatProd = p.subcategoria?.nombre || p.subcategoria;
        return filtros.subcategorias.includes(subCatProd);
      });
    }

    // Filtro por Precio
    if (filtros.precio !== 'todos') {
      resultado = resultado.filter(p => {
        const precio = Number(p.precio_regular);
        if (filtros.precio === 'menos-500') return precio < 500;
        if (filtros.precio === '500-1500') return precio >= 500 && precio <= 1500;
        if (filtros.precio === 'mas-1500') return precio > 1500;
        return true;
      });
    }

    // Ordenamiento
    switch (orden) {
      case 'precio-bajo':
        resultado.sort((a, b) => Number(a.precio_regular) - Number(b.precio_regular));
        break;
      case 'precio-alto':
        resultado.sort((a, b) => Number(b.precio_regular) - Number(a.precio_regular));
        break;
      case 'recientes':
        resultado.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'destacados' (Mantiene el orden original o lógica de 'is_destacado')
        break;
    }

    return resultado;
  }, [productosBase, filtros, orden]);

  // ================= HANDLERS =================
  const toggleSeccion = (seccion) => {
    setSeccionesAbiertas(prev => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const toggleCatExpandida = (cat) => {
    setCatExpandidas(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleCheckboxChange = (tipo, valor) => {
    setFiltros(prev => {
      const actual = prev[tipo];
      const nuevo = actual.includes(valor) ? actual.filter(v => v !== valor) : [...actual, valor];
      return { ...prev, [tipo]: nuevo };
    });
  };

  const nombreCategoriaActual = (idCategoria && productosBase.length > 0) 
    ? (productosBase[0].categoria?.nombre || productosBase[0].categoria)
    : null;

  return (
    <div className="catalogo-page-container">
      <div className="catalogo-layout">
        
        {/* =========================================
            SIDEBAR (FILTROS Y SUBCATEGORÍAS) 
            ========================================= */}
        <aside className="sidebar-filtros">
          <div className="filtros-header-box">
            <h3 className="titulo-seccion-filtros">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filtros
            </h3>
          </div>

          {/* Botón Limpiar Todos */}
          {(filtros.marcas.length > 0 || filtros.categorias.length > 0 || filtros.subcategorias.length > 0 || filtros.precio !== 'todos' || idCategoria) && (
            <button 
              className="btn-limpiar-filtros"
              onClick={() => {
                setFiltros({ marcas: [], categorias: [], subcategorias: [], precio: 'todos', disponibilidad: 'todos' });
                if (idCategoria) navigate('/tienda/catalogo');
              }}
            >
              Limpiar todos los filtros
            </button>
          )}

          {/* ACORDEÓN: CATEGORÍAS Y SUBCATEGORÍAS */}
          {Object.keys(categoriasEstructura).length > 0 && (
            <div className={`grupo-filtro ${seccionesAbiertas.categorias ? 'abierto' : 'cerrado'}`}>
              <h4 onClick={() => toggleSeccion('categorias')}>
                Categorías
                <span className="flecha-acordeon">▼</span>
              </h4>
              <div className="contenido-filtro">
                <ul className="lista-filtros">
                  {Object.keys(categoriasEstructura).map((cat, idx) => {
                    const subcategorias = Array.from(categoriasEstructura[cat]);
                    const tieneSubcats = subcategorias.length > 0;
                    const estaExpandida = catExpandidas[cat];

                    return (
                      <li key={idx} className="item-categoria-arbol">
                        <div className="categoria-padre-fila">
                          {tieneSubcats && (
                            <button className="btn-expandir-sub" onClick={() => toggleCatExpandida(cat)}>
                              {estaExpandida ? '−' : '+'}
                            </button>
                          )}
                          <label className={tieneSubcats ? 'con-espacio' : 'sin-espacio'}>
                            <input 
                              type="checkbox" 
                              checked={filtros.categorias.includes(cat)}
                              onChange={() => handleCheckboxChange('categorias', cat)}
                            /> 
                            <span className="checkbox-custom"></span>
                            {cat}
                          </label>
                        </div>
                        
                        {/* Subcategorías desplegables */}
                        {tieneSubcats && estaExpandida && (
                          <ul className="lista-subcategorias">
                            {subcategorias.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <label>
                                  <input 
                                    type="checkbox" 
                                    checked={filtros.subcategorias.includes(sub)}
                                    onChange={() => handleCheckboxChange('subcategorias', sub)}
                                  />
                                  <span className="checkbox-custom"></span>
                                  {sub}
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* ACORDEÓN: MARCAS */}
          {marcasDisponibles.length > 0 && (
            <div className={`grupo-filtro ${seccionesAbiertas.marcas ? 'abierto' : 'cerrado'}`}>
              <h4 onClick={() => toggleSeccion('marcas')}>
                Marcas
                <span className="flecha-acordeon">▼</span>
              </h4>
              <div className="contenido-filtro">
                <ul className="lista-filtros">
                  {marcasDisponibles.map((marca, idx) => (
                    <li key={idx}>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={filtros.marcas.includes(marca)}
                          onChange={() => handleCheckboxChange('marcas', marca)}
                        /> 
                        <span className="checkbox-custom"></span>
                        {marca}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ACORDEÓN: PRECIO */}
          <div className={`grupo-filtro ${seccionesAbiertas.precio ? 'abierto' : 'cerrado'}`}>
            <h4 onClick={() => toggleSeccion('precio')}>
              Rango de Precio
              <span className="flecha-acordeon">▼</span>
            </h4>
            <div className="contenido-filtro">
              <ul className="lista-filtros radio-list">
                <li>
                  <label>
                    <input type="radio" name="precio" checked={filtros.precio === 'todos'} onChange={() => setFiltros({...filtros, precio: 'todos'})} /> 
                    Todos los precios
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="precio" checked={filtros.precio === 'menos-500'} onChange={() => setFiltros({...filtros, precio: 'menos-500'})} /> 
                    Menos de S/ 500
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="precio" checked={filtros.precio === '500-1500'} onChange={() => setFiltros({...filtros, precio: '500-1500'})} /> 
                    S/ 500 a S/ 1500
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="precio" checked={filtros.precio === 'mas-1500'} onChange={() => setFiltros({...filtros, precio: 'mas-1500'})} /> 
                    Más de S/ 1500
                  </label>
                </li>
              </ul>
            </div>
          </div>

          {/* ACORDEÓN: DISPONIBILIDAD */}
          <div className={`grupo-filtro ${seccionesAbiertas.disponibilidad ? 'abierto' : 'cerrado'}`}>
            <h4 onClick={() => toggleSeccion('disponibilidad')}>
              Disponibilidad
              <span className="flecha-acordeon">▼</span>
            </h4>
            <div className="contenido-filtro">
              <ul className="lista-filtros radio-list">
                <li><label><input type="radio" name="disp" defaultChecked /> Todos</label></li>
                <li><label><input type="radio" name="disp" /> En Stock (Envío inmediato)</label></li>
                <li><label><input type="radio" name="disp" /> Bajo pedido</label></li>
              </ul>
            </div>
          </div>

        </aside>

        {/* =========================================
            CONTENIDO PRINCIPAL 
            ========================================= */}
        <main className="contenido-resultados">
          
          <header className="cabecera-resultados">
            <div className="texto-resultados">
              <h1 className="titulo-principal-cat">
                {idCategoria ? nombreCategoriaActual : 'Catálogo Completo'}
              </h1>
              <p className="conteo-resultados">
                Mostrando <strong>{productosProcesados.length}</strong> resultados
              </p>
            </div>
            
            <div className="caja-ordenar">
              <label>Ordenar por: </label>
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="destacados">Relevancia / Destacados</option>
                <option value="precio-bajo">Precio: De menor a mayor</option>
                <option value="precio-alto">Precio: De mayor a menor</option>
                <option value="recientes">Llegadas más recientes</option>
              </select>
            </div>
          </header>

          {cargando ? (
            <div className="cargando-spinner">Cargando catálogo...</div>
          ) : productosProcesados.length === 0 ? (
            <div className="estado-vacio">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar o limpiar los filtros para ver más resultados.</p>
            </div>
          ) : (
            <div className="grilla-catalogo">
              {productosProcesados.map(prod => (
                <Link to={`/producto/${prod.id}`} key={prod.id} className="tarjeta-catalogo">
                  
                  <div className="tarjeta-img-box">
                    <img 
                      src={prod.imagen_principal_url ? `http://localhost:3000${prod.imagen_principal_url}` : 'https://via.placeholder.com/200'} 
                      alt={prod.nombre} 
                    />
                  </div>
                  
                  <div className="tarjeta-info">
                    <div className="tarjeta-marca">{prod.categoria?.nombre || prod.marca?.nombre || 'CERTIMET'}</div>
                    <h3 className="tarjeta-titulo">{prod.nombre}</h3>
                    <p className="tarjeta-sku">SKU: {prod.sku || 'N/A'}</p>
                    
                    <div className="tarjeta-precio-caja">
                      <div className="tarjeta-precio">
                        <span>S/</span> {Number(prod.precio_regular).toFixed(2)}
                      </div>
                      <span className="tarjeta-igv">Inc. IGV</span>
                    </div>
                  </div>
                  
                  <div className="tarjeta-hover-btn">
                    Ver Detalles del Equipo
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