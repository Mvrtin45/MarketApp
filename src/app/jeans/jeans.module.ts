import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeansPageRoutingModule } from './jeans-routing.module';

import { JeansPage } from './jeans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeansPageRoutingModule
  ],
  declarations: [JeansPage]
})
export class JeansPageModule {}
