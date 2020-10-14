import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-datosgenerales',
  templateUrl: './datosgenerales.page.html',
  styleUrls: ['./datosgenerales.page.scss'],
})
export class DatosgeneralesPage implements OnInit {


  public imgAvatar;
  public userData : Usuario = JSON.parse(localStorage.getItem('UserData')) || '';

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService ) { }

  ngOnInit( ) {

    this.imgAvatar = localStorage.getItem('user-filename');
  
    if( localStorage.getItem('UserData') ) {
      console.log( 'LolcaStorage Data' )
      this.userData =  JSON.parse( localStorage.getItem('UserData') )
    }else{ 
      console.log( 'UserService Data' );
      this.userservice.getUserData().subscribe( (resp:any) => {
        localStorage.setItem('UserData', JSON.stringify(resp) )
        this.userData = resp;
      })   
    }

  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
