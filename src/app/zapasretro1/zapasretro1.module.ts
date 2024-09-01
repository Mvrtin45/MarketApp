import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Zapasretro1PageRoutingModule } from './zapasretro1-routing.module';

import { Zapasretro1Page } from './zapasretro1.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Zapasretro1PageRoutingModule,
    MatCardModule
  ],
  declarations: [Zapasretro1Page]
})
export class Zapasretro1PageModule {}
