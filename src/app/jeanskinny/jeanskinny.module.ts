import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeanskinnyPageRoutingModule } from './jeanskinny-routing.module';

import { JeanskinnyPage } from './jeanskinny.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeanskinnyPageRoutingModule,
    MatCardModule
  ],
  declarations: [JeanskinnyPage]
})
export class JeanskinnyPageModule {}
