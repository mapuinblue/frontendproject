# 📚 Índice de Documentación - Colombia Café Lab (Angular)

Bienvenido a la documentación del proyecto Angular. Aquí encontrarás toda la información que necesitas para entender, desarrollar y mantener la aplicación.

## 📖 Documentos

### 1. **[README.md](./README.md)** - Guía Principal
- Descripción general del proyecto
- Tecnologías utilizadas
- Estructura del proyecto
- Descripción de componentes
- Descripción de servicios
- Próximas mejoras
- Comandos de uso

**Leer primero**: Recomendado para nuevos desarrolladores

---

### 2. **[CONVERSION_RESUMEN.md](./CONVERSION_RESUMEN.md)** - Resumen de Conversión
- Lo que fue convertido de Vanilla JS a Angular
- Características implementadas
- Checklist de conversión
- Características técnicas
- Estado final del proyecto

**Para**: Entender qué cambió en la conversión

---

### 3. **[COMPONENTES.md](./COMPONENTES.md)** - Documentación de Componentes
- Arquitectura de componentes
- Componentes compartidos (Header, Footer, CoffeeCard)
- Componentes de página (Home, Catalog, Details, etc.)
- Patrones usados en componentes
- Ejemplos de reutilización

**Para**: Desarrollo de componentes y entender cómo funcionan

---

### 4. **[SERVICIOS.md](./SERVICIOS.md)** - Documentación de Servicios
- CoffeeService con todos sus métodos
- AdminService para gestión de catálogo
- Inyección de dependencias
- Ejemplos de uso

**Para**: Entender los servicios y su API

---

### 5. **[BINDING.md](./BINDING.md)** - Guía de Data Binding
- Tipos de binding en Angular
- Interpolation `{{ }}`
- Property Binding `[property]`
- Event Binding `(event)`
- Two-Way Binding `[(ngModel)]`
- Attribute Binding `[attr.xxx]`
- Class Binding `[class.xxx]`
- Structural Directives (*ngIf, *ngFor, *ngSwitch)
- Reactive Forms
- Ejemplos de uso en la app

**Para**: Entender cómo funciona el data binding

---

### 6. **[INSTALACION.md](./INSTALACION.md)** - Guía de Instalación y Ejecución
- Requisitos previos
- Pasos de instalación
- Comandos para desarrollo
- Build producción
- Debugging
- Troubleshooting
- Comandos útiles
- Despliegue

**Para**: Instalar y ejecutar el proyecto

---

## 🗂️ Estructura de Carpetas

```
frontendproject/
├── src/
│   ├── app/                    # Aplicación Angular
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Componentes de página (rutas)
│   │   ├── services/           # Servicios (lógica de negocio)
│   │   ├── models/             # Interfaces TypeScript
│   │   ├── app.routes.ts       # Definición de rutas
│   │   ├── app.component.ts    # Componente raíz
│   │   └── app.component.css
│   ├── main.ts                 # Punto de entrada
│   ├── app.config.ts           # Configuración
│   ├── index.html              # HTML raíz
│   ├── styles.ts               # Estilos globales
│   └── css/
│       └── styles.css          # Hoja de estilos (del proyecto original)
├── data/
│   └── productos.json          # Base de datos de cafés
├── package.json                # Dependencias y scripts
├── angular.json                # Configuración de build
├── tsconfig.json               # Configuración de TypeScript
└── README.md, *.md             # Documentación
```

---

## 🎯 Guías Rápidas

### Para Nuevos Desarrolladores
1. Lee [README.md](./README.md)
2. Lee [INSTALACION.md](./INSTALACION.md)
3. Ejecuta `npm install --legacy-peer-deps && npm start`
4. Familiarízate con [COMPONENTES.md](./COMPONENTES.md)

### Para Entender Data Binding
1. Lee [BINDING.md](./BINDING.md)
2. Busca ejemplos en los componentes
3. Experimenta en el navegador

### Para Agregar Funcionalidad
1. Lee [COMPONENTES.md](./COMPONENTES.md) si es UI
2. Lee [SERVICIOS.md](./SERVICIOS.md) si es lógica
3. Revisa ejemplos en componentes existentes
4. Sigue la estructura modular

### Para Debugging
1. Lee "Debugging" en [INSTALACION.md](./INSTALACION.md)
2. Usa F12 en el navegador
3. Lee la consola de errores
4. Usa breakpoints en VS Code

---

## 📊 Características por Documento

| Documento | Componentes | Servicios | Binding | Rutas | Instalación |
|-----------|-----------|----------|---------|-------|-------------|
| README.md | ✅ | ✅ | - | ✅ | - |
| COMPONENTES.md | ✅✅ | - | - | ✅ | - |
| SERVICIOS.md | - | ✅✅ | - | - | - |
| BINDING.md | - | - | ✅✅ | - | - |
| INSTALACION.md | - | - | - | - | ✅✅ |

---

## 🔗 Enlaces Rápidos

### Dentro de la Documentación
- [Componentes Compartidos](./COMPONENTES.md#componentes-compartidos)
- [Componentes de Página](./COMPONENTES.md#componentes-de-página)
- [Métodos de CoffeeService](./SERVICIOS.md#métodos-principales)
- [Tipos de Binding](./BINDING.md#tipos-de-binding-en-angular)
- [Instalación](./INSTALACION.md#instalación)

### Referencias Externas
- [Angular Documentation](https://angular.io)
- [Angular CLI](https://angular.io/cli)
- [TypeScript](https://www.typescriptlang.org)
- [RxJS](https://rxjs.dev)

---

## 🚀 Comandos Comunes

```bash
# Instalación
npm install --legacy-peer-deps

# Desarrollo
npm start

# Build
npm run build

# Watch (reconstruir automáticamente)
npm run watch

# Verificar versión de Angular
ng version
```

---

## 📝 Anotaciones Importantes

### LocalStorage
- **favoritos**: Array de IDs de cafés favoritos
- **cafesAdmin**: Array de cafés creados en admin

### Rutas
- Usan hash-based routing (`/#/`)
- Compatible con navegadores antiguos
- Parámetros dinámicos con `:id`
- Query parameters con `?key=value`

### Formato de Datos
- Coffee: Interface en `models/coffee.model.ts`
- ContactForm: Interface en `models/contact.model.ts`

---

## 🎓 Niveles de Documentación

### Nivel 1: Principiante
Lectura recomendada:
1. README.md (sección general)
2. INSTALACION.md
3. COMPONENTES.md (visión general)

### Nivel 2: Intermedio
Lectura recomendada:
1. COMPONENTES.md (completo)
2. SERVICIOS.md
3. BINDING.md

### Nivel 3: Avanzado
Lectura recomendada:
1. Código fuente en `src/app/`
2. BINDING.md (validación y Reactive Forms)
3. Contribuciones personalizadas

---

## 💬 Preguntas Comunes

**P: ¿Cómo ejecuto la aplicación?**
R: `npm install --legacy-peer-deps && npm start`

**P: ¿Dónde creo nuevos componentes?**
R: En `src/app/pages/` para rutas, en `src/app/components/` para reutilizables

**P: ¿Cómo funciona el data binding?**
R: Lee [BINDING.md](./BINDING.md)

**P: ¿Cómo agrego un nuevo servicio?**
R: Crea el archivo en `src/app/services/` siguiendo el patrón de `coffee.service.ts`

**P: ¿Dónde está la base de datos?**
R: En `data/productos.json` (JSON estático) y localStorage (para favoritos y admin)

---

## ✅ Checklist de Lectura

- [ ] He leído README.md
- [ ] He instalado las dependencias
- [ ] He ejecutado la aplicación
- [ ] He entendido la estructura de carpetas
- [ ] He leído COMPONENTES.md
- [ ] He leído SERVICIOS.md
- [ ] He entendido el data binding
- [ ] Estoy listo para contribuir

---

## 📞 Contacto

Para preguntas o sugerencias sobre la documentación, refiere a los archivos específicos mencionados arriba.

---

**Documentación actualizada**: Abril 2026  
**Versión de Angular**: 18.x  
**Versión de TypeScript**: 5.4.5  

¡Happy coding! ☕
