import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapasvapormaxPage } from './zapasvapormax.page';

const routes: Routes = [
  {
    path: '',
    component: ZapasvapormaxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapasvapormaxPageRoutingModule {}
