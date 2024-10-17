import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditarpublicacionesPageRoutingModule } from './admin-editarpublicaciones-routing.module';

import { AdminEditarpublicacionesPage } from './admin-editarpublicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEditarpublicacionesPageRoutingModule
  ],
  declarations: [AdminEditarpublicacionesPage]
})
export class AdminEditarpublicacionesPageModule {}
