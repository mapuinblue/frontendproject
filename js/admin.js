/**
 * admin.js
 * Mini CRUD de administración del catálogo.
 * - Persiste los cambios en localStorage para simular una base de datos.
 * - Permite crear nuevos cafés y eliminar existentes.
 * - El array en memoria se inicializa con el JSON y los cambios del localStorage.
 */

// ── Estado de la aplicación ─────────────────────────────────────────────────
let cafesAdmin = []; // Array en memoria que se muestra y manipula

// ── Selectores del DOM ─────────────────────────────────────────────────────
const listaEl   = document.getElementById('adminList');
const formAdmin = document.getElementById('adminForm');

// Campos del formulario de nuevo café
const fNombre   = document.getElementById('fNombre');
const fDescCorta= document.getElementById('fDescCorta');
const fDescLarga= document.getElementById('fDescLarga');
const fOrigen   = document.getElementById('fOrigen');
const fAltitud  = document.getElementById('fAltitud');
const fTueste   = document.getElementById('fTueste');
const fProceso  = document.getElementById('fProceso');
const fNotas    = document.getElementById('fNotas');
const fPrecio   = document.getElementById('fPrecio');
const fImagen   = document.getElementById('fImagen');

// ── Persistencia en localStorage ───────────────────────────────────────────

/** Guarda el array de cafés admin en localStorage. */
function guardarEnStorage(cafes) {
  localStorage.setItem('cafesAdmin', JSON.stringify(cafes));
}

/** Carga los cafés desde localStorage; si no existe, retorna null. */
function cargarDesdeStorage() {
  const data = localStorage.getItem('cafesAdmin');
  return data ? JSON.parse(data) : null;
}

// ── Renderizado de la lista de cafés ───────────────────────────────────────

/**
 * Renderiza la lista de cafés en el panel de administración.
 * Cada ítem tiene un botón de eliminar.
 */
function renderLista() {
  if (cafesAdmin.length === 0) {
    listaEl.innerHTML = '<p style="color:var(--muted-fg); font-size:0.875rem;">No hay cafés en el catálogo.</p>';
    return;
  }

  listaEl.innerHTML = cafesAdmin.map(cafe => `
    <div class="coffee-list-item" data-id="${cafe.id}">
      <div class="coffee-list-info">
        <p class="name">${cafe.nombre}</p>
        <p class="origin">${cafe.origen}</p>
      </div>
      <button
        class="btn-delete"
        onclick="eliminarCafe(${cafe.id})"
        aria-label="Eliminar ${cafe.nombre}"
        title="Eliminar"
      >
        🗑
      </button>
    </div>
  `).join('');
}

// ── Eliminar café ───────────────────────────────────────────────────────────

/**
 * Elimina un café del array por su ID,
 * actualiza localStorage y re-renderiza la lista.
 */
function eliminarCafe(id) {
  if (!confirm('¿Seguro que deseas eliminar este café del catálogo?')) return;

  cafesAdmin = cafesAdmin.filter(c => c.id !== id);
  guardarEnStorage(cafesAdmin);
  renderLista();
}

// ── Agregar café ────────────────────────────────────────────────────────────

/**
 * Genera un ID único basado en el timestamp para los nuevos cafés.
 */
function generarId() {
  return Date.now();
}

/**
 * Valida que los campos obligatorios del formulario no estén vacíos.
 * Retorna true si todo es válido.
 */
function validarFormAdmin() {
  const requeridos = [fNombre, fDescCorta, fOrigen];
  let valido = true;
  requeridos.forEach(campo => {
    if (campo.value.trim() === '') {
      campo.style.borderColor = 'var(--destructive)';
      valido = false;
    } else {
      campo.style.borderColor = '';
    }
  });
  return valido;
}

// Escucha el envío del formulario de nuevo café
formAdmin.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validarFormAdmin()) {
    alert('Por favor completa los campos obligatorios: Nombre, Descripción breve y Origen.');
    return;
  }

  // Construye el objeto café con los valores del formulario
  const nuevoCafe = {
    id:                  generarId(),
    nombre:              fNombre.value.trim(),
    descripcion:         fDescCorta.value.trim(),
    descripcionCompleta: fDescLarga.value.trim() || fDescCorta.value.trim(),
    origen:              fOrigen.value.trim(),
    altitud:             fAltitud.value.trim() || 'N/A',
    tueste:              fTueste.value.trim()  || 'Medio',
    proceso:             fProceso.value.trim() || 'Lavado',
    notas:               fNotas.value.trim()   || '',
    precio:              parseFloat(fPrecio.value) || 0,
    imagen:              fImagen.value.trim()  ||
                         'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    destacado:           false
  };

  // Agrega al array y guarda en localStorage
  cafesAdmin.unshift(nuevoCafe); // Al inicio de la lista para verlo de inmediato
  guardarEnStorage(cafesAdmin);
  renderLista();

  // Limpia el formulario
  formAdmin.reset();
  fNombre.focus();
});

// ── Inicialización ──────────────────────────────────────────────────────────
cargarCafes().then(cafesOriginales => {
  // Usa el localStorage si ya hay cambios; si no, usa el JSON original
  const guardados = cargarDesdeStorage();
  cafesAdmin = guardados !== null ? guardados : cafesOriginales;
  renderLista();
});
