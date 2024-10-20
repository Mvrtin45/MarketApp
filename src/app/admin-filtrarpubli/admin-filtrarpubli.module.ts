import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFiltrarpubliPageRoutingModule } from './admin-filtrarpubli-routing.module';

import { AdminFiltrarpubliPage } from './admin-filtrarpubli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminFiltrarpubliPageRoutingModule
  ],
  declarations: [AdminFiltrarpubliPage]
})
export class AdminFiltrarpubliPageModule {}
