import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolerabasicasfPage } from './polerabasicasf.page';

const routes: Routes = [
  {
    path: '',
    component: PolerabasicasfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolerabasicasfPageRoutingModule {}
