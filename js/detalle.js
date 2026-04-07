/**
 * detalle.js
 * Carga el detalle de un café según el ?id= de la URL y lo renderiza.
 * También gestiona el botón "Agregar/Quitar favorito".
 */

// Lee el ID de la URL, p.ej: CoffeeDetails.html?id=3
const params = new URLSearchParams(window.location.search);
const cafeId = parseInt(params.get('id'));

// Contenedores del DOM donde se inyecta el contenido
const contenidoPrincipal = document.getElementById('detailContent');
const relacionadosGrid   = document.getElementById('relatedGrid');
// NOTA: btnFavorito NO se busca aquí porque aún no existe en el DOM.
// Se obtiene después de inyectar el HTML dentro del .then()

/**
 * Construye el HTML de las especificaciones técnicas del café
 * (origen, altitud, tueste, proceso, notas de cata).
 */
function renderSpecs(cafe) {
  return `
    <div class="detail-specs">
      <div>
        <p class="spec-label">Origen</p>
        <p class="spec-value">${cafe.origen}</p>
      </div>
      <div>
        <p class="spec-label">Altitud</p>
        <p class="spec-value">${cafe.altitud}</p>
      </div>
      <div>
        <p class="spec-label">Perfil de tueste</p>
        <p class="spec-value">${cafe.tueste}</p>
      </div>
      <div>
        <p class="spec-label">Proceso</p>
        <p class="spec-value">${cafe.proceso}</p>
      </div>
      <div style="grid-column: 1 / -1">
        <p class="spec-label">Notas de cata</p>
        <p class="spec-value">${cafe.notas}</p>
      </div>
    </div>
  `;
}

/**
 * Actualiza el ícono y texto del botón de favorito.
 * Busca el elemento en el DOM cada vez porque se crea dinámicamente.
 */
function actualizarBtnFav(id) {
  const btn = document.getElementById('btnFavorito');
  if (!btn) return; // Todavía no existe en el DOM, nada que hacer
  const activo = esFavorito(id);
  btn.innerHTML = activo
    ? '♥ &nbsp;Quitar de favoritos'
    : '♡ &nbsp;Agregar a favoritos';
  btn.classList.toggle('active', activo);
  btn.style.background = activo ? 'var(--pastel-pink)' : '';
}

// ── Inicialización ──────────────────────────────────────────────────────────
cargarCafes().then(cafes => {
  // Busca el café por ID
  const cafe = cafes.find(c => c.id === cafeId);

  if (!cafe) {
    // ID inválido: redirige al catálogo
    window.location.href = 'Catalog.html';
    return;
  }

  // Actualiza el <title> de la página
  document.title = `${cafe.nombre} — Colombia Café Lab`;

  // Renderiza el contenido principal
  contenidoPrincipal.innerHTML = `
    <a href="Catalog.html" class="detail-back">← Volver al catálogo</a>
    <div class="detail-layout">
      <img
        class="detail-img"
        src="${cafe.imagen}"
        alt="${cafe.nombre}"
        onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'"
      />
      <div>
        <h1 class="detail-title">${cafe.nombre}</h1>
        <p class="detail-desc">${cafe.descripcionCompleta}</p>
        ${renderSpecs(cafe)}
        <p class="detail-price">$${cafe.precio.toFixed(2)} <span>/ 250g</span></p>
        <div class="detail-actions">
          <button id="btnFavorito" class="btn-secondary">♡ &nbsp;Agregar a favoritos</button>
          <a href="Contact.html?asunto=Consulta sobre ${encodeURIComponent(cafe.nombre)}" class="btn-outline">✉ Contactar</a>
        </div>
      </div>
    </div>
  `;

  // El botón ya existe en el DOM: inicializa su estado y agrega el listener
  actualizarBtnFav(cafe.id);

  document.getElementById('btnFavorito').addEventListener('click', () => {
    toggleFavorito(cafe.id);
    actualizarBtnFav(cafe.id);
  });

  // Renderiza los cafés relacionados (todos excepto el actual)
  const relacionados = cafes.filter(c => c.id !== cafe.id).slice(0, 3);
  relacionadosGrid.innerHTML = relacionados.map(crearTarjeta).join('');
  actualizarCorazones();
});
