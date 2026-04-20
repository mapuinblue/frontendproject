/**
 * favorites.component.ts
 * Página de cafés favoritos guardados
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { CoffeeCardComponent } from '../components/coffee-card.component';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CoffeeCardComponent],
  template: `
    <app-header></app-header>

    <main>
      <section class="section">
        <div class="container">
          <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:2rem;">
            <h1 class="page-title" style="margin-bottom:0;">Mis cafés favoritos</h1>
            <span
              style="
                background: var(--pastel-peach);
                color: var(--foreground);
                padding: 0.1rem 0.6rem;
                border-radius: 999px;
                font-size: 0.875rem;
                font-family: var(--font-body);
              "
            >
              {{ favoriteCoffees.length }}
            </span>
          </div>

          <!-- Estado vacío -->
          <div *ngIf="favoriteCoffees.length === 0" class="favorites-empty">
            <p class="empty-icon">♡</p>
            <p style="font-size:1.125rem; margin-bottom:0.5rem;">Aún no tienes favoritos</p>
            <p style="margin-bottom:1.25rem;">Explora nuestro catálogo y guarda los cafés que más te gusten.</p>
            <a href="#/catalog" class="btn-primary">Ir al catálogo →</a>
          </div>

          <!-- Grid de favoritos -->
          <div class="cards-grid" *ngIf="favoriteCoffees.length > 0">
            <app-coffee-card 
              *ngFor="let coffee of favoriteCoffees" 
              [coffee]="coffee"
              (favoriteToggled)="onFavoriteToggled()"
            ></app-coffee-card>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteCoffees: Coffee[] = [];

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.coffeeService.favorites$.subscribe(() => {
      this.loadFavorites();
    });
  }

  private loadFavorites(): void {
    this.coffeeService.getFavoriteCoffees().subscribe(coffees => {
      this.favoriteCoffees = coffees;
    });
  }

  onFavoriteToggled(): void {
    this.loadFavorites();
  }
}
