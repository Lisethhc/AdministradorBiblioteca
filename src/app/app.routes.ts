import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LibroComponent } from './components/libro/libro.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import bootstrap from '../main.server';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

export const routes: Routes = [
        { path: '', component: LibroComponent},
        { path: 'administrador', component: AdministradorComponent},
        { path: 'usuario', component: UsuarioComponent},
        { path: 'prestamo/:libroId/:usuarioId', component: PrestamoComponent },
        { path: 'crearUsuario', component: CrearUsuarioComponent}
];


@NgModule({
  declarations: [
    LibroComponent,
    AdministradorComponent,
    PrestamoComponent,
    UsuarioComponent,
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot (routes)
],
  bootstrap: []
   
})
export class AppModule {}

