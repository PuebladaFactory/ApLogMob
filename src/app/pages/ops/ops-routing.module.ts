import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpsPage } from './ops.page';

const routes: Routes = [
  {
    path: '',
    component: OpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpsPageRoutingModule {}
