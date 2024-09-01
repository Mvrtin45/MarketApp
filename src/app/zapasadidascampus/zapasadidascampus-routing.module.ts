import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapasadidascampusPage } from './zapasadidascampus.page';

const routes: Routes = [
  {
    path: '',
    component: ZapasadidascampusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapasadidascampusPageRoutingModule {}
