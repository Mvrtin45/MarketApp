import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePublicacionPageRoutingModule } from './detalle-publicacion-routing.module';

import { DetallePublicacionPage } from './detalle-publicacion.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePublicacionPageRoutingModule,
    MatCardModule
  ],
  declarations: [DetallePublicacionPage]
})
export class DetallePublicacionPageModule {}
