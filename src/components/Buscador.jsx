function Buscador({ busqueda, setBusqueda, categoria, setCategoria }) {
  return (
    <section className="mb-4" aria-label="Filtros del catálogo">
      <div className="row g-3">
        <div className="col-md-8">
          <label htmlFor="busqueda" className="form-label fw-semibold">
            Buscar videojuego
          </label>

          <input
            id="busqueda"
            type="search"
            className="form-control"
            placeholder="Ej: Hogwarts Legacy"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="categoria" className="form-label fw-semibold">
            Categoría
          </label>

          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Aventura">Aventura</option>
            <option value="Simulación">Simulación</option>
            <option value="Lucha">Lucha</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default Buscador
