import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoleracolocoloPage } from './poleracolocolo.page';

const routes: Routes = [
  {
    path: '',
    component: PoleracolocoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoleracolocoloPageRoutingModule {}
