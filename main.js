// Constructor para los videojuegos
class Videojuego {
  constructor(nombre, consola, precio, stock) {
      this.nombre = nombre;
      this.consola = consola;
      this.precio = precio;
      this.stock = stock;
  }
}

// Variables globales
let listaVideojuegos = [];
let gameToDeleteIndex = null;

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const gameForm = document.getElementById('gameForm');
const formMode = document.getElementById('formMode');
const editIndex = document.getElementById('editIndex');
const resetButton = document.getElementById('resetButton');
const videojuegosContainer = document.getElementById('videojuegos-container');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const confirmDeleteBtn = document.getElementById('confirmDelete');
const deleteGameNameSpan = document.getElementById('deleteGameName');
const notificationToast = new bootstrap.Toast(document.getElementById('notificationToast'));
const toastMessage = document.getElementById('toastMessage');

// Cargar datos del localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarDesdeLocalStorage();
  renderizarVideojuegos(listaVideojuegos);
});

// Guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem('catalogoVideojuegos', JSON.stringify(listaVideojuegos));
}

// Cargar desde localStorage
function cargarDesdeLocalStorage() {
  const datosGuardados = localStorage.getItem('catalogoVideojuegos');
  
  if (datosGuardados) {
      listaVideojuegos = JSON.parse(datosGuardados);
  } else {
      // Catálogo inicial de videojuegos si no hay datos guardados
      listaVideojuegos = [
          new Videojuego("God of War Ragnarök", "PS5", 59990, 15),
          new Videojuego("The Last of Us Part II", "PS4", 39990, 20),
          new Videojuego("Spider-Man 2", "PS5", 64990, 10),
          new Videojuego("Gran Turismo 7", "PS4", 49990, 12)
      ];
      guardarEnLocalStorage();
  }
}

// Event Listeners
searchButton.addEventListener('click', filtrarProductos);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      filtrarProductos();
  }
});

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const consola = document.getElementById('consola').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const stock = parseInt(document.getElementById('stock').value);
  
  if (formMode.value === 'add') {
      agregarProducto(nombre, consola, precio, stock);
  } else {
      modificarProducto(parseInt(editIndex.value), nombre, consola, precio, stock);
  }
});

resetButton.addEventListener('click', resetearFormulario);

confirmDeleteBtn.addEventListener('click', () => {
  eliminarProducto(gameToDeleteIndex);
  deleteModal.hide();
});

// Función para filtrar productos
function filtrarProductos() {
  const palabraClave = searchInput.value.trim().toUpperCase();
  
  if (palabraClave === '') {
      renderizarVideojuegos(listaVideojuegos);
      return;
  }
  
  const resultado = listaVideojuegos.filter(juego => 
      juego.nombre.toUpperCase().includes(palabraClave)
  );
  
  if (resultado.length > 0) {
      renderizarVideojuegos(resultado);
  } else {
      mostrarNotificacion('No se encontraron coincidencias', 'bg-warning');
      renderizarVideojuegos([]);
  }
}

// Función para agregar producto
function agregarProducto(nombre, consola, precio, stock) {
  const nuevoJuego = new Videojuego(nombre, consola, precio, stock);
  listaVideojuegos.push(nuevoJuego);
  
  guardarEnLocalStorage();
  renderizarVideojuegos(listaVideojuegos);
  resetearFormulario();
  
  mostrarNotificacion(`Videojuego "${nombre}" agregado correctamente`, 'bg-success');
}

// Función para eliminar producto
function eliminarProducto(index) {
  if (index !== null && index >= 0 && index < listaVideojuegos.length) {
      const productoEliminado = listaVideojuegos.splice(index, 1)[0];
      guardarEnLocalStorage();
      renderizarVideojuegos(listaVideojuegos);
      
      mostrarNotificacion(`Videojuego "${productoEliminado.nombre}" eliminado correctamente`, 'bg-danger');
  }
}

