import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeanlevisPageRoutingModule } from './jeanlevis-routing.module';

import { JeanlevisPage } from './jeanlevis.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeanlevisPageRoutingModule,
    MatCardModule
  ],
  declarations: [JeanlevisPage]
})
export class JeanlevisPageModule {}
