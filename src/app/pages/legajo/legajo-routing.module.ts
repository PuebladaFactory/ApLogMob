import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegajoPage } from './legajo.page';

const routes: Routes = [
  {
    path: '',
    component: LegajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegajoPageRoutingModule {}
