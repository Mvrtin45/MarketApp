import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Zapasjordanretro3Page } from './zapasjordanretro3.page';

const routes: Routes = [
  {
    path: '',
    component: Zapasjordanretro3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Zapasjordanretro3PageRoutingModule {}
