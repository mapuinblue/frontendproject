/**
 * coffee-card.component.ts
 * Componente reutilizable de tarjeta de café
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Coffee } from '../models/coffee.model';
import { CoffeeService } from '../services/coffee.service';

@Component({
  selector: 'app-coffee-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="coffee-card" [attr.data-id]="coffee.id">
      <img
        class="coffee-card__img"
        [src]="coffee.imagen"
        [alt]="coffee.nombre"
        loading="lazy"
        (error)="onImageError($event)"
      />
      <button
        class="coffee-card__fav"
        [class.active]="isFavorite"
        (click)="toggleFavorite()"
        [attr.aria-label]="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      >
        {{ isFavorite ? '♥' : '♡' }}
      </button>
      <div class="coffee-card__body">
        <h3 class="coffee-card__name">{{ coffee.nombre }}</h3>
        <p class="coffee-card__desc">{{ coffee.descripcion }}</p>
        <a [href]="'#/details/' + coffee.id" class="coffee-card__btn">Ver más</a>
      </div>
    </div>
  `,
  styleUrls: ['./coffee-card.component.css']
})
export class CoffeeCardComponent {
  @Input() coffee!: Coffee;
  @Output() favoriteToggled = new EventEmitter<number>();

  isFavorite = false;

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.isFavorite = this.coffeeService.isFavorite(this.coffee.id);
  }

  toggleFavorite(): void {
    this.isFavorite = this.coffeeService.toggleFavorite(this.coffee.id);
    this.favoriteToggled.emit(this.coffee.id);
  }

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80';
  }
}
