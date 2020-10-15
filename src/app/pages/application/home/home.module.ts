import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpRequestInterceptor } from 'src/app/interceptors/http-loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomePage],
  // providers:[
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpRequestInterceptor,
  //     multi: true
  //   }
  // ]
}) 
export class HomePageModule {}
