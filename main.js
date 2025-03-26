// Constructor para los videojuegos
const Videojuego = function(nombre, consola, precio, stock) {
  this.nombre = nombre;
  this.consola = consola;
  this.precio = precio;
  this.stock = stock;
};

// Catálogo inicial de videojuegos
let lista = [
  new Videojuego("God of War Ragnarök", "PS5", 59990, 15),
  new Videojuego("The Last of Us Part II", "PS4", 39990, 20),
  new Videojuego("Spider-Man 2", "PS5", 64990, 10),
  new Videojuego("Gran Turismo 7", "PS4", 49990, 12)
];

// ---------- FILTRAR PRODUCTOS ----------
function filtrarProductos() {
  let palabraClave = prompt("Ingresa el videojuego que buscas").trim().toUpperCase();
  let resultado = lista.filter((x) => x.nombre.toUpperCase().includes(palabraClave));
  resultado.length > 0 
    ? mostrarResultados(resultado) 
    : alert("No se encontraron coincidencias");
  mostrarMenu();
}

// ---------- AGREGAR PRODUCTO ----------
function agregarProducto() {
  let nombre, consola, precio, stock;
  
  nombre = prompt("Ingresa el nombre del videojuego").trim();
  while (nombre === "") {
    nombre = prompt("El nombre no puede estar vacío. Ingresa el nombre del videojuego").trim();
  }

  consola = prompt("Ingresa la consola (PS3, PS4 o PS5)").trim().toUpperCase();
  while (consola !== "PS3" && consola !== "PS4" && consola !== "PS5") {
    consola = prompt("Consola inválida. Ingresa PS3, PS4 o PS5").trim().toUpperCase();
  }

  precio = parseFloat(prompt("Ingresa el precio del videojuego"));
  while (isNaN(precio) || precio <= 0) {
    precio = parseFloat(prompt("Precio inválido. Ingresa un precio mayor a 0"));
  }

  stock = parseInt(prompt("Ingresa el stock del videojuego"));
  while (isNaN(stock) || stock < 0) {
    stock = parseInt(prompt("Stock inválido. Ingresa un número mayor o igual a 0"));
  }

  let producto = new Videojuego(nombre, consola, precio, stock);
  lista.push(producto);
  mostrarResultados(lista);
  mostrarMenu();
}

// ---------- ELIMINAR PRODUCTO ----------
function eliminarProducto() {
  let nombre = prompt("Ingresa el nombre del videojuego a eliminar").trim().toUpperCase();
  let index = lista.findIndex((p) => p.nombre.toUpperCase() === nombre);
  
  if (index === -1) {
    alert("Videojuego no encontrado.");
  } else {
    let productoEliminado = lista.splice(index, 1)[0];
    alert(`Videojuego eliminado: ${productoEliminado.nombre}`);
    mostrarResultados(lista);
  }
  mostrarMenu();
}

// ---------- MODIFICAR PRODUCTO ----------
function modificarProducto() {
  let nombre = prompt("Ingresa el nombre del videojuego a modificar").trim().toUpperCase();
  let producto = lista.find((p) => p.nombre.toUpperCase() === nombre);
  
  if (!producto) {
    alert("Videojuego no encontrado.");
    mostrarMenu();
    return;
  }

  let precioInput = prompt(`Precio actual: ${producto.precio}. Nuevo precio (deja vacío para no cambiar)`);
  let nuevoPrecio = precioInput === "" ? producto.precio : parseFloat(precioInput);
  while (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
    precioInput = prompt("Precio inválido. Ingresa un precio mayor a 0");
    nuevoPrecio = precioInput === "" ? producto.precio : parseFloat(precioInput);
  }

  let stockInput = prompt(`Stock actual: ${producto.stock}. Nuevo stock (deja vacío para no cambiar)`);
  let nuevoStock = stockInput === "" ? producto.stock : parseInt(stockInput);
  while (isNaN(nuevoStock) || nuevoStock < 0) {
    stockInput = prompt("Stock inválido. Ingresa un número mayor o igual a 0");
    nuevoStock = stockInput === "" ? producto.stock : parseInt(stockInput);
  }

  producto.precio = nuevoPrecio;
  producto.stock = nuevoStock;
  alert(`Videojuego modificado: ${producto.nombre}`);
  mostrarResultados(lista);
  mostrarMenu();
}

// ---------- MOSTRAR RESULTADOS ----------
function mostrarResultados(resultados) {
  console.table(resultados);
}

// ---------- MOSTRAR MENÚ ----------
function mostrarMenu() {
  let opcion = prompt(`
    Selecciona una opción:
    1. Filtrar Productos
    2. Agregar Producto
    3. Eliminar Producto
    4. Modificar Producto
    5. Salir
  `);

  switch(opcion) {
    case "1":
      filtrarProductos();
      break;
    case "2":
      agregarProducto();
      break;
    case "3":
      eliminarProducto();
      break;
    case "4":
      modificarProducto();
      break;
    case "5":
      alert("Gracias por usar el catálogo de videojuegos.");
      break;
    default:
      alert("Opción inválida. Intenta de nuevo.");
      mostrarMenu();
  }
}

// Iniciar la aplicación
mostrarMenu();