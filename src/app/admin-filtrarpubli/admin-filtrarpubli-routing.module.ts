import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFiltrarpubliPage } from './admin-filtrarpubli.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFiltrarpubliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFiltrarpubliPageRoutingModule {}
