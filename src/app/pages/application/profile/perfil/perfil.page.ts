import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Menu app propieties
  hostMenuId = 'hostMenuProfile'
  nameMenuId = 'profileHome'
  
  public imgAvatar = localStorage.getItem('user-filename');
  public userData : Usuario[] = JSON.parse(localStorage.getItem('UserData')) || '';

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService) { 

      if( localStorage.getItem('UserData') ) {
        this.userData =  JSON.parse( localStorage.getItem('UserData') )
        console.log( 'Perfil: Constructor() => UserData obtenido del localStorage JSON.parse()' )
      }else{ 
        this.userservice.getUserData().subscribe( async(resp:any) => {
          localStorage.setItem('UserData', JSON.stringify(resp) )
          this.userData = resp;
          console.log( 'Perfil: Constructor() => UserData obtenido del userservice.getUserData().subscribe()' )
        })   
      }

    this.imgAvatar = localStorage.getItem('user-filename');
      
    }

    ngOnInit() { }




  
    toggleMenu(){
      this.menuCtrl.toggle('tdxMenu');
    }

    goHome(){
      this.router.navigate(['/app/home'])
    }

}
