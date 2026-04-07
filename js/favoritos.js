/**
 * favoritos.js
 * Renderiza la lista de cafés guardados en localStorage.
 * Permite eliminar cada favorito individualmente o vaciar la lista completa.
 */

const favGrid    = document.getElementById('favGrid');
const emptyState = document.getElementById('favEmpty');
const contador   = document.getElementById('favCount');

/**
 * Renderiza las tarjetas de favoritos.
 * Si no hay ninguno, muestra el estado vacío.
 */
function renderFavoritos(cafes) {
  const ids = obtenerFavoritos();

  // Filtra solo los cafés que están en favoritos
  const favCafes = cafes.filter(c => ids.includes(c.id));

  // Actualiza el contador
  contador.textContent = favCafes.length;

  if (favCafes.length === 0) {
    // Muestra el estado vacío y oculta el grid
    favGrid.innerHTML    = '';
    emptyState.classList.remove('hidden');
    return;
  }

  // Oculta el estado vacío y pinta las tarjetas
  emptyState.classList.add('hidden');
  favGrid.innerHTML = favCafes.map(crearTarjeta).join('');

  // Los corazones ya deben aparecer activos
  actualizarCorazones();
}

/**
 * Sobrescribe manejarFavorito para que al quitar un favorito
 * desde esta página la tarjeta desaparezca sin recargar.
 */
function manejarFavorito(id, boton) {
  const estaActivo = toggleFavorito(id);

  if (!estaActivo) {
    // Se quitó del favorito: elimina la tarjeta con animación suave
    const card = boton.closest('.coffee-card');
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity    = '0';
    card.style.transform  = 'scale(0.95)';
    setTimeout(() => {
      // Re-renderiza tras la animación
      cargarCafes().then(renderFavoritos);
    }, 300);
  } else {
    boton.textContent = '♥';
    boton.classList.add('active');
  }
}

// ── Inicialización ──────────────────────────────────────────────────────────
cargarCafes().then(cafes => {
  renderFavoritos(cafes);
});
