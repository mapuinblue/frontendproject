/**
 * header.component.ts
 * Componente del encabezado con navegación
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a href="#/" class="logo">
          <span class="logo-icon">☕</span>
          Colombia Café Lab
        </a>
        <button 
          class="nav-toggle" 
          (click)="toggleNav()" 
          [attr.aria-label]="navOpen ? 'Cerrar menú' : 'Abrir menú'"
        >
          ☰
        </button>
        <nav>
          <ul class="site-nav" [class.open]="navOpen">
            <li><a href="#/" (click)="navOpen = false">Inicio</a></li>
            <li><a href="#/catalog" (click)="navOpen = false">Catálogo</a></li>
            <li><a href="#/favorites" (click)="navOpen = false">Favoritos</a></li>
            <li><a href="#/contact" (click)="navOpen = false">Contacto</a></li>
            <li><a href="#/admin" (click)="navOpen = false">Administrar</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navOpen = false;

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }
}
