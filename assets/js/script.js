// Contenedor donde se mostrarán los productos
const listaProductos = document.getElementById("lista-productos");

// Carga los productos desde el archivo JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch("assets/data/productos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        const productos = await respuesta.json();

        mostrarProductos(productos);

    } catch (error) {
        listaProductos.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    No fue posible cargar los productos. Inténtalo nuevamente.
                </div>
            </div>
        `;

        console.error("Error al cargar los productos:", error);
    }
}

// Muestra los productos en la página
function mostrarProductos(productos) {
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        listaProductos.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 producto">
                    <img src="${producto.imagen}"
                         class="card-img-top"
                         alt="Videojuego ${producto.nombre}">

                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${producto.nombre}</h3>

                        <p class="card-text">
                            ${producto.descripcion}
                        </p>

                        <p class="fw-bold">
                            $${producto.precio.toLocaleString("es-CL")}
                        </p>

                        <span class="badge text-bg-secondary mb-3">
                            ${producto.categoria}
                        </span>

                        <button class="btn btn-primary mt-auto"
                     onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                        Agregar al carrito
                    </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Ejecuta la carga de productos al iniciar la página
cargarProductos();