import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page'; // Cambié a PerfilPage

const routes: Routes = [
  {
    path: '',
    component: PerfilPage // Cambié a PerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {} // Cambié el nombre a PerfilPageRoutingModule