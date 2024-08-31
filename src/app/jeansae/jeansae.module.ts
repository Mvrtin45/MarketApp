import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeansaePageRoutingModule } from './jeansae-routing.module';

import { JeansaePage } from './jeansae.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeansaePageRoutingModule,
    MatCardModule
  ],
  declarations: [JeansaePage]
})
export class JeansaePageModule {}
