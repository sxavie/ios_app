import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
// import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAqQAyBBDQ7ovDbXpWPj-fczai01MepyQg'
    // })

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
