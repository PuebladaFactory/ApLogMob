import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPage } from './edit.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),   ReactiveFormsModule,],
  
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
