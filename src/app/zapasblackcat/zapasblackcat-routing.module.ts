import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapasblackcatPage } from './zapasblackcat.page';

const routes: Routes = [
  {
    path: '',
    component: ZapasblackcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapasblackcatPageRoutingModule {}
