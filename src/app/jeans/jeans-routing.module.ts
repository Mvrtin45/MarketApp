import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeansPage } from './jeans.page';

const routes: Routes = [
  {
    path: '',
    component: JeansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeansPageRoutingModule {}
