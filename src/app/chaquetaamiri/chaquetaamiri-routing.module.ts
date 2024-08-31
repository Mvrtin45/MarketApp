import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaquetaamiriPage } from './chaquetaamiri.page';

const routes: Routes = [
  {
    path: '',
    component: ChaquetaamiriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChaquetaamiriPageRoutingModule {}
