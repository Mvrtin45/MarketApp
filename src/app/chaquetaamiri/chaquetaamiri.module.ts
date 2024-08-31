import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChaquetaamiriPageRoutingModule } from './chaquetaamiri-routing.module';

import { ChaquetaamiriPage } from './chaquetaamiri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChaquetaamiriPageRoutingModule
  ],
  declarations: [ChaquetaamiriPage]
})
export class ChaquetaamiriPageModule {}
