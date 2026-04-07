# Colombia Café Lab ☕

Catálogo digital de cafés colombianos desarrollado como proyecto académico para el curso de Front-End de la Universidad Politécnico Grancolombiano.  
Permite explorar productos, ver detalles, guardar favoritos y gestionar el catálogo mediante una interfaz visual moderna y responsiva.

---

## 📁 Estructura del proyecto
```
frontendproject/
├── Home.html # Página de inicio con hero y cafés destacados
├── Catalog.html # Listado completo con buscador en tiempo real
├── CoffeeDetails.html # Vista de detalle por café (cargado por ID en URL)
├── Favorites.html # Lista de favoritos guardados en localStorage
├── Contact.html # Formulario de contacto con validaciones
├── Aadmin.html # Panel CRUD para agregar y eliminar cafés
├── css/
│ └── styles.css # Hoja de estilos principal (paleta pastel, responsive)
├── js/
│ ├── productos.js # Carga del JSON, renderizado de tarjetas, gestión de favoritos
│ ├── detalle.js # Lógica de la vista de detalle
│ ├── favoritos.js # Renderizado y eliminación de favoritos
│ ├── contacto.js # Validaciones en tiempo real del formulario
│ └── admin.js # Lógica del mini CRUD
├── data/
│ └── productos.json # Catálogo base de 6 cafés colombianos
└── assets/
└── img/ # Imágenes locales (opcional)
```

---

## 🚀 Cómo ejecutar el proyecto

Este proyecto usa `fetch()` para cargar el archivo `productos.json`, por lo que **no puede abrirse directamente** haciendo doble clic en los HTML — requiere un servidor local.

### Opción 1 — VS Code con Live Server (recomendado)
1. Instala la extensión **Live Server**
2. Abre la carpeta `frontendproject/` en VS Code
3. Clic derecho sobre `Home.html` → **Open with Live Server**

### Opción 2 — Python
```bash
cd frontendproject
python -m http.server 8000
```

## ✨ Funcionalidades implementadas

| Funcionalidad | Descripción |
|---------------|-------------|
| Catálogo dinámico | Las tarjetas se renderizan desde `productos.json` con JavaScript puro |
| Buscador en tiempo real | Filtra cafés por nombre, origen o notas de cata |
| Vista de detalle | Carga el café por `?id=` en la URL con especificaciones completas |
| Favoritos | Agrega/quita cafés con persistencia en `localStorage` |
| Formulario validado | Validaciones en tiempo real: campos requeridos y regex de correo |
| Mini CRUD | Agregar y eliminar cafés; cambios persisten en `localStorage` |
| Responsive | Menú hamburguesa y layout adaptable para móvil y escritorio |

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — Estructura semántica y accesible
- **CSS3** — Variables CSS, Flexbox, Grid, diseño responsive
- **JavaScript ES6+** — Fetch API, async/await, localStorage, manipulación del DOM
- **Google Fonts** — Playfair Display + Lato
- **Sin frameworks externos** — Proyecto vanilla, sin dependencias npm

---

## 📐 Decisiones de diseño

La paleta visual (tonos pastel: melocotón, lavanda, menta y rosa) fue definida en **Figma** durante la Entrega 1 y trasladada fielmente al CSS mediante variables CSS.  
La tipografía combina **Playfair Display** para títulos (elegante, con serifa) y **Lato** para el cuerpo (legible, sans-serif), reflejando la identidad artesanal y premium del café colombiano.

---

## 👥 Autores

- **María Paula Gutiérrez Romero**

**Universidad Politécnico Grancolombiano** — Grupo B02, Frony 16  
Docente: Edgar López Rojas · 2026

---

## 📄 Licencia

Proyecto académico sin fines comerciales.
