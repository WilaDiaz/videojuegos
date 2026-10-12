import { useState } from "react"

function FormularioContacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const manejarCambio = (event) => {
    const { name, value } = event.target

    setFormulario({
      ...formulario,
      [name]: value,
    })

    setEnviado(false)
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio."
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      nuevosErrores.email = "Ingresa un correo electrónico válido."
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio."
    }

    return nuevosErrores
  }

  const manejarEnvio = (event) => {
    event.preventDefault()

    const nuevosErrores = validarFormulario()

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      setEnviado(false)
      return
    }

    setErrores({})
    setEnviado(true)

    setFormulario({
      nombre: "",
      email: "",
      mensaje: "",
    })
  }

  return (
    <section id="contacto" className="contacto-section">
      <div className="container">
        <div className="contacto-contenido">
          <h2>Contáctanos</h2>

          <p>
            ¿Tienes alguna consulta? Envíanos un mensaje y nos pondremos
            en contacto contigo.
          </p>

          {enviado && (
            <div className="alert alert-success" role="alert">
              ¡Mensaje enviado correctamente!
            </div>
          )}

          <form onSubmit={manejarEnvio} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>

              <input
                type="text"
                id="nombre"
                name="nombre"
                className={`form-control ${
                  errores.nombre ? "is-invalid" : ""
                }`}
                value={formulario.nombre}
                onChange={manejarCambio}
              />

              {errores.nombre && (
                <div className="invalid-feedback">
                  {errores.nombre}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  errores.email ? "is-invalid" : ""
                }`}
                value={formulario.email}
                onChange={manejarCambio}
              />

              {errores.email && (
                <div className="invalid-feedback">
                  {errores.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>

              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                className={`form-control ${
                  errores.mensaje ? "is-invalid" : ""
                }`}
                value={formulario.mensaje}
                onChange={manejarCambio}
              ></textarea>

              {errores.mensaje && (
                <div className="invalid-feedback">
                  {errores.mensaje}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormularioContacto
