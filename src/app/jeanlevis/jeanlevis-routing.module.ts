import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeanlevisPage } from './jeanlevis.page';

const routes: Routes = [
  {
    path: '',
    component: JeanlevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeanlevisPageRoutingModule {}
