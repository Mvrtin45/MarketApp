import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeanfnPageRoutingModule } from './jeanfn-routing.module';

import { JeanfnPage } from './jeanfn.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeanfnPageRoutingModule,
    MatCardModule
  ],
  declarations: [JeanfnPage]
})
export class JeanfnPageModule {}
