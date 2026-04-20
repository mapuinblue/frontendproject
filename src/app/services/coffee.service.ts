/**
 * coffee.service.ts
 * Servicio principal para gestionar cafés:
 * - Cargar datos desde JSON
 * - Gestionar favoritos en localStorage
 * - Proporcionar datos a los componentes
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private coffees: Coffee[] = [];
  private favoritesSubject = new BehaviorSubject<number[]>(this.getFavorites());
  private coffeeLoadedSubject = new BehaviorSubject<boolean>(false);

  public favorites$ = this.favoritesSubject.asObservable();
  public coffeeLoaded$ = this.coffeeLoadedSubject.asObservable();

  constructor() {
    this.loadCoffees();
  }

  /**
   * Carga los cafés desde data/productos.json
   */
  private loadCoffees(): void {
    fetch('data/productos.json')
      .then(response => response.json())
      .then((data: Coffee[]) => {
        this.coffees = data;
        this.coffeeLoadedSubject.next(true);
      })
      .catch(error => console.error('Error al cargar cafés:', error));
  }

  /**
   * Obtiene todos los cafés
   */
  getAllCoffees(): Observable<Coffee[]> {
    return new Observable(observer => {
      if (this.coffees.length > 0) {
        observer.next(this.coffees);
        observer.complete();
      } else {
        this.coffeeLoaded$.subscribe(loaded => {
          if (loaded) {
            observer.next(this.coffees);
            observer.complete();
          }
        });
      }
    });
  }

  /**
   * Obtiene solo los cafés destacados
   */
  getFeaturedCoffees(): Observable<Coffee[]> {
    return new Observable(observer => {
      this.getAllCoffees().subscribe(coffees => {
        observer.next(coffees.filter(c => c.destacado));
        observer.complete();
      });
    });
  }

  /**
   * Obtiene un café por ID
   */
  getCoffeeById(id: number): Observable<Coffee | undefined> {
    return new Observable(observer => {
      this.getAllCoffees().subscribe(coffees => {
        observer.next(coffees.find(c => c.id === id));
        observer.complete();
      });
    });
  }

  /**
   * Obtiene cafés relacionados (excluye el café actual)
   */
  getRelatedCoffees(currentId: number, limit: number = 3): Observable<Coffee[]> {
    return new Observable(observer => {
      this.getAllCoffees().subscribe(coffees => {
        const related = coffees.filter(c => c.id !== currentId).slice(0, limit);
        observer.next(related);
        observer.complete();
      });
    });
  }

  /**
   * Retorna el array de IDs favoritos guardados en localStorage
   */
  getFavorites(): number[] {
    const stored = localStorage.getItem('favoritos');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Verifica si un café es favorito
   */
  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  /**
   * Alterna el estado de favorito de un café
   */
  toggleFavorite(id: number): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(id);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
    
    return index === -1; // Retorna true si se agregó, false si se quitó
  }

  /**
   * Agrega un café a favoritos
   */
  addFavorite(id: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favoritos', JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    }
  }

  /**
   * Quita un café de favoritos
   */
  removeFavorite(id: number): void {
    const favorites = this.getFavorites().filter(f => f !== id);
    localStorage.setItem('favoritos', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  /**
   * Obtiene los cafés favoritos
   */
  getFavoriteCoffees(): Observable<Coffee[]> {
    return new Observable(observer => {
      this.getAllCoffees().subscribe(coffees => {
        const favorites = this.getFavorites();
        observer.next(coffees.filter(c => favorites.includes(c.id)));
        observer.complete();
      });
    });
  }
}
