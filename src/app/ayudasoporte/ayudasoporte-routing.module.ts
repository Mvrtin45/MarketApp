import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasoportePage } from './ayudasoporte.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasoportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasoportePageRoutingModule {}
