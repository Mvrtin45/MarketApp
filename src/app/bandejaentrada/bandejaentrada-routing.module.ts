import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BandejaentradaPage } from './bandejaentrada.page';

const routes: Routes = [
  {
    path: '',
    component: BandejaentradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BandejaentradaPageRoutingModule {}
