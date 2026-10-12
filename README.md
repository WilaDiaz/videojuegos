# DCgeek 🎮

DCgeek es una aplicación web desarrollada como proyecto para la asignatura **Desarrollo Frontend I (PFY2201)**.

El proyecto corresponde a una tienda de videojuegos que permite visualizar un catálogo dinámico, buscar y filtrar productos, agregar videojuegos a un carrito de compras y utilizar un formulario de contacto con validaciones.

## Funcionalidades

- Catálogo de videojuegos cargado dinámicamente desde un archivo JSON.
- Búsqueda de videojuegos por nombre.
- Filtrado de productos por categoría.
- Visualización de precio normal y precio de oferta.
- Carrito de compras.
- Agregar y eliminar productos del carrito.
- Cálculo automático del total de la compra.
- Persistencia del carrito mediante LocalStorage.
- Formulario de contacto con validación de datos.
- Mensajes de error y confirmación en el formulario.
- Manejo de estados de carga y errores del catálogo.
- Navegación mediante Navbar.
- Diseño responsivo para diferentes tamaños de pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Bootstrap 5
- JSON
- LocalStorage
- Git
- GitHub
- GitHub Pages

## Estructura principal del proyecto

```text
videojuegos/
├── public/
│   ├── data/
│   │   └── productos.json
│   └── img/
├── src/
│   ├── components/
│   │   ├── Buscador.jsx
│   │   ├── Carrito.jsx
│   │   ├── Catalogo.jsx
│   │   ├── FormularioContacto.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductoCard.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Componentes principales

### Navbar

Permite navegar entre las secciones **Inicio**, **Catálogo** y **Contacto**.

### Buscador

Permite buscar videojuegos por nombre y filtrarlos según su categoría.

### Catalogo

Recibe los productos filtrados y genera dinámicamente las tarjetas del catálogo.

### ProductoCard

Muestra la información individual de cada videojuego y permite agregarlo al carrito.

### Carrito

Muestra los productos seleccionados, permite eliminarlos o vaciar el carrito y calcula el total de la compra.

### FormularioContacto

Permite ingresar nombre, correo electrónico y mensaje. Incluye validaciones antes de aceptar el envío.

## Instalación

Para ejecutar el proyecto de manera local se debe contar con **Node.js y npm** instalados.

1. Clonar o descargar el repositorio.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en el navegador la dirección local indicada por Vite.

En Windows PowerShell, si la ejecución de `npm` está restringida, se pueden utilizar los siguientes comandos:

```powershell
npm.cmd install
npm.cmd run dev
```

## Uso

1. Ingresar al catálogo de DCgeek.
2. Utilizar el buscador para localizar un videojuego por nombre.
3. Seleccionar una categoría para filtrar los productos.
4. Presionar **Agregar al carrito** para seleccionar un videojuego.
5. Revisar los productos y el total en el carrito.
6. Utilizar **Eliminar** para quitar un producto o **Vaciar carrito** para eliminar todos.
7. El carrito se conserva al actualizar la página gracias a LocalStorage.
8. Utilizar el formulario de contacto ingresando nombre, correo electrónico y mensaje.
9. Si los datos no son válidos, el formulario muestra el error correspondiente.

## Diseño responsivo

La interfaz utiliza **Bootstrap 5, CSS Grid, Flexbox y media queries** para adaptar el contenido a diferentes tamaños de pantalla.

## Autor

**Wilangely Diaz**

Proyecto desarrollado para la asignatura **Desarrollo Frontend I (PFY2201)**.
