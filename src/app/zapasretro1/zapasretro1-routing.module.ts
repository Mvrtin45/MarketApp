import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Zapasretro1Page } from './zapasretro1.page';

const routes: Routes = [
  {
    path: '',
    component: Zapasretro1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Zapasretro1PageRoutingModule {}
