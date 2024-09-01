import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapatosvestirPageRoutingModule } from './zapatosvestir-routing.module';

import { ZapatosvestirPage } from './zapatosvestir.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatosvestirPageRoutingModule,
    MatCardModule
  ],
  declarations: [ZapatosvestirPage]
})
export class ZapatosvestirPageModule {}
