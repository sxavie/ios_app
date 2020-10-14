import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-outletapp',
  templateUrl: './outletapp.page.html',
  styleUrls: ['./outletapp.page.scss'],
})
export class OutletappPage implements OnInit {


  constructor( private userservice: UserserviceService ) { }

  ngOnInit() {

    // // // si enruto desde aqui, no el token y el id se quedan nulos en el getuserdata
    // console.log( ' OutletappPage => Entrando al GetUserData' )
    // this.userservice.getUserData().subscribe( resp => {
    //   console.log( 'respuesta desde el Outlet: ', resp )
    // })
  
  }

}
