import { Routes } from '@angular/router';
import { UsuariosformComponent } from './components/usuariosform/usuariosform.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
  {path:'', component: UsuariosComponent},
  {path:'form', component: UsuariosformComponent},
  {path:'form/id', component: UsuariosformComponent}
];
