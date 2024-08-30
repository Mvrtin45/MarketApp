import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChaquetasPageRoutingModule } from './chaquetas-routing.module';

import { ChaquetasPage } from './chaquetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChaquetasPageRoutingModule
  ],
  declarations: [ChaquetasPage]
})
export class ChaquetasPageModule {}
