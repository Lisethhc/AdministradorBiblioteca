import { Component, OnInit, ViewChild } from '@angular/core';
import { Books } from '../../models/book';
import { libros } from '../../../libros';
import { LibroService } from '../../services/libro.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit{
  @ViewChild('formulario') formulario!: NgForm;
  
  constructor (private libroService: LibroService) {}


  ngOnInit(): void {
    
  }

  onSubmit (formValue: Books) {
    this.libroService.guardarLibro(formValue);
    this.resetForm();
  }

  resetForm(): void {
    if (this.formulario) {
      this.formulario.resetForm();}
  }
}