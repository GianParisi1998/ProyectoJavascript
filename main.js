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
  let palabraClave;
  do {
      palabraClave = prompt("Ingresa el videojuego que buscas").trim().toUpperCase();
  } while (palabraClave === "");
  let resultado = lista.filter((x) => x.nombre.toUpperCase().includes(palabraClave));
  resultado.length > 0 ? console.table(resultado) : alert("No se encontraron coincidencias");
}

// ---------- AGREGAR PRODUCTO ----------
function agregarProducto() {
  let nombre, consola, precio, stock;
  do {
      nombre = prompt("Ingresa el nombre del videojuego").trim();
  } while (nombre === "");
  do {
      consola = prompt("Ingresa la consola (PS3, PS4 o PS5)").trim().toUpperCase();
  } while (consola !== "PS3" && consola !== "PS4" && consola !== "PS5");
  do {
      precio = parseFloat(prompt("Ingresa el precio del videojuego"));
  } while (isNaN(precio) || precio <= 0);
  do {
      stock = parseInt(prompt("Ingresa el stock del videojuego"));
  } while (isNaN(stock) || stock < 0);
  let producto = new Videojuego(nombre, consola, precio, stock);
  lista.push(producto);
  console.table(lista);
}

// ---------- ELIMINAR PRODUCTO ----------
function eliminarProducto() {
  let nombre;
  let index;
  do {
      nombre = prompt("Ingresa el nombre del videojuego a eliminar").trim().toUpperCase();
      index = lista.findIndex((p) => p.nombre.toUpperCase() === nombre);
      if (index === -1) alert("Videojuego no encontrado. Intenta de nuevo.");
  } while (index === -1);
  console.log("Videojuego eliminado:", lista.splice(index, 1)[0]);
  console.table(lista);
}

// ---------- MODIFICAR PRODUCTO ----------
function modificarProducto() {
  let nombre;
  let producto;
  do {
      nombre = prompt("Ingresa el nombre del videojuego a modificar").trim().toUpperCase();
      producto = lista.find((p) => p.nombre.toUpperCase() === nombre);
      if (!producto) alert("Videojuego no encontrado. Intenta de nuevo.");
  } while (!producto);
  let nuevoPrecio, nuevoStock;
  do {
      let precioInput = prompt("Nuevo precio (deja vacío para no cambiar)");
      nuevoPrecio = precioInput === "" ? producto.precio : parseFloat(precioInput);
  } while (isNaN(nuevoPrecio) || nuevoPrecio <= 0);
  do {
      let stockInput = prompt("Nuevo stock (deja vacío para no cambiar)");
      nuevoStock = stockInput === "" ? producto.stock : parseInt(stockInput);
  } while (isNaN(nuevoStock) || nuevoStock < 0);
  producto.precio = nuevoPrecio;
  producto.stock = nuevoStock;
  console.log("Videojuego modificado:", producto);
  console.table(lista);
}