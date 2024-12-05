import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FanartPageRoutingModule } from './fanart-routing.module';

import { FanartPage } from './fanart.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FanartPageRoutingModule,
    SharedModule
  ],
  declarations: [FanartPage]
})
export class FanartPageModule {}
