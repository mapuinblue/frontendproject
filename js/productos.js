/**
 * productos.js
 * Módulo principal de datos: carga el JSON, gestiona favoritos en localStorage
 * y provee la función crearTarjeta() usada en todas las páginas.
 */

// ── Cargar el catálogo desde el JSON local ──────────────────────────────────

/**
 * Obtiene el array de cafés desde data/productos.json.
 * Retorna una Promise que resuelve con el array.
 */
async function cargarCafes() {
  const respuesta = await fetch('data/productos.json');
  const cafes = await respuesta.json();
  return cafes;
}

// ── Gestión de favoritos en localStorage ───────────────────────────────────

/** Retorna el array de IDs favoritos guardados. */
function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

/** Agrega un ID a favoritos si no existe aún. */
function agregarFavorito(id) {
  const favs = obtenerFavoritos();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favoritos', JSON.stringify(favs));
  }
}

/** Elimina un ID de favoritos. */
function eliminarFavorito(id) {
  let favs = obtenerFavoritos().filter(f => f !== id);
  localStorage.setItem('favoritos', JSON.stringify(favs));
}

/** Alterna el estado de favorito de un café. */
function toggleFavorito(id) {
  const favs = obtenerFavoritos();
  if (favs.includes(id)) {
    eliminarFavorito(id);
    return false; // ya no es favorito
  } else {
    agregarFavorito(id);
    return true; // ahora es favorito
  }
}

/** Verifica si un café es favorito. */
function esFavorito(id) {
  return obtenerFavoritos().includes(id);
}

// ── Renderizado de tarjetas ─────────────────────────────────────────────────

/**
 * Genera el HTML de una tarjeta de café.
 * @param {Object} cafe - Objeto café del JSON
 * @returns {string} HTML de la tarjeta
 */
function crearTarjeta(cafe) {
  const fav = esFavorito(cafe.id);
  return `
    <div class="coffee-card" data-id="${cafe.id}">
      <img
        class="coffee-card__img"
        src="${cafe.imagen}"
        alt="${cafe.nombre}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'"
      />
      <button
        class="coffee-card__fav ${fav ? 'active' : ''}"
        onclick="manejarFavorito(${cafe.id}, this)"
        aria-label="${fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
      >
        ${fav ? '♥' : '♡'}
      </button>
      <div class="coffee-card__body">
        <h3 class="coffee-card__name">${cafe.nombre}</h3>
        <p class="coffee-card__desc">${cafe.descripcion}</p>
        <a href="CoffeeDetails.html?id=${cafe.id}" class="coffee-card__btn">Ver más</a>
      </div>
    </div>
  `;
}

/**
 * Maneja el clic en el botón de favorito de una tarjeta.
 * Actualiza el ícono y el estado activo sin recargar la página.
 */
function manejarFavorito(id, boton) {
  const estaActivo = toggleFavorito(id);
  boton.textContent = estaActivo ? '♥' : '♡';
  boton.classList.toggle('active', estaActivo);
  boton.setAttribute('aria-label', estaActivo ? 'Quitar de favoritos' : 'Agregar a favoritos');
}

/**
 * Sincroniza el estado visual de todos los corazones en la página
 * con el localStorage (útil al volver de otra página).
 */
function actualizarCorazones() {
  document.querySelectorAll('.coffee-card__fav').forEach(btn => {
    const id = parseInt(btn.closest('.coffee-card').dataset.id);
    const activo = esFavorito(id);
    btn.textContent = activo ? '♥' : '♡';
    btn.classList.toggle('active', activo);
  });
}
