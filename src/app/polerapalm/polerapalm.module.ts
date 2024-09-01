import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolerapalmPageRoutingModule } from './polerapalm-routing.module';

import { PolerapalmPage } from './polerapalm.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolerapalmPageRoutingModule,
    MatCardModule
  ],
  declarations: [PolerapalmPage]
})
export class PolerapalmPageModule {}
