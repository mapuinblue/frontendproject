/**
 * admin.service.ts
 * Servicio para administración del catálogo:
 * - Crear nuevos cafés
 * - Eliminar cafés
 * - Persistencia en localStorage
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminCoffeesSubject = new BehaviorSubject<Coffee[]>([]);
  public adminCoffees$ = this.adminCoffeesSubject.asObservable();

  constructor() {
    this.loadAdminCoffees();
  }

  /**
   * Carga los cafés del admin desde localStorage o inicializa vacío
   */
  private loadAdminCoffees(): void {
    const stored = localStorage.getItem('cafesAdmin');
    const coffees = stored ? JSON.parse(stored) : [];
    this.adminCoffeesSubject.next(coffees);
  }

  /**
   * Guarda los cafés del admin en localStorage
   */
  private saveAdminCoffees(coffees: Coffee[]): void {
    localStorage.setItem('cafesAdmin', JSON.stringify(coffees));
    this.adminCoffeesSubject.next(coffees);
  }

  /**
   * Obtiene todos los cafés del admin
   */
  getAdminCoffees(): Observable<Coffee[]> {
    return this.adminCoffees$;
  }

  /**
   * Agrega un nuevo café
   */
  addCoffee(coffee: Omit<Coffee, 'id'>): void {
    const coffees = this.adminCoffeesSubject.value;
    const newCoffee: Coffee = {
      ...coffee,
      id: Date.now()
    } as Coffee;
    coffees.push(newCoffee);
    this.saveAdminCoffees(coffees);
  }

  /**
   * Elimina un café por ID
   */
  deleteCoffee(id: number): void {
    const coffees = this.adminCoffeesSubject.value.filter(c => c.id !== id);
    this.saveAdminCoffees(coffees);
  }

  /**
   * Genera un ID único para nuevos cafés
   */
  generateId(): number {
    return Date.now();
  }
}
