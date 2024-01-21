import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/book';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent implements OnInit{
  @ViewChild('formulario') formulario!: NgForm;
  
  constructor (private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    
  }

  onSubmit (formValue: Usuario) {
    this.usuarioService.guardarUsuario(formValue);
    this.resetForm();
  }

  resetForm(): void {
    if (this.formulario) {
      this.formulario.resetForm();}
  }
}
