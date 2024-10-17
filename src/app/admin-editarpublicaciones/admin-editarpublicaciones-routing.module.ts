import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditarpublicacionesPage } from './admin-editarpublicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditarpublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditarpublicacionesPageRoutingModule {}
