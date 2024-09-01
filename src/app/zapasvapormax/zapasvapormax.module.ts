import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapasvapormaxPageRoutingModule } from './zapasvapormax-routing.module';

import { ZapasvapormaxPage } from './zapasvapormax.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapasvapormaxPageRoutingModule,
    MatCardModule
  ],
  declarations: [ZapasvapormaxPage]
})
export class ZapasvapormaxPageModule {}
