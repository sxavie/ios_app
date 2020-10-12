import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialmedicoPageRoutingModule } from './historialmedico-routing.module';

import { HistorialmedicoPage } from './historialmedico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialmedicoPageRoutingModule
  ],
  declarations: [HistorialmedicoPage]
})
export class HistorialmedicoPageModule {}
