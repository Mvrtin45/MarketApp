import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarcontrasenaPageRoutingModule } from './modificarcontrasena-routing.module';

import { ModificarcontrasenaPage } from './modificarcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModificarcontrasenaPageRoutingModule
  ],
  declarations: [ModificarcontrasenaPage]
})
export class ModificarcontrasenaPageModule {}
