import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegajoPageRoutingModule } from './legajo-routing.module';

import { LegajoPage } from './legajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegajoPageRoutingModule
  ],
  declarations: [LegajoPage]
})
export class LegajoPageModule {}
