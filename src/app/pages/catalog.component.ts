/**
 * catalog.component.ts
 * Página de catálogo con búsqueda y filtrado
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { CoffeeCardComponent } from '../components/coffee-card.component';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, CoffeeCardComponent],
  template: `
    <app-header></app-header>

    <main>
      <section class="section">
        <div class="container">
          <h1 class="page-title" style="font-size:2rem; margin-bottom:1.5rem;">Todos los cafés</h1>

          <!-- Barra de búsqueda -->
          <div class="catalog-bar">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterCoffees()"
              class="search-input"
              placeholder="Buscar café por nombre o región..."
              aria-label="Buscar café"
            />
          </div>

          <!-- Grid de tarjetas -->
          <div class="cards-grid">
            <app-coffee-card 
              *ngFor="let coffee of filteredCoffees" 
              [coffee]="coffee"
            ></app-coffee-card>
          </div>

          <!-- Mensaje cuando no hay resultados -->
          <p *ngIf="filteredCoffees.length === 0" class="hidden text-muted" style="text-align:center; padding:2rem 0;">
            No se encontraron cafés con ese criterio.
          </p>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allCoffees: Coffee[] = [];
  filteredCoffees: Coffee[] = [];
  searchTerm = '';

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.coffeeService.getAllCoffees().subscribe(coffees => {
      this.allCoffees = coffees;
      this.filteredCoffees = coffees;
    });
  }

  /**
   * Filtra los cafés por búsqueda de nombre o región
   */
  filterCoffees(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCoffees = this.allCoffees;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCoffees = this.allCoffees.filter(coffee =>
      coffee.nombre.toLowerCase().includes(term) ||
      coffee.origen.toLowerCase().includes(term)
    );
  }
}
