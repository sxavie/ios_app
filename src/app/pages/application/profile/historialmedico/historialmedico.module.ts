import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialmedicoPageRoutingModule } from './historialmedico-routing.module';

import { HistorialmedicoPage } from './historialmedico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialmedicoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HistorialmedicoPage]
})
export class HistorialmedicoPageModule {}
