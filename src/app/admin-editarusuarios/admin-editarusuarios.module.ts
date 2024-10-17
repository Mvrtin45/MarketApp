import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditarusuariosPageRoutingModule } from './admin-editarusuarios-routing.module';

import { AdminEditarusuariosPage } from './admin-editarusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminEditarusuariosPageRoutingModule
  ],
  declarations: [AdminEditarusuariosPage]
})
export class AdminEditarusuariosPageModule {}
