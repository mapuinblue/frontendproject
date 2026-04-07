/**
 * contacto.js
 * Gestión del formulario de contacto:
 * - Prellenado del asunto desde la URL (?asunto=...)
 * - Validaciones en tiempo real (blur) y al enviar
 * - Simulación de envío con mensaje de confirmación
 */

// ── Selectores ──────────────────────────────────────────────────────────────
const form         = document.getElementById('contactForm');
const inputNombre  = document.getElementById('inputNombre');
const inputCorreo  = document.getElementById('inputCorreo');
const selectAsunto = document.getElementById('selectAsunto');
const inputMensaje = document.getElementById('inputMensaje');
const mensajeExito = document.getElementById('mensajeExito');

// ── Prellenado del asunto desde la URL ─────────────────────────────────────
(function prellenarAsunto() {
  const params = new URLSearchParams(window.location.search);
  const asunto = params.get('asunto');
  if (asunto) {
    // Busca la opción que contenga el nombre del café y la selecciona
    Array.from(selectAsunto.options).forEach(opt => {
      if (opt.value.toLowerCase().includes('café')) {
        opt.selected = true;
      }
    });
  }
})();

// ── Funciones de validación ─────────────────────────────────────────────────

/** Muestra u oculta el mensaje de error de un campo. */
function mostrarError(campo, mensajeId, mostrar, texto = '') {
  const errorEl = document.getElementById(mensajeId);
  campo.classList.toggle('error', mostrar);
  errorEl.textContent = texto;
  errorEl.classList.toggle('visible', mostrar);
}

/** Valida que el campo no esté vacío. */
function validarRequerido(campo, mensajeId, etiqueta) {
  const vacio = campo.value.trim() === '';
  mostrarError(campo, mensajeId, vacio, vacio ? `${etiqueta} es obligatorio.` : '');
  return !vacio;
}

/** Valida formato de correo electrónico con regex. */
function validarCorreo() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valor  = inputCorreo.value.trim();
  if (valor === '') {
    mostrarError(inputCorreo, 'errorCorreo', true, 'El correo electrónico es obligatorio.');
    return false;
  }
  if (!regex.test(valor)) {
    mostrarError(inputCorreo, 'errorCorreo', true, 'Ingresa un correo electrónico válido.');
    return false;
  }
  mostrarError(inputCorreo, 'errorCorreo', false);
  return true;
}

// ── Validación en tiempo real (al perder foco) ──────────────────────────────
inputNombre.addEventListener('blur', () =>
  validarRequerido(inputNombre, 'errorNombre', 'El nombre')
);

inputCorreo.addEventListener('blur', validarCorreo);

inputMensaje.addEventListener('blur', () =>
  validarRequerido(inputMensaje, 'errorMensaje', 'El mensaje')
);

// Limpia el error mientras el usuario escribe
[inputNombre, inputCorreo, inputMensaje].forEach(campo => {
  campo.addEventListener('input', () => {
    campo.classList.remove('error');
    const errorId = campo.id.replace('input', 'error').replace('Input', 'error');
    const errorEl = document.getElementById(
      campo === inputNombre  ? 'errorNombre'  :
      campo === inputCorreo  ? 'errorCorreo'  : 'errorMensaje'
    );
    if (errorEl) errorEl.classList.remove('visible');
  });
});

// ── Envío del formulario ─────────────────────────────────────────────────────
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita recarga real de la página

  // Ejecuta todas las validaciones
  const nombreOk  = validarRequerido(inputNombre, 'errorNombre', 'El nombre');
  const correoOk  = validarCorreo();
  const mensajeOk = validarRequerido(inputMensaje, 'errorMensaje', 'El mensaje');

  if (!nombreOk || !correoOk || !mensajeOk) return; // Hay errores

  // Simulación de envío: oculta el formulario y muestra confirmación
  form.style.display       = 'none';
  mensajeExito.classList.add('visible');

  // Opcionalmente resetea y vuelve a mostrar el form tras 5 segundos
  setTimeout(() => {
    form.reset();
    form.style.display       = 'block';
    mensajeExito.classList.remove('visible');
  }, 5000);
});
