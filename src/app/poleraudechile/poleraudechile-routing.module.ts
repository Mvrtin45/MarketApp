import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoleraudechilePage } from './poleraudechile.page';

const routes: Routes = [
  {
    path: '',
    component: PoleraudechilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoleraudechilePageRoutingModule {}
