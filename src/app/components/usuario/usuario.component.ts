import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Books, Usuario } from '../../models/book';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit{
  libroSeleccionado: Books | null = null;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private router: Router) {
    this.formularioUsuario = this.fb.group({
      nombre: [''],
      apellido: [''],
      id: [''],
    });
  }

  usuarios: Usuario[] = [];
  usuarioSeleccionado: any = null;
  palabraBusqueda: string = '';
  formularioUsuario: FormGroup;

  ngOnInit(): void {
    this.usuarios = this.usuarioService.obtenerUsuarios()

    const libroSeleccionado = localStorage.getItem('libroSeleccionado');
    
    if (libroSeleccionado) {
      // Parsear el libro seleccionado de formato JSON
      this.libroSeleccionado = JSON.parse(libroSeleccionado);
  }
}

  onSubmit (formValue: Usuario) {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    console.log(formValue)
  }

  editarUsuario(usuarioEditado: any): void {
    
    const index = this.usuarios.findIndex((usuario) => usuario === this.usuarioSeleccionado);

    if (index !== -1) {
      this.usuarios[index] = usuarioEditado;
    }

    this.usuarioSeleccionado = null;
  }

  eliminarUsuario(usuario: Usuario): void {
    this.usuarioService.eliminarUsuario(usuario.id);
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.formularioUsuario.setValue(usuario);
  }

  resetForm(form: any): void {
    form.resetForm();
  }

  buscarUsuarios(): void {
    this.usuarios = this.usuarioService.buscarUsuariosPorNombre(this.palabraBusqueda);
  }

  guardarCambios(): void {
    const usuarioEditado: Usuario = this.formularioUsuario.value;
    this.usuarioService.editarUsuario(usuarioEditado);
    this.usuarios = this.usuarioService.obtenerUsuarios();
    this.usuarioSeleccionado = null;
    this.formularioUsuario.reset();
  }

  redirigirAPrestamo(usuario: Usuario, accion: 'asignar') {
    this.router.navigate(['/prestamo', { usuario, accion }]);
  }

  asignarUsuario(usuario: Usuario): void {
    // Obtén el ID del usuario
    const usuarioId: number = usuario.id;
  
    // Redirige a la ruta de prestamo con el ID del usuario y un ID de libro (puede ser cualquier valor, ya que lo obtendrás en PrestamoComponent)
    this.router.navigate(['/prestamo', 1, usuarioId]); // En este ejemplo, 1 es un ID de libro de ejemplo
  }
}