// Función para modificar producto
function modificarProducto(index, nombre, consola, precio, stock) {
  if (index >= 0 && index < listaVideojuegos.length) {
      const juegoModificado = listaVideojuegos[index];
      
      juegoModificado.nombre = nombre;
      juegoModificado.consola = consola;
      juegoModificado.precio = precio;
      juegoModificado.stock = stock;
      
      guardarEnLocalStorage();
      renderizarVideojuegos(listaVideojuegos);
      resetearFormulario();
      
      mostrarNotificacion(`Videojuego "${nombre}" modificado correctamente`, 'bg-success');
  }
}

// Función para cargar datos al formulario para editar
function cargarFormularioEdicion(index) {
  if (index >= 0 && index < listaVideojuegos.length) {
      const juego = listaVideojuegos[index];
      
      document.getElementById('nombre').value = juego.nombre;
      document.getElementById('consola').value = juego.consola;
      document.getElementById('precio').value = juego.precio;
      document.getElementById('stock').value = juego.stock;
      
      formMode.value = 'edit';
      editIndex.value = index;
      document.getElementById('saveButton').textContent = 'Actualizar';
  }
}

// Función para resetear el formulario
function resetearFormulario() {
  gameForm.reset();
  formMode.value = 'add';
  editIndex.value = '';
  document.getElementById('saveButton').textContent = 'Guardar';
}

// Función para confirmar eliminación
function confirmarEliminacion(index) {
  if (index >= 0 && index < listaVideojuegos.length) {
      gameToDeleteIndex = index;
      deleteGameNameSpan.textContent = listaVideojuegos[index].nombre;
      deleteModal.show();
  }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, colorClass) {
  document.getElementById('notificationToast').className = 'toast align-items-center text-white ' + colorClass;
  toastMessage.textContent = mensaje;
  notificationToast.show();
}

// Función para renderizar los videojuegos en el DOM
function renderizarVideojuegos(juegos) {
  videojuegosContainer.innerHTML = '';
  
  juegos.forEach((juego, index) => {
      // Crear tarjeta para cada videojuego
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4 game-card';
      
      // Aplicar color de fondo según la consola
      let cardColor = '';
      switch (juego.consola) {
          case 'PS3':
              cardColor = 'border-primary';
              break;
          case 'PS4':
              cardColor = 'border-success';
              break;
          case 'PS5':
              cardColor = 'border-danger';
              break;
          default:
              cardColor = 'border-secondary';
      }
    
      card.innerHTML = `
          <div class="card h-100 ${cardColor} shadow">
              <div class="card-header d-flex justify-content-between align-items-center">
                  <span class="badge bg-${cardColor.replace('border-', '')}">${juego.consola}</span>
                  <div>
                      <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">
                          <i class="bi bi-pencil"></i> Editar
                      </button>
                      <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
                          <i class="bi bi-trash"></i> Eliminar
                      </button>
                  </div>
              </div>
              <div class="card-body">
                  <h5 class="card-title">${juego.nombre}</h5>
                  <div class="d-flex justify-content-between">
                      <span class="fw-bold">Precio: $${juego.precio.toLocaleString()}</span>
                      <span class="badge bg-${juego.stock > 0 ? 'success' : 'danger'}">
                          Stock: ${juego.stock}
                      </span>
                  </div>
              </div>
          </div>
      `;
      
      videojuegosContainer.appendChild(card);
  });
  
  // Asignar event listeners a los botones de editar y eliminar
  document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.closest('.edit-btn').dataset.index);
          cargarFormularioEdicion(index);
      });
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.closest('.delete-btn').dataset.index);
          confirmarEliminacion(index);
      });
  });
  
  // Mensaje cuando no hay juegos
  if (juegos.length === 0) {
      videojuegosContainer.innerHTML = `
          <div class="col-12 text-center py-5">
              <h3 class="text-muted">No hay videojuegos para mostrar</h3>
              <p>Agrega nuevos juegos usando el formulario</p>
          </div>
      `;
  }
}