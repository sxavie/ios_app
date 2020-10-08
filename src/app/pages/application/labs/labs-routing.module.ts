import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabsPage } from './labs.page';

const routes: Routes = [
  {
    path: '',
    component: LabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabsPageRoutingModule {}
