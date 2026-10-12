import { useEffect, useState } from "react"
import "./App.css"

import Navbar from "./components/Navbar"
import Buscador from "./components/Buscador"
import Catalogo from "./components/Catalogo"
import Carrito from "./components/Carrito"
import FormularioContacto from "./components/FormularioContacto"

function App() {
  // Estados principales de la aplicación
  const [productos, setProductos] = useState([])

  // Recupera el carrito guardado en el navegador
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem("dcgeek-carrito")
      return carritoGuardado ? JSON.parse(carritoGuardado) : []
    } catch {
      return []
    }
  })

  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("Todas")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  // Carga los productos desde el archivo JSON
  useEffect(() => {
    cargarProductos()
  }, [])

  // Guarda el carrito en el navegador cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
      "dcgeek-carrito",
      JSON.stringify(carrito)
    )
  }, [carrito])

  const cargarProductos = async () => {
    setCargando(true)
    setError("")

    try {
      const respuesta = await fetch(
        `${import.meta.env.BASE_URL}data/productos.json`
      )

      if (!respuesta.ok) {
        throw new Error("No fue posible cargar los productos.")
      }

      const datos = await respuesta.json()

      // Valida que la respuesta sea un arreglo
      if (!Array.isArray(datos)) {
        throw new Error("El formato de los productos no es válido.")
      }

      setProductos(datos)
    } catch (errorCarga) {
      console.error("Error al cargar productos:", errorCarga)

      setError(
        "No pudimos cargar los productos. Puedes intentarlo nuevamente."
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
    setCarrito(
      carrito.filter((producto) => producto.id !== id)
    )
  }

  // Vacía completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([])
  }

  // Permite saber si un producto ya está agregado
  const estaEnCarrito = (id) =>
    carrito.some((producto) => producto.id === id)

  // Filtra por nombre y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideCategoria =
      categoria === "Todas" ||
      producto.categoria === categoria

    return coincideBusqueda && coincideCategoria
  })

  // Calcula el precio total del carrito
  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.oferta,
    0
  )

  // Formatea los precios en pesos chilenos
  const formatearPrecio = (precio) =>
    precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    })

  return (
    <div className="app">
      <Navbar />

      <header id="inicio" className="encabezado">
        <div className="container">
          <h1>DCgeek</h1>
          <p>Tu tienda de videojuegos</p>
        </div>
      </header>

      <main className="container contenido-principal">
        <section id="catalogo" className="catalogo">
          <div className="titulo-seccion">
            <div>
              <h2>Catálogo de videojuegos</h2>
              <p>Encuentra tu próxima aventura.</p>
            </div>

            <span className="contador-carrito">
              🛒 {carrito.length}
            </span>
          </div>

          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            categoria={categoria}
            setCategoria={setCategoria}
          />

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
                className="btn btn-danger"
                onClick={cargarProductos}
              >
                Reintentar
              </button>
            </div>
          )}

          {!cargando && !error && (
            <Catalogo
              productos={productosFiltrados}
              agregarAlCarrito={agregarAlCarrito}
              estaEnCarrito={estaEnCarrito}
              formatearPrecio={formatearPrecio}
            />
          )}
        </section>

        <div className="carrito">
          <Carrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            vaciarCarrito={vaciarCarrito}
            totalCarrito={totalCarrito}
            formatearPrecio={formatearPrecio}
          />
        </div>
      </main>

      <FormularioContacto />

      <footer>
        <p>DCgeek © 2026 - Desarrollo Frontend I</p>
      </footer>
    </div>
  )
}

export default App
