import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapasairforceoncePage } from './zapasairforceonce.page';

const routes: Routes = [
  {
    path: '',
    component: ZapasairforceoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapasairforceoncePageRoutingModule {}
