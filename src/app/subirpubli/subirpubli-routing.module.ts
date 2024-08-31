import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirpubliPage } from './subirpubli.page';

const routes: Routes = [
  {
    path: '',
    component: SubirpubliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirpubliPageRoutingModule {}
