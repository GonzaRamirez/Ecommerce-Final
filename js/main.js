const carrito = JSON.parse(localStorage.getItem("carrito")) ??  []
const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
const carritoCantidad = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
document.getElementById("carrito-total").innerHTML = `${carritoCantidad} - $${total}`

// DOM
let titulo = document.getElementById("titulo")
console.log(titulo.innerText)
titulo.innerHTML = `<h1 class="titulo text-dark" href="index.html">IBIZA STORE</h1>`

// Cards productos
function cardsProductos() {
    productos.forEach((producto) => {
        const idButton = `add-cart-${producto.id}`
        document.getElementById("cardsdinamicas").innerHTML += 
        `<div class="card col-3 m-2">
        <img src="${producto.img}" class="card-img-top" alt="">
        <div class="card-body">
        <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
        <p class="card-text">${producto.descripcion} <br> <strong>Precio: $ ${producto.precio}</strong></p>
        <a id="${idButton}" data-id="${producto.id}" class="btn btn-warning text-center">Añadir al carrito</a>
        </div>
        </div>`})}

// Fetch
fetch('js/productos.json')
    .then((res) => res.json())
    .then((productosjson) => { 
        productos = productosjson
        console.log(productos)
        cardsProductos(productos)
        agregarAlCarrito()})

// Filtrado por categorias
function filtrarCategoria(categoria) { 
    const productosFiltrados = productos.filter((producto) => producto.categoria === categoria)
    document.getElementById("cardsdinamicas").innerHTML = ""
    productosFiltrados.forEach((producto) => {
        const idButton = `add-cart-${producto.id}`
        document.getElementById("cardsdinamicas").innerHTML += 
        `<div class="card col-3 m-2">
        <img src="${producto.img}" class="card-img-top" alt="">
        <div class="card-body">
            <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
            <p class="card-text">${producto.descripcion} <br> <strong>Precio: $ ${producto.precio}</strong></p>
            <a id="${idButton}" data-id="${producto.id}" class="btn btn-warning text-center">Añadir al carrito</a>
        </div>
        </div>`})
        console.log(productosFiltrados)
        productosFiltrados.forEach((producto) => {
        const idButton = `add-cart-${producto.id}`
        document.getElementById(idButton).addEventListener('click', (event) => {
        if (producto.cantidad === 0) {
            carrito.push(producto)
            producto.cantidad ++
            Toastify({
                text: `Agregaste al carrito ${producto.nombre}`,
                className: "info",
                duration: 1600,
                gravity: "top-end",
                style: {
                    background: "linear-gradient(to left, #D18F00, #D17500)",}
        }).showToast()
        } else {
        producto.cantidad ++
        Toastify({
            text: `Agregaste al carrito ${producto.nombre}`,
            className: "info",
            duration: 1600,
            gravity: "top-end",
            style: {
            background: "linear-gradient(to left, #D18F00, #D17500)",}
    }).showToast()}
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log(carrito)
        const total = carrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0)
        const carritoCantidad = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
        document.getElementById("carrito-total").innerHTML = `${carritoCantidad} - $${total}` 
        })
    })
}
function carritoVacio() {
    carrito.length === 0 && Toastify({text: "No hay productos en el carrito", 
    className: "info", 
    gravity: "top-end", 
    style:{background: "linear-gradient(to left, #D18F00, #D17500)",
}}).showToast()}

// Generar carrito
function carritoModal() {
    document.getElementById("producto-carrito").innerHTML = ""
    carrito.forEach((producto) => {
        const total = (producto.cantidad * producto.precio)
        document.getElementById("producto-carrito").innerHTML += 
        `<tr>
        <th scope="row">${producto.id}</th>
        <td><b>${producto.nombre}</b></td>
        <td><img class="card-img w-25 h-25" src="${producto.img}"></td>
        <td>${producto.cantidad}</td>
        <td><b>$${total}</b></td>
        <td><button id="borrar-carrito-${producto.id}" onclick="borrarCarrito(${producto.id})"class="btn btn-danger btn-sm">Eliminar<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
</svg></button></td>
        </tr>`
    })}

// Borrar elemento del carrito
function borrarCarrito(id) {
    const indiceBorrado = carrito.findIndex((producto) => producto.id == id)
    const productoABorrar = carrito.filter((producto) => producto.id == id)
    console.log(indiceBorrado)
    productoABorrar.forEach((producto) => {
        if (producto.cantidad >= 1) {
            producto.cantidad --
        }
        if (producto.cantidad === 0) {
            carrito.splice(indiceBorrado, 1)
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        const total = carrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0) 
        const carritoCantidad = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
        document.getElementById("carrito-total").innerHTML = `${carritoCantidad} - $${total}`
        })
        carritoModal()
        carritoVacio()}

// Vaciar carrito
function vaciarCarrito() {
    const carrito = []
    document.getElementById("producto-carrito").innerHTML = ""
    localStorage.setItem("carrito", JSON.stringify(carrito))
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
    document.getElementById("carrito-total").innerHTML = `${carrito.length} - $${total}`
    window.location.reload()
}

// Finalizar compra
function finalizarCompra () {
    carrito.forEach((producto) => {
        const carrito = []
        document.getElementById("producto-carrito").innerHTML = ""
        localStorage.setItem("carrito", JSON.stringify(carrito))
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
        document.getElementById("carrito-total").innerHTML = `${carrito.length} - $${total}`
        window.open('compra/terminarcompra.html')
        window.location.reload()})} 




// Agregar producto al carrito
function agregarAlCarrito(){
    productos.forEach((producto) => {
        const idButton = `add-cart-${producto.id}`
        const idData = document.getElementById(idButton).dataset.id
        document.getElementById(idButton).addEventListener('click', (event) => {
        if (idData === producto.id && producto.cantidad === 0) {
            carrito.push(producto)
            producto.cantidad ++
            Toastify({
                text: `Agregaste al carrito ${producto.nombre}`,
                className: "info",
                duration: 1600,
                gravity: "top-end",
                style: {
                background: "linear-gradient(to left, #D18F00, #D17500)",}
        }).showToast()
        } else  {
            producto.cantidad ++
            Toastify({
            text: `Agregaste al carrito ${producto.nombre}`,
            className: "info",
            duration: 1600,
            gravity: "top-end",
            style: {
            background: "linear-gradient(to left, #D18F00, #D17500)",}
        }).showToast()}
        localStorage.setItem("carrito", JSON.stringify(carrito))
        const total = carrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0)
        const carritoCantidad = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
        document.getElementById("carrito-total").innerHTML = `${carritoCantidad} - $${total}` 
        })
    console.log(carrito)})
}
    


