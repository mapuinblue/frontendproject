/**
 * footer.component.ts
 * Componente del pie de página
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#/" class="logo">
              <span class="logo-icon">☕</span>
              Colombia Café Lab
            </a>
            <p>Descubre la esencia del café colombiano. Cafés de origen, artesanales y sostenibles.</p>
          </div>
          <div class="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#/">Inicio</a></li>
              <li><a href="#/catalog">Catálogo</a></li>
              <li><a href="#/favorites">Favoritos</a></li>
              <li><a href="#/contact">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <address>
              <p>✉ contacto&#64;colombiacafelab.com</p>
              <p>📞 +57 300 123 4567</p>
            </address>
            <div class="footer-social">
              <a href="#" class="social-btn">f</a>
              <a href="#" class="social-btn">ig</a>
              <a href="#" class="social-btn">tw</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Colombia Café Lab. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}
