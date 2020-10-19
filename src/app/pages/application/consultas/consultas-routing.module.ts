import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasPage } from './consultas.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultasPage
  },
  {
    path: 'motivos',
    loadChildren: () => import('./motivos/motivos.module').then( m => m.MotivosPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'selectuser',
    loadChildren: () => import('./selectuser/selectuser.module').then( m => m.SelectuserPageModule)
  },
  {
    path: 'incoming',
    loadChildren: () => import('./incoming/incoming.module').then( m => m.IncomingPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasPageRoutingModule {}
