import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoleracolocoloPageRoutingModule } from './poleracolocolo-routing.module';

import { PoleracolocoloPage } from './poleracolocolo.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoleracolocoloPageRoutingModule,
    MatCardModule
  ],
  declarations: [PoleracolocoloPage]
})
export class PoleracolocoloPageModule {}
