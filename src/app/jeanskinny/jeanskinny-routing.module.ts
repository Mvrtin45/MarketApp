import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeanskinnyPage } from './jeanskinny.page';

const routes: Routes = [
  {
    path: '',
    component: JeanskinnyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeanskinnyPageRoutingModule {}
