import { Injectable } from '@angular/core';
import { Books } from '../models/book';
import { libros } from '../../libros';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private libros: Books[] = [];
  constructor() { 
    this.cargarLibros();
    console.log(this.libros);
  }

  obtenerLibros(): Books[] {
    return [...this.libros];
  }

  guardarLibro(libro: Books): void {
    const existeLibro = this.libros.some(l => l.codigoISBN === libro.codigoISBN);

    if (existeLibro) {
      // Mostrar alerta si el libro ya existe
      alert('Este libro ya está creado.');
    } else {
      // Agregar el libro y actualizar el Local Storage
      this.libros.push(libro);
      this.guardarLibrosEnLocalStorage();
    }
  }

  buscarLibroPorId(codigo: number): Books | null {
    return this.libros.find(libro => libro.codigoISBN === codigo) || null;
  }

  eliminarLibro(codigo: number): void {
    this.libros = this.libros.filter(libro => libro.codigoISBN !== codigo);
    this.guardarLibrosEnLocalStorage();
  }

  resetForm(form: any): void {
    form.resetForm();
  }

  buscarLibrosPorTitulo(palabra: string): Books[] {
    palabra = palabra.toLowerCase();
    return this.libros.filter(libro => libro.titulo.toLowerCase().includes(palabra));
  }

  editarLibro(libro: Books): void {
    const index = this.libros.findIndex(libroActual => libroActual.codigoISBN === libro.codigoISBN);

    if (index !== -1) {
      this.libros[index] = libro;
      this.guardarLibrosEnLocalStorage();
    }
  }

  private cargarLibros() {
    const librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
      this.libros = JSON.parse(librosGuardados);
    } else {
      // Si no hay libros guardados, cargar la lista inicial de libros
      this.libros = [...libros];
    }
  }

  private guardarLibrosEnLocalStorage() {
    localStorage.setItem('libros', JSON.stringify(this.libros));
  }

  obtenerLibroPorId(id: number): Observable<Books | undefined> {
    const libroEncontrado = this.libros.find(libro => libro.codigoISBN === id);
    return of(libroEncontrado);
  }

}

