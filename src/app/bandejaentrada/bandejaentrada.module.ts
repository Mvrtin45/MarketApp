import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BandejaentradaPageRoutingModule } from './bandejaentrada-routing.module';

import { BandejaentradaPage } from './bandejaentrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BandejaentradaPageRoutingModule
  ],
  declarations: [BandejaentradaPage]
})
export class BandejaentradaPageModule {}
