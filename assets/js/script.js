// Contenedor donde se mostrarán los productos
const listaProductos = document.getElementById("lista-productos");

// Buscador de productos
const formularioBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("busqueda");

formularioBusqueda.addEventListener("submit", async function (event) {
    event.preventDefault();

    const texto = inputBusqueda.value.toLowerCase().trim();

    try {
        const respuesta = await fetch("assets/data/productos.json");
        const productos = await respuesta.json();

        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(texto)
        );

        mostrarProductos(productosFiltrados);

    } catch (error) {
        console.error("Error al buscar productos:", error);
    }
});


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


// Carrito de compras
let carrito = [];
let totalCarrito = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    totalCarrito += precio;

    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total-carrito");

    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between";

    item.innerHTML = `
        <span>${nombre}</span>
        <span>$${precio.toLocaleString("es-CL")}</span>
    `;

    listaCarrito.appendChild(item);
    total.textContent = totalCarrito.toLocaleString("es-CL");
}

// Ejecuta la carga de productos al iniciar la página
cargarProductos();