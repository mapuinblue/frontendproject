/**
 * home.component.ts
 * Página de inicio con cafés destacados
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { CoffeeCardComponent } from '../components/coffee-card.component';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CoffeeCardComponent],
  template: `
    <app-header></app-header>
    
    <main>
      <!-- HERO -->
      <section class="hero">
        <div class="container">
          <h1>Descubre la esencia del<br>café colombiano</h1>
          <p>Cafés de origen, artesanales y sostenibles</p>
          <a href="#/catalog" class="btn-primary">
            Explorar cafés →
          </a>
        </div>
      </section>

      <!-- CAFÉS DESTACADOS -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Cafés destacados</h2>
          <div class="cards-grid">
            <app-coffee-card 
              *ngFor="let coffee of featuredCoffees" 
              [coffee]="coffee"
            ></app-coffee-card>
          </div>
        </div>
      </section>

      <!-- TESTIMONIAL -->
      <section class="testimonial-section">
        <div class="container">
          <blockquote>
            "El café colombiano no es solo una bebida, es una experiencia que conecta montañas, tradición y sabor en cada taza."
          </blockquote>
          <cite>— Juan Valdez, Maestro Cafetero</cite>
        </div>
      </section>

      <!-- INFO CARDS -->
      <section class="section">
        <div class="container">
          <div class="info-grid">
            <div class="info-card info-card--mint">
              <h3>100% Colombiano</h3>
              <p>Todos nuestros cafés son cultivados en las mejores regiones de Colombia</p>
            </div>
            <div class="info-card info-card--pink">
              <h3>Sostenible</h3>
              <p>Apoyamos prácticas agrícolas sostenibles y comercio justo</p>
            </div>
            <div class="info-card info-card--lavender">
              <h3>Artesanal</h3>
              <p>Cada lote es cuidadosamente seleccionado y tostado por expertos</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredCoffees: Coffee[] = [];

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.coffeeService.getFeaturedCoffees().subscribe(coffees => {
      this.featuredCoffees = coffees;
    });
  }
}
