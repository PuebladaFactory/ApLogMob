import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasPageRoutingModule } from './notas-routing.module';

import { NotasPage } from './notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotasPage]
})
export class NotasPageModule {}
