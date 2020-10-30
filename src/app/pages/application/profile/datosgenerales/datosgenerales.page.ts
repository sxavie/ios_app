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
  
  public userAge:number;
  public edad:string = ' años'

  public edit_save = 'Editar'
  public isEdit = false;

  public nombre = 'Santiago Hernandez'

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService ) { }

  ngOnInit( ) {

    this.imgAvatar = localStorage.getItem('user-filename');
  
    if( localStorage.getItem('UserData') ) {
      console.log( 'LolcaStorage Data' )
      this.userData =  JSON.parse( localStorage.getItem('UserData') )
      this.userAge = this.calcularEdad(this.userData.birthday)
    }else{ 
      console.log( 'UserService Data' );
      this.userservice.getUserData().subscribe( (resp:any) => {
        localStorage.setItem('UserData', JSON.stringify(resp) )
        this.userData = resp;
        this.userAge = this.calcularEdad(this.userData.birthday)

      })   
    }
    
    console.log( 'DatosGenerales ==> Birthdate  ', this.userData.birthday )

    this.edad = this.userAge+'  años';

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

  edit(){ 
    if( !this.isEdit ){
      this.edit_save = 'Guardar'
    }else{
      this.edit_save = "Editar"
    }

    this.isEdit = !this.isEdit
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
