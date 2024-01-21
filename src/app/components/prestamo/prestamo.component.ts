// prestamo.component.ts
import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamo.service';
import { Books, Usuario } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss'],
})
export class PrestamoComponent implements OnInit{
  libros: Books[] = []; // Obtén la lista de libros de tu servicio de libros
  usuarios: Usuario[] = []; // Obtén la lista de usuarios de tu servicio de usuarios
  libroSeleccionado: Books | null = null;
  usuarioSeleccionado: Usuario | null = null;
  libro: Books | null = null;
  usuario: Usuario | null = null;

  constructor(private prestamoService: PrestamoService, private activatedRoute: ActivatedRoute, private libroService: LibroService, private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const libroId: number = +params['libroId'];
      const usuarioId: number = +params['usuarioId'];

      // Utiliza el servicio para obtener el libro por su ID
      this.libroService.obtenerLibroPorId(libroId).subscribe(
        libro => {
          if (libro) {
            this.libro = libro;
            // Resto de la lógica aquí
          } else {
            // El libro no fue encontrado, manejarlo según sea necesario
          }
        },
        error => {
          console.error('Error al obtener el libro:', error);
        }
      );

      this.usuarioService.obtenerUsuarioPorId(usuarioId).subscribe(
        usuario => {
          if (usuario) {
            this.usuario = usuario;
            // Resto de la lógica aquí
          } else {
            // El libro no fue encontrado, manejarlo según sea necesario
          }
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
})

}

  prestarLibro(libro: Books, usuario: Usuario): void {
    this.prestamoService.prestarLibro(libro, usuario);
  }

  devolverLibro(libro: Books, usuario: Usuario): void {
    this.prestamoService.devolverLibro(libro, usuario);
  }

  obtenerPrestamos(): any[] {
    return this.prestamoService.obtenerPrestamos();
  }
}

