/**
 * coffee-details.component.ts
 * Página de detalle de un café específico
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { CoffeeCardComponent } from '../components/coffee-card.component';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee.model';

@Component({
  selector: 'app-coffee-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CoffeeCardComponent],
  template: `
    <app-header></app-header>

    <main>
      <section class="section">
        <div class="container" *ngIf="coffee">
          <a href="#/catalog" class="detail-back">← Volver al catálogo</a>
          <div class="detail-layout">
            <img
              class="detail-img"
              [src]="coffee.imagen"
              [alt]="coffee.nombre"
              (error)="onImageError($event)"
            />
            <div>
              <h1 class="detail-title">{{ coffee.nombre }}</h1>
              <p class="detail-desc">{{ coffee.descripcionCompleta }}</p>
              <div class="detail-specs">
                <div>
                  <p class="spec-label">Origen</p>
                  <p class="spec-value">{{ coffee.origen }}</p>
                </div>
                <div>
                  <p class="spec-label">Altitud</p>
                  <p class="spec-value">{{ coffee.altitud }}</p>
                </div>
                <div>
                  <p class="spec-label">Perfil de tueste</p>
                  <p class="spec-value">{{ coffee.tueste }}</p>
                </div>
                <div>
                  <p class="spec-label">Proceso</p>
                  <p class="spec-value">{{ coffee.proceso }}</p>
                </div>
                <div style="grid-column: 1 / -1">
                  <p class="spec-label">Notas de cata</p>
                  <p class="spec-value">{{ coffee.notas }}</p>
                </div>
              </div>
              <p class="detail-price">\${{ coffee.precio.toFixed(2) }} <span>/ 250g</span></p>
              <div class="detail-actions">
                <button 
                  (click)="toggleFavorite()" 
                  [class.active]="isFavorite"
                  class="btn-secondary"
                >
                  {{ isFavorite ? '♥' : '♡' }} &nbsp;
                  {{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
                </button>
                <a [href]="'#/contact?asunto=Consulta sobre ' + coffee.nombre" class="btn-outline">
                  ✉ Contactar
                </a>
              </div>
            </div>
          </div>

          <!-- Productos relacionados -->
          <div class="related-section" *ngIf="relatedCoffees.length > 0">
            <h3>Productos relacionados</h3>
            <div class="cards-grid">
              <app-coffee-card 
                *ngFor="let coffee of relatedCoffees" 
                [coffee]="coffee"
              ></app-coffee-card>
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./coffee-details.component.css']
})
export class CoffeeDetailsComponent implements OnInit {
  coffee: Coffee | undefined;
  relatedCoffees: Coffee[] = [];
  isFavorite = false;

  constructor(
    private coffeeService: CoffeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.loadCoffee(id);
    });
  }

  private loadCoffee(id: number): void {
    this.coffeeService.getCoffeeById(id).subscribe(coffee => {
      this.coffee = coffee;
      if (coffee) {
        this.isFavorite = this.coffeeService.isFavorite(coffee.id);
        this.coffeeService.getRelatedCoffees(coffee.id).subscribe(related => {
          this.relatedCoffees = related;
        });
      }
    });
  }

  toggleFavorite(): void {
    if (this.coffee) {
      this.isFavorite = this.coffeeService.toggleFavorite(this.coffee.id);
    }
  }

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80';
  }
}
