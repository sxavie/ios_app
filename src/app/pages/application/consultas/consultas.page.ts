import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt'
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

const helper = new JwtHelperService;

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  
  public allerg: string = "";
  
  //usuario
  public userData:Usuario;
  public alergias: Array<any> = [];
  public nuevasAlergias: Array<any> = [];

  constructor( public userservice: UserserviceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userData =  JSON.parse( localStorage.getItem('UserData') )
    this.alergias = this.userData.allergies;
   }

  updateAllergies(){

    let templateUpdateAlergias = `{"allergies":"` // cerrar el }

    console.log( 'Alergias del Usuario',this.alergias )
    console.log( 'nuevas Alergias =>' , this.nuevasAlergias )

    
    // for (let i = 0; i < this.allergies.length; i++) {
      //   console.log(this.allergies[i]);
      // }
      
    if( this.nuevasAlergias.length > 0 ) {

      let alergiasString =  JSON.stringify(this.alergias);
      console.log( 'Conviertiendo nuevas alergias Array to String => ', alergiasString  )
      alergiasString = alergiasString.replace("[", "");
      alergiasString = alergiasString.replace("]", "");
      console.log( 'removiendo "[]" del String alergias => ', alergiasString  )
      
      const comma = '"';
      const replace = ''

      let result = alergiasString.split(comma).join(replace);
      console.log( 'removiendo " del String alergias => ', result  )  

      templateUpdateAlergias += `${result}`;
      templateUpdateAlergias += `"}`

      let alergiasToJSON = JSON.parse(templateUpdateAlergias)

      console.log( 'templateUpdateAlergias =>', templateUpdateAlergias )
      console.log( 'templateUpdateAlergias Parsed =>', alergiasToJSON )

      this.userservice.updateUserDataAllergies( alergiasToJSON ).subscribe( (resp:any) => {
        console.log( 'ConsultasPage: updateAllergies() => Susbcribe al put del servicio actualizar alergias', resp )
      })
      

    }else {
      console.log( 'No se agregaron nuevas alegias' )
    }



    // dont tocuh
    // let alergiasjson = '{"allergies":"Naproxeno,Betametazona,Cortizol"}';
    // console.log( 'sintxy correcta alergiasjson => ', alergiasjson ) 
    // dont tocuh

    // // let json = JSON.parse(alergiasjson)
    // // console.log( 'alergiasjson parseado => ', json ) 


    // // console.log( 'Alergias de variable' , this.allergies )

    // this.userservice.updateUserDataAllergies( json ).subscribe( (resp:any) => {
    //   console.log( 'ConsultasPage: updateAllergies() => Susbcribe al put del servicio actualizar alergias', resp )
    // })


  }

  addAllergies(){



    this.alergias.push(this.allerg);
    this.nuevasAlergias.push(this.allerg);

    this.allerg = '';

  }

  logOut(){
    this.userservice.logout();
    this.router.navigate(['/'])
  }

}
