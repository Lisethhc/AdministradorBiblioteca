// prestamo.service.ts
import { Injectable } from '@angular/core';
import { Books, Usuario } from '../models/book';


@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private prestamos: any[] = []; // Array para almacenar los préstamos

  // Métodos para gestionar préstamos y devoluciones
  prestarLibro(libro: Books, usuario: Usuario): void {
    // Implementa la lógica para prestar un libro
    const prestamo = { libro, usuario, fechaPrestamo: new Date() };
    this.prestamos.push(prestamo);
    // También puedes guardar el estado en localStorage o realizar otras acciones necesarias
  }

  devolverLibro(libro: Books, usuario: Usuario): void {
    // Implementa la lógica para devolver un libro
    const prestamo = this.prestamos.find(
      (p) => p.libro.codigoISBN === libro.codigoISBN && p.usuario.id === usuario.id
    );

    if (prestamo) {
      prestamo.fechaDevolucion = new Date();
      // Realiza acciones adicionales si es necesario
    }
  }

  obtenerPrestamos(): any[] {
    return this.prestamos;
  }
}

