import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabsPage } from './labs.page';

const routes: Routes = [
  {
    path: '',
    component: LabsPage
  },
  {
    path: 'labschedule',
    loadChildren: () => import('./labschedule/labschedule.module').then( m => m.LabschedulePageModule)
  },
  {
    path: 'labscheckout',
    loadChildren: () => import('./labscheckout/labscheckout.module').then( m => m.LabscheckoutPageModule)
  },
  {
    path: 'labaddresses',
    loadChildren: () => import('./labaddresses/labaddresses.module').then( m => m.LabaddressesPageModule)
  },
  {
    path: 'labpaymethod',
    loadChildren: () => import('./labpaymethod/labpaymethod.module').then( m => m.LabpaymethodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabsPageRoutingModule {}
