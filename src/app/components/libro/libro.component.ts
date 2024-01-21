import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Books } from '../../models/book';
import { libros } from '../../../libros';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss'
})
export class LibroComponent implements OnInit{

  constructor(private libroService: LibroService, private fb: FormBuilder, private router: Router) {
    this.formularioLibro = this.fb.group({
      titulo: [''],
      autor: [''],
      aniopublicacion: [''],
      genero: [''],
      cantidaddisponible: [''],
      codigoISBN: ['']
    });
  }

  libros: Books[] = [];
  libroSeleccionado: any = null;
  palabraBusqueda: string = '';
  formularioLibro: FormGroup;

  seleccionarLibroPrestar(libro: Books): void {
    // Guardar el libro seleccionado en el almacenamiento local
    localStorage.setItem('libroSeleccionado', JSON.stringify(libro));

    // Redirigir a la ruta de usuario
    this.router.navigate(['/usuario']);
  }

  ngOnInit(): void {
    this.libros = this.libroService.obtenerLibros()
  }

  onSubmit (formValue: Books) {
    //this.libroService.onSubmit(formValue);
    localStorage.setItem('libros', JSON.stringify(this.libros))
    console.log(formValue)
  }

  editarLibro(libroEditado: any): void {
    
    const index = this.libros.findIndex((libro) => libro === this.libroSeleccionado);

    if (index !== -1) {
      this.libros[index] = libroEditado;
    }

    this.libroSeleccionado = null;
  }

  eliminarLibro(libro: Books): void {
    this.libroService.eliminarLibro(libro.codigoISBN);
    this.libros = this.libroService.obtenerLibros(); // Actualiza la lista después de la eliminación
  }

  seleccionarLibro(libro: Books): void {
    this.libroSeleccionado = libro;
    this.formularioLibro.setValue(libro);
  }

  resetForm(form: any): void {
    form.resetForm();
  }

  buscarLibros(): void {
    this.libros = this.libroService.buscarLibrosPorTitulo(this.palabraBusqueda);
  }

  guardarCambios(): void {
    const libroEditado: Books = this.formularioLibro.value;
    this.libroService.editarLibro(libroEditado);
    this.libros = this.libroService.obtenerLibros();
    this.libroSeleccionado = null;
    this.formularioLibro.reset();
  }

  redirigirAPrestamo(libro: Books, accion: 'prestar' | 'devolver') {
    this.router.navigate(['/prestamo', { libro, accion }]);
  }

  prestarLibro(libro: Books): void {
    // Obtén el ID del libro
    const libroId: number = libro.codigoISBN;
  
    // Redirige a la ruta de prestamo con el ID del libro y un ID de usuario (puede ser cualquier valor, ya que lo obtendrás en PrestamoComponent)
    this.router.navigate(['/prestamo', libroId, 1]); // En este ejemplo, 1 es un ID de usuario de ejemplo
  }
}
