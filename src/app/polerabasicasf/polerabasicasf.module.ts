import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolerabasicasfPageRoutingModule } from './polerabasicasf-routing.module';

import { PolerabasicasfPage } from './polerabasicasf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolerabasicasfPageRoutingModule
  ],
  declarations: [PolerabasicasfPage]
})
export class PolerabasicasfPageModule {}
