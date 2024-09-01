import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoleraudechilePageRoutingModule } from './poleraudechile-routing.module';

import { PoleraudechilePage } from './poleraudechile.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoleraudechilePageRoutingModule,
    MatCardModule
  ],
  declarations: [PoleraudechilePage]
})
export class PoleraudechilePageModule {}
