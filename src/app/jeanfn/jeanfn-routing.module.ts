import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeanfnPage } from './jeanfn.page';

const routes: Routes = [
  {
    path: '',
    component: JeanfnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeanfnPageRoutingModule {}
