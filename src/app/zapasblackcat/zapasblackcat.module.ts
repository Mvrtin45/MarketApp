import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapasblackcatPageRoutingModule } from './zapasblackcat-routing.module';

import { ZapasblackcatPage } from './zapasblackcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapasblackcatPageRoutingModule
  ],
  declarations: [ZapasblackcatPage]
})
export class ZapasblackcatPageModule {}
