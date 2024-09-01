import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapasadidascampusPageRoutingModule } from './zapasadidascampus-routing.module';

import { ZapasadidascampusPage } from './zapasadidascampus.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapasadidascampusPageRoutingModule,
    MatCardModule
  ],
  declarations: [ZapasadidascampusPage]
})
export class ZapasadidascampusPageModule {}
