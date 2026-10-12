function ProductoCard({
  producto,
  agregarAlCarrito,
  estaEnCarrito,
  formatearPrecio,
}) {
  const agregado = estaEnCarrito(producto.id)

  return (
    <article className="card h-100 shadow-sm">
      <img
        src={`${import.meta.env.BASE_URL}${producto.imagen}`}
        className="card-img-top"
        alt={`Portada de ${producto.nombre}`}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">
          {producto.categoria}
        </span>

        <h3 className="card-title h5">{producto.nombre}</h3>

        <p className="card-text">{producto.descripcion}</p>

        <div className="mt-auto">
          <p className="text-decoration-line-through text-muted mb-1">
            {formatearPrecio(producto.precio)}
          </p>

          <p className="fw-bold fs-5 mb-3">
            {formatearPrecio(producto.oferta)}
          </p>

          <button
            type="button"
            className={`btn w-100 ${
              agregado ? "btn-success" : "btn-primary"
            }`}
            onClick={() => agregarAlCarrito(producto)}
            disabled={agregado}
          >
            {agregado ? "✓ En el carrito" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductoCard
