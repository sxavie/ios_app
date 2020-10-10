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


  usermEmail: string = 'xavier.hernandez@vasster.com';
  userPwd: string = '123'; 

  userData: any;
  lat = 51.678418;
  lng = 7.809007;

  public imgAvatar = localStorage.getItem('user-filename');
  public userName = localStorage.getItem('user-name')

  constructor(  private menuCtrl: MenuController,
    public router: Router,
    public menuData: MenuDataService,
    public userservice: UserserviceService, 
    ) {

      userservice.decodeToken( localStorage.getItem('jwttoken') );
      
    }
      
  ngOnInit() {

    

  }
      
  toggleMenu(){
    this.menuCtrl.toggle("txMenu");
  }
  
  irA(pagex: string) {
    
    // console.log(pagex);
    
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['/consultas']);
        break;
      }
      case 'Resacas': {
        this.router.navigate(['/resacas'])
        break
      }
      case 'Farmaica': {
        this.router.navigate(['/farmacia'])
        break
      }
      case 'Lab': {
        this.router.navigate(['/labs'])
        break
      }
    }

  }

}
