import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamiliaresPageRoutingModule } from './familiares-routing.module';

import { FamiliaresPage } from './familiares.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliaresPageRoutingModule
  ],
  declarations: [FamiliaresPage]
})
export class FamiliaresPageModule {}
