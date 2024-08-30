import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolerasPageRoutingModule } from './poleras-routing.module';

import { PolerasPage } from './poleras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolerasPageRoutingModule
  ],
  declarations: [PolerasPage]
})
export class PolerasPageModule {}
