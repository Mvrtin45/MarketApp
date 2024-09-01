import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeanamiriPageRoutingModule } from './jeanamiri-routing.module';

import { JeanamiriPage } from './jeanamiri.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeanamiriPageRoutingModule,
    MatCardModule
  ],
  declarations: [JeanamiriPage]
})
export class JeanamiriPageModule {}
