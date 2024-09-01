import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatosvestirPage } from './zapatosvestir.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatosvestirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatosvestirPageRoutingModule {}
