import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliaresPage } from './familiares.page';

const routes: Routes = [
  {
    path: '',
    component: FamiliaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliaresPageRoutingModule {}
