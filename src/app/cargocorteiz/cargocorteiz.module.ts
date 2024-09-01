import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargocorteizPageRoutingModule } from './cargocorteiz-routing.module';

import { CargocorteizPage } from './cargocorteiz.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargocorteizPageRoutingModule,
    MatCardModule
  ],
  declarations: [CargocorteizPage]
})
export class CargocorteizPageModule {}
