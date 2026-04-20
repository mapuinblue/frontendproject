/**
 * coffee.model.ts
 * Define la interfaz principal del modelo de Café
 */

export interface Coffee {
  id: number;
  nombre: string;
  descripcion: string;
  descripcionCompleta: string;
  origen: string;
  altitud: string;
  tueste: string;
  notas: string;
  proceso: string;
  precio: number;
  imagen: string;
  destacado: boolean;
}
