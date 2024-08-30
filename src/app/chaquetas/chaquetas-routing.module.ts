import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaquetasPage } from './chaquetas.page';

const routes: Routes = [
  {
    path: '',
    component: ChaquetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChaquetasPageRoutingModule {}
