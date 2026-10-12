import ProductoCard from "./ProductoCard"

function Catalogo({
  productos,
  agregarAlCarrito,
  estaEnCarrito,
  formatearPrecio,
}) {
  if (productos.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        No se encontraron videojuegos que coincidan con la búsqueda o categoría.
      </div>
    )
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
          <ProductoCard
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
            estaEnCarrito={estaEnCarrito}
            formatearPrecio={formatearPrecio}
          />
        </div>
      ))}
    </div>
  )
}

export default Catalogo
