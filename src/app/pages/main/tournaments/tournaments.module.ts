import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsPageRoutingModule } from './tournaments-routing.module';

import { TournamentsPage } from './tournaments.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsPageRoutingModule,
    SharedModule
  ],
  declarations: [TournamentsPage]
})
export class TournamentsPageModule {}
