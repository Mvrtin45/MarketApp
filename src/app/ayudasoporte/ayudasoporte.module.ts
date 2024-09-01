import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasoportePageRoutingModule } from './ayudasoporte-routing.module';

import { AyudasoportePage } from './ayudasoporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasoportePageRoutingModule
  ],
  declarations: [AyudasoportePage]
})
export class AyudasoportePageModule {}
