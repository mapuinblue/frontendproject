/**
 * contact.component.ts
 * Página de formulario de contacto
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { ContactForm } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <main>
      <section class="section">
        <div class="container">
          <div class="contact-layout">
            <h1 class="contact-form-title">Contáctanos</h1>

            <!-- Formulario de contacto -->
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" *ngIf="!successMessage" novalidate>
              <!-- Nombre -->
              <div class="form-group">
                <label for="inputNombre">
                  Nombre <span class="required">*</span>
                </label>
                <input
                  type="text"
                  id="inputNombre"
                  formControlName="nombre"
                  class="form-control"
                  placeholder="Tu nombre completo"
                  autocomplete="name"
                />
                <p class="form-error" *ngIf="getFieldError('nombre')">
                  {{ getFieldError('nombre') }}
                </p>
              </div>

              <!-- Correo -->
              <div class="form-group">
                <label for="inputCorreo">
                  Correo electrónico <span class="required">*</span>
                </label>
                <input
                  type="email"
                  id="inputCorreo"
                  formControlName="correo"
                  class="form-control"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                />
                <p class="form-error" *ngIf="getFieldError('correo')">
                  {{ getFieldError('correo') }}
                </p>
              </div>

              <!-- Asunto -->
              <div class="form-group">
                <label for="selectAsunto">Asunto</label>
                <select id="selectAsunto" formControlName="asunto" class="form-control">
                  <option value="consulta-cafe">Información sobre un café</option>
                  <option value="pedido">Realizar un pedido</option>
                  <option value="mayorista">Consulta mayorista</option>
                  <option value="general">Mensaje general</option>
                </select>
              </div>

              <!-- Mensaje -->
              <div class="form-group">
                <label for="inputMensaje">
                  Mensaje <span class="required">*</span>
                </label>
                <textarea
                  id="inputMensaje"
                  formControlName="mensaje"
                  class="form-control"
                  placeholder="¿En qué podemos ayudarte?"
                  rows="5"
                ></textarea>
                <p class="form-error" *ngIf="getFieldError('mensaje')">
                  {{ getFieldError('mensaje') }}
                </p>
              </div>

              <button type="submit" class="btn-submit" [disabled]="!contactForm.valid">
                Enviar mensaje
              </button>
            </form>

            <!-- Mensaje de éxito -->
            <div class="form-success" *ngIf="successMessage">
              ✓ &nbsp;¡Mensaje enviado con éxito! Te responderemos pronto.
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['consulta-cafe'],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['asunto']) {
        this.contactForm.patchValue({ asunto: params['asunto'] });
      }
    });
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   */
  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (!field || !field.errors || !field.touched) return '';

    if (fieldName === 'nombre' && field.errors['required']) {
      return 'El nombre es obligatorio.';
    }
    if (fieldName === 'correo') {
      if (field.errors['required']) return 'El correo electrónico es obligatorio.';
      if (field.errors['email']) return 'Ingresa un correo electrónico válido.';
    }
    if (fieldName === 'mensaje' && field.errors['required']) {
      return 'El mensaje es obligatorio.';
    }

    return '';
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.contactForm.valid) {
      // Simula el envío del formulario
      this.successMessage = true;
      this.contactForm.reset();
      setTimeout(() => {
        this.successMessage = false;
      }, 5000);
    }
  }
}
