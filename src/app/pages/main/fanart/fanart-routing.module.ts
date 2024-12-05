import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FanartPage } from './fanart.page';

const routes: Routes = [
  {
    path: '',
    component: FanartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FanartPageRoutingModule {}
