import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Menu } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
 

export class MenuComponent implements OnInit, ViewWillEnter {
  
  @Input('menuHostId') menuHostId: string;
  @Input('menuNameId') menuNameId: string;

  public imgAvatar = localStorage.getItem('user-filename');
  public userName = localStorage.getItem('user-name');
  
  menuOpts: Observable<Menu[]>;

  constructor(  private menuData: MenuDataService,
      private authservice: AuthService) { 
      }
  ionViewWillEnter() {
    console.log('getting username and userfilename')
    this.imgAvatar = localStorage.getItem('user-filename');
    this.userName = localStorage.getItem('user-name')
  }
      
  ngOnInit() {
    this.menuOpts = this.menuData.getMenuOpts();
  }

  logOut(){
    this.authservice.logout();
  }

}
