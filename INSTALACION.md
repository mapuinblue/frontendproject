# Guía de Instalación y Ejecución

## Requisitos Previos

- **Node.js**: versión 18.x o superior
- **npm**: versión 8.x o superior
- **Angular CLI**: versión 18.x

## Instalación

### 1. Clonar/Navegar al Proyecto

```bash
cd c:\Users\USUARIO\Downloads\frontendproject
```

### 2. Instalar Dependencias

```bash
npm install --legacy-peer-deps
```

El flag `--legacy-peer-deps` es necesario debido a conflictos de versiones de TypeScript entre Angular CLI y Angular.

### 3. Verificar Instalación

```bash
npm list @angular/core
ng version
```

## Ejecución en Desarrollo

### Iniciar el Servidor de Desarrollo

```bash
npm start
```

O usando Angular CLI directamente:

```bash
ng serve
```

O con más opciones:

```bash
ng serve --open --port 4200
```

La aplicación se abrirá automáticamente en: **http://localhost:4200**

### Modo Watch (Reconstruir automáticamente)

```bash
npm run watch
```

O:

```bash
ng build --watch --configuration development
```

## Build Producción

### Crear Build Optimizado

```bash
npm run build
```

O:

```bash
ng build --configuration production
```

El resultado estará en la carpeta `dist/frontendproject/`

### Servir Build Producción Localmente

```bash
npm install -g http-server
http-server dist/frontendproject/
```

## Desarrollo

### Estructura de Archivos para Nuevos Componentes

Para crear un nuevo componente:

```typescript
// src/app/pages/mi-pagina.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-mi-pagina',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <!-- Contenido aquí -->
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./mi-pagina.component.css']
})
export class MiPaginaComponent {}
```

### Agregar Nueva Ruta

En `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  // ... rutas existentes
  { path: 'mi-pagina', component: MiPaginaComponent }
];
```

### Crear Nuevo Servicio

```typescript
// src/app/services/mi-servicio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiServicioService {
  constructor() { }
  
  miMetodo() {
    // Lógica aquí
  }
}
```

## Debugging

### Abrir DevTools de Navegador

1. Presiona **F12** en el navegador
2. Abre la pestaña **Console** para errores
3. Abre la pestaña **Sources** para debuggear código

### Breakpoints en TypeScript

En Visual Studio Code:

1. Presiona **F5** para iniciar debugging
2. Abre el archivo TypeScript
3. Haz clic en el número de línea para agregar un breakpoint
4. El navegador pausará en ese punto

### Ver Console de Angular

En la terminal donde ejecutas `ng serve`, verás:
- Errores de compilación
- Warnings
- Logs personalizados

## Troubleshooting

### Problema: "ng no se reconoce como comando"

**Solución**:
```bash
npm install -g @angular/cli
```

### Problema: Conflicto de dependencias

**Solución**:
```bash
npm install --legacy-peer-deps
```

### Problema: Puerto 4200 ya en uso

**Solución**:
```bash
ng serve --port 4300
```

O matar el proceso:
```bash
# Windows
lsof -ti :4200 | xargs kill -9

# O usar:
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Problema: Cambios no se reflejan

**Solución**:
1. Guarda el archivo (Ctrl+S)
2. El servidor debería recompilar automáticamente
3. Actualiza el navegador (F5)
4. Si no funciona, detén el servidor (Ctrl+C) e inicia de nuevo

### Problema: Error "EACCES: permission denied"

**Solución**:
```bash
sudo npm install
# O en Windows, ejecuta PowerShell como Administrador
```

## Archivos Importantes

- `src/main.ts` - Punto de entrada de la aplicación
- `src/app.config.ts` - Configuración de proveedores
- `src/app/app.routes.ts` - Definición de rutas
- `src/index.html` - Página HTML principal
- `angular.json` - Configuración de Angular CLI
- `tsconfig.json` - Configuración de TypeScript
- `package.json` - Dependencias y scripts

## Comandos Útiles

```bash
# Ver ayuda de ng
ng help

# Listar versiones instaladas
npm list

# Actualizar dependencias (cuidado)
npm update

# Auditar vulnerabilidades de seguridad
npm audit
npm audit fix

# Limpiar caché de npm
npm cache clean --force

# Ver configuración de npm
npm config list

# Crear build análisis
ng build --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/frontendproject/stats.json
```

## Configuración de IDE (Visual Studio Code)

### Extensiones Recomendadas

- Angular Language Service
- Prettier - Code formatter
- ESLint
- Debugger for Chrome

### .vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Despliegue

### En Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

### En Vercel

```bash
npm install -g vercel
vercel
```

### En GitHub Pages

```bash
# Hacer build
npm run build

# Copiar dist/ a la rama gh-pages
npx angular-cli-ghpages --dir=dist/frontendproject
```

## Performance

Verificar tamaño del bundle:

```bash
ng build --configuration production
# Ver tamaño en dist/frontendproject/
```

Generar análisis:

```bash
ng build --stats-json
npm install webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/frontendproject/stats.json
```

## Referencia

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
