import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // Estados principales de la aplicación
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Carga los productos desde el archivo JSON al iniciar la aplicación
  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    setCargando(true)
    setError('')

    try {
      const respuesta = await fetch('/data/productos.json')

      if (!respuesta.ok) {
        throw new Error('No fue posible cargar los productos.')
      }

      const datos = await respuesta.json()

      // Validación básica de la información recibida
      if (!Array.isArray(datos)) {
        throw new Error('El formato de los productos no es válido.')
      }

      setProductos(datos)
    } catch (errorCarga) {
      console.error('Error al cargar productos:', errorCarga)
      setError(
        'No pudimos cargar los productos. Puedes intentarlo nuevamente.'
      )
    } finally {
      setCargando(false)
    }
  }

  // Agrega un producto al carrito
  const agregarAlCarrito = (producto) => {
    const productoExiste = carrito.some(
      (item) => item.id === producto.id
    )

    if (!productoExiste) {
      setCarrito([...carrito, producto])
    }
  }

  // Elimina un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id))
  }

  // Vacía completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([])
  }

  // Filtra el catálogo según la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Calcula el precio total del carrito
  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.oferta,
    0
  )

  // Permite saber si un producto ya está agregado
  const estaEnCarrito = (id) =>
    carrito.some((producto) => producto.id === id)

  const formatearPrecio = (precio) =>
    precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
    })

  return (
    <div className="app">
      <header className="encabezado">
        <div className="container">
          <h1>DCgeek</h1>
          <p>Tu tienda de videojuegos</p>
        </div>
      </header>

      <main className="container contenido-principal">
        <section className="catalogo">
          <div className="titulo-seccion">
            <div>
              <h2>Catálogo de videojuegos</h2>
              <p>Encuentra tu próxima aventura.</p>
            </div>

            <span className="contador-carrito">
              🛒 {carrito.length}
            </span>
          </div>

          <div className="buscador">
            <label htmlFor="busqueda">Buscar videojuego</label>

            <input
              id="busqueda"
              type="search"
              placeholder="Ej: Hogwarts Legacy"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>

          {cargando && (
            <div className="mensaje estado-carga">
              <div className="spinner"></div>
              <p>Cargando productos...</p>
            </div>
          )}

          {!cargando && error && (
            <div className="mensaje mensaje-error">
              <p>{error}</p>

              <button
                type="button"
                className="btn-reintentar"
                onClick={cargarProductos}
              >
                Reintentar
              </button>
            </div>
          )}

          {!cargando &&
            !error &&
            productosFiltrados.length === 0 && (
              <div className="mensaje">
                <p>
                  No encontramos productos que coincidan con tu búsqueda.
                </p>
                <p>Prueba utilizando otro nombre.</p>
              </div>
            )}

          {!cargando && !error && productosFiltrados.length > 0 && (
            <div className="grid-productos">
              {productosFiltrados.map((producto) => {
                const agregado = estaEnCarrito(producto.id)

                return (
                  <article className="producto-card" key={producto.id}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="producto-imagen"
                    />

                    <div className="producto-info">
                      <h3>{producto.nombre}</h3>

                      <p className="descripcion">
                        {producto.descripcion}
                      </p>

                      <div className="precios">
                        <span className="precio-original">
                          {formatearPrecio(producto.precio)}
                        </span>

                        <span className="precio-oferta">
                          {formatearPrecio(producto.oferta)}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={
                          agregado
                            ? 'btn-producto agregado'
                            : 'btn-producto'
                        }
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={agregado}
                      >
                        {agregado
                          ? '✓ En el carrito'
                          : 'Agregar al carrito'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <aside className="carrito">
          <h2>Carrito de compras</h2>

          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <p>🛒</p>
              <p>Tu carrito está vacío.</p>
              <small>
                Agrega un videojuego para comenzar tu compra.
              </small>
            </div>
          ) : (
            <>
              <div className="lista-carrito">
                {carrito.map((producto) => (
                  <div
                    className="item-carrito"
                    key={producto.id}
                  >
                    <div>
                      <strong>{producto.nombre}</strong>
                      <span>
                        {formatearPrecio(producto.oferta)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() =>
                        eliminarDelCarrito(producto.id)
                      }
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="resumen-carrito">
                <div>
                  <span>Productos:</span>
                  <strong>{carrito.length}</strong>
                </div>

                <div className="total">
                  <span>Total:</span>
                  <strong>
                    {formatearPrecio(totalCarrito)}
                  </strong>
                </div>

                <button
                  type="button"
                  className="btn-vaciar"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </aside>
      </main>

      <footer>
        <p>DCgeek © 2026 - Desarrollo Frontend I</p>
      </footer>
    </div>
  )
}

export default App