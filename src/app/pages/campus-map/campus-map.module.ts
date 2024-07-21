import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CampusMapPage } from './campus-map';
import { CampusMapPageRoutingModule } from './campus-map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CampusMapPageRoutingModule
  ],
  declarations: [CampusMapPage,]
})

export class CampusMapModule { }
