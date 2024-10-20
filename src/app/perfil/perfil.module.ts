import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module'; // Cambié a PerfilPageRoutingModule
import { PerfilPage } from './perfil.page'; // Cambié a PerfilPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule // Cambié a PerfilPageRoutingModule
  ],
  declarations: [PerfilPage] // Cambié a PerfilPage
})
export class PerfilPageModule {} // Cambié a PerfilPageModule
