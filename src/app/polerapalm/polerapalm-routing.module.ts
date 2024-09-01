import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolerapalmPage } from './polerapalm.page';

const routes: Routes = [
  {
    path: '',
    component: PolerapalmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolerapalmPageRoutingModule {}
