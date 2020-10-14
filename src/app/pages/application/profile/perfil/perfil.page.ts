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
  public userData : Usuario = JSON.parse(localStorage.getItem('UserData')) || '';

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService) { 
      
      let today = new Date()
      let cumpleaños = ''

      if( localStorage.getItem('UserData') ) {
        this.userData =  JSON.parse( localStorage.getItem('UserData') )
        console.log( 'Perfil: Constructor() => UserData obtenido del localStorage JSON.parse()', this.userData)
      }else{ 
        this.userservice.getUserData().subscribe( async (resp:any) => {
          localStorage.setItem('UserData', JSON.stringify(resp) )
          this.userData = resp;
          console.log( 'Perfil: Constructor() => UserData obtenido del userservice.getUserData().subscribe()' )
        })   
      }
      
      console.log( 'Perfil: Constructor() => userData birthday: ', this.userData.birthday )
      console.log( 'Perfil: Constructor() => new Date()', today )


      // this.userData = this.userservice.getUserData()
      // .subscribe( resp => {        console.log( 'subscripcion desde Perfil.page constructor()' )})

    this.imgAvatar = localStorage.getItem('user-filename');


   
      
    }
    ngOnInit() { 

   
     
    }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }


  
  toggleMenu(){
    this.menuCtrl.toggle('tdxMenu');
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
