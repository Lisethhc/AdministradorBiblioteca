import { Injectable } from '@angular/core';
import { Usuario } from '../models/book';
import { usuarios } from '../../usuario';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  constructor() { 
    this.cargarUsuarios();
    console.log(this.usuarios);
  }

  obtenerUsuarios(): Usuario[] {
    return [...this.usuarios];
  }

  guardarUsuario(usuario: Usuario): void {
    const existeUsuario = this.usuarios.some(l => l.id === usuario.id);

    if (existeUsuario) {
      alert('Este usuario ya está creado.');
    } else {
      this.usuarios.push(usuario);
      this.guardarUsuariosEnLocalStorage();
    }
  }

  buscarUsuarioPorId(id: number): Usuario | null {
    return this.usuarios.find(usuario => usuario.id === id) || null;
  }

  eliminarUsuario(id: number): void {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    this.guardarUsuariosEnLocalStorage();
  }

  resetForm(form: any): void {
    form.resetForm();
  }

  buscarUsuariosPorNombre(palabra: string): Usuario[] {
    palabra = palabra.toLowerCase();
    return this.usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(palabra));
  }

  editarUsuario(usuario: Usuario): void {
    const index = this.usuarios.findIndex(usuarioActual => usuarioActual.id === usuario.id);

    if (index !== -1) {
      this.usuarios[index] = usuario;
      this.guardarUsuariosEnLocalStorage();
    }
  }

  private cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    } else {
      this.usuarios = [...usuarios];
    }
  }

  private guardarUsuariosEnLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario | undefined> {
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.id === id);
    return of(usuarioEncontrado);
  }

}



