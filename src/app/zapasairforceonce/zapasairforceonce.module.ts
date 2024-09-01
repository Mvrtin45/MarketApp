import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapasairforceoncePageRoutingModule } from './zapasairforceonce-routing.module';

import { ZapasairforceoncePage } from './zapasairforceonce.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapasairforceoncePageRoutingModule,
    MatCardModule
  ],
  declarations: [ZapasairforceoncePage]
})
export class ZapasairforceoncePageModule {}
