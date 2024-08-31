import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirpubliPageRoutingModule } from './subirpubli-routing.module';

import { SubirpubliPage } from './subirpubli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirpubliPageRoutingModule
  ],
  declarations: [SubirpubliPage]
})
export class SubirpubliPageModule {}
