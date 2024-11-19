import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscomprasPage } from './miscompras.page';

const routes: Routes = [
  {
    path: '',
    component: MiscomprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscomprasPageRoutingModule {}
