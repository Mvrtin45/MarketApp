import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditarusuariosPage } from './admin-editarusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditarusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditarusuariosPageRoutingModule {}
