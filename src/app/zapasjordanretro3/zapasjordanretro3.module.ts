import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Zapasjordanretro3PageRoutingModule } from './zapasjordanretro3-routing.module';

import { Zapasjordanretro3Page } from './zapasjordanretro3.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Zapasjordanretro3PageRoutingModule,
    MatCardModule
  ],
  declarations: [Zapasjordanretro3Page]
})
export class Zapasjordanretro3PageModule {}
