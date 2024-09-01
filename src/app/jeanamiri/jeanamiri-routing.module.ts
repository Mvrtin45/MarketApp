import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeanamiriPage } from './jeanamiri.page';

const routes: Routes = [
  {
    path: '',
    component: JeanamiriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeanamiriPageRoutingModule {}
