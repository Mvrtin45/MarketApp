import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiscomprasPageRoutingModule } from './miscompras-routing.module';

import { MiscomprasPage } from './miscompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiscomprasPageRoutingModule
  ],
  declarations: [MiscomprasPage]
})
export class MiscomprasPageModule {}
