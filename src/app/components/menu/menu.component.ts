import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Menu } from 'src/app/interfaces/interfaces';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  public userName = localStorage.getItem('user-name')
  
  menuOpts: Observable<Menu[]>;
  constructor( 
    private menuData: MenuDataService,
    private userservice: UserserviceService
   ) { 
    //  this.imageUrl = userservice.usuario.imageUrl
   }

  ngOnInit() {
    this.menuOpts = this.menuData.getMenuOpts();

    // this.menuData.getUser().subscribe( resp => {
    //   console.log( resp )
    // });

    // console.log(this.userData)

  }

}
