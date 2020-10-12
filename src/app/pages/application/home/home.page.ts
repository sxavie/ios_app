import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 
export class HomePage implements OnInit {

  //Menu app propieties
  hostMenuId = 'hostMenuHome'
  nameMenuId = 'menuHome'

  usermEmail: string = 'xavier.hernandez@vasster.com';
  userPwd: string = '123'; 

  userData: any;
  lat = 51.678418;
  lng = 7.809007;

  public imgAvatar = localStorage.getItem('user-filename');
  public userName = localStorage.getItem('user-name')

  // public uName;
  // public uImg;

  constructor(  private menuCtrl: MenuController,
    public router: Router,
    public menuData: MenuDataService,
    public userservice: UserserviceService, 
    ) {

      // userservice.decodeToken( localStorage.getItem('jwttoken') );
      
      // // manda errores,  
      // this.uName = userservice.usuario.userName;
      // this.uImg = userservice.usuario.imageUrl;

    }
      
  ngOnInit() {

  }
      
  toggleMenu(){
    // this.menuCtrl.toggle(this.nameMenuId);
    this.menuCtrl.toggle('tdxMenu');
  }
  
  irA(pagex: string) {
    
    // console.log(pagex);
    
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['app/consultas']);
        break;
      }
      case 'Resacas': {
        this.router.navigate(['app/resacas'])
        break
      }
      case 'Farmaica': {
        this.router.navigate(['app/farmacia'])
        break
      }
      case 'Lab': {
        this.router.navigate(['app/labs'])
        break
      }
    }

  }

}
