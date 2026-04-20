/**
 * admin.component.ts
 * Página de administración de catálogo
 * Permite crear nuevos cafés y eliminar existentes
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { AdminService } from '../services/admin.service';
import { Coffee } from '../models/coffee.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <main>
      <section class="section">
        <div class="container">
          <h1 class="page-title">Administrar cafés</h1>

          <div class="admin-layout">
            <!-- Panel izquierdo: Agregar nuevo café -->
            <div class="admin-panel">
              <h3>Agregar nuevo café</h3>
              <form [formGroup]="adminForm" (ngSubmit)="onAddCoffee()">

                <div class="form-group">
                  <label for="fNombre">Nombre <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="fNombre" 
                    formControlName="nombre"
                    class="form-control" 
                    placeholder="Ej: Sierra Nevada Especial" 
                  />
                </div>

                <div class="form-group">
                  <label for="fDescCorta">Descripción breve <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="fDescCorta" 
                    formControlName="descripcion"
                    class="form-control" 
                    placeholder="Ej: Notas de caramelo, tueste medio" 
                  />
                </div>

                <div class="form-group">
                  <label for="fDescLarga">Descripción completa</label>
                  <textarea 
                    id="fDescLarga" 
                    formControlName="descripcionCompleta"
                    class="form-control" 
                    rows="3" 
                    placeholder="Historia y características detalladas del café..."
                  ></textarea>
                </div>

                <!-- Fila doble: Origen + Altitud -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                  <div class="form-group">
                    <label for="fOrigen">Origen <span class="required">*</span></label>
                    <input 
                      type="text" 
                      id="fOrigen" 
                      formControlName="origen"
                      class="form-control" 
                      placeholder="Ej: Magdalena, Colombia" 
                    />
                  </div>
                  <div class="form-group">
                    <label for="fAltitud">Altitud</label>
                    <input 
                      type="text" 
                      id="fAltitud" 
                      formControlName="altitud"
                      class="form-control" 
                      placeholder="Ej: 1.800 msnm" 
                    />
                  </div>
                </div>

                <!-- Fila doble: Tueste + Proceso -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                  <div class="form-group">
                    <label for="fTueste">Perfil de tueste</label>
                    <select id="fTueste" formControlName="tueste" class="form-control">
                      <option value="Claro">Claro</option>
                      <option value="Medio">Medio</option>
                      <option value="Medio-oscuro">Medio-oscuro</option>
                      <option value="Oscuro">Oscuro</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="fProceso">Proceso</label>
                    <select id="fProceso" formControlName="proceso" class="form-control">
                      <option value="Lavado">Lavado</option>
                      <option value="Natural">Natural</option>
                      <option value="Honey">Honey</option>
                      <option value="Washed">Washed</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="fNotas">Notas de cata</label>
                  <input 
                    type="text" 
                    id="fNotas" 
                    formControlName="notas"
                    class="form-control" 
                    placeholder="Ej: Caramelo, nuez, cítrico" 
                  />
                </div>

                <div class="form-group">
                  <label for="fPrecio">Precio (USD / 250g) <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="fPrecio" 
                    formControlName="precio"
                    class="form-control" 
                    placeholder="Ej: 24.99" 
                    min="0" 
                    step="0.01" 
                  />
                </div>

                <div class="form-group">
                  <label for="fImagen">URL de imagen</label>
                  <input 
                    type="url" 
                    id="fImagen" 
                    formControlName="imagen"
                    class="form-control" 
                    placeholder="https://ejemplo.com/imagen.jpg" 
                  />
                </div>

                <div class="form-group">
                  <label>
                    <input type="checkbox" formControlName="destacado" />
                    &nbsp; Mostrar en destacados
                  </label>
                </div>

                <button type="submit" class="btn-submit" [disabled]="!adminForm.valid">
                  Agregar café
                </button>
              </form>
            </div>

            <!-- Panel derecho: Lista de cafés -->
            <div class="admin-panel">
              <h3>Cafés en el catálogo</h3>
              <div id="adminList">
                <div *ngIf="adminCoffees.length === 0" style="color:var(--muted-fg); font-size:0.875rem;">
                  No hay cafés en el catálogo.
                </div>
                <div *ngFor="let cafe of adminCoffees" class="coffee-list-item" [attr.data-id]="cafe.id">
                  <div class="coffee-list-info">
                    <p class="name">{{ cafe.nombre }}</p>
                    <p class="origin">{{ cafe.origen }}</p>
                  </div>
                  <button
                    class="btn-delete"
                    (click)="onDeleteCoffee(cafe.id)"
                    [attr.aria-label]="'Eliminar ' + cafe.nombre"
                    title="Eliminar"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  adminCoffees: Coffee[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcionCompleta: [''],
      origen: ['', Validators.required],
      altitud: [''],
      tueste: ['Medio'],
      proceso: ['Lavado'],
      notas: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      imagen: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'],
      destacado: [false]
    });
  }

  ngOnInit(): void {
    this.adminService.adminCoffees$.subscribe(coffees => {
      this.adminCoffees = coffees;
    });
  }

  /**
   * Agrega un nuevo café
   */
  onAddCoffee(): void {
    if (this.adminForm.valid) {
      this.adminService.addCoffee(this.adminForm.value);
      this.adminForm.reset({
        tueste: 'Medio',
        proceso: 'Lavado',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
        destacado: false
      });
    }
  }

  /**
   * Elimina un café
   */
  onDeleteCoffee(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este café del catálogo?')) {
      this.adminService.deleteCoffee(id);
    }
  }
}
