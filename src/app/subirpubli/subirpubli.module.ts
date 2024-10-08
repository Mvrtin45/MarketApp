import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';

import { SubirpubliPageRoutingModule } from './subirpubli-routing.module';
import { SubirpubliPage } from './subirpubli.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirpubliPageRoutingModule,
    MatCardModule,
    ReactiveFormsModule 
  ],
  declarations: [SubirpubliPage]
})
export class SubirpubliPageModule {}

