import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTestPageRoutingModule } from './view-test-routing.module';

import { ViewTestPage } from './view-test.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTestPageRoutingModule
  ],
  declarations: [ViewTestPage],
  providers: [ Geolocation ]
})
export class ViewTestPageModule {}
