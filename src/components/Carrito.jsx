function Carrito({
  carrito,
  eliminarDelCarrito,
  vaciarCarrito,
  totalCarrito,
  formatearPrecio,
}) {
  return (
    <aside className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">
          🛒 Carrito ({carrito.length})
        </h2>

        {carrito.length === 0 ? (
          <div className="alert alert-light text-center mb-0">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <div className="list-group mb-3">
              {carrito.map((producto) => (
                <div
                  className="list-group-item"
                  key={producto.id}
                >
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h3 className="h6 mb-1">
                        {producto.nombre}
                      </h3>

                      <span className="fw-semibold">
                        {formatearPrecio(producto.oferta)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarDelCarrito(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3">
              <p className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>{formatearPrecio(totalCarrito)}</span>
              </p>

              <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

export default Carrito
