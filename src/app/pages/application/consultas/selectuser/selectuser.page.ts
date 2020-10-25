import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consult } from 'src/app/models/consult.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.page.html',
  styleUrls: ['./selectuser.page.scss'],
})
export class SelectuserPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  public userData = JSON.parse( localStorage.getItem('UserData') )
  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'))
  public userSelectedID;

  constructor( private router: Router,
    private orderservice: OrderService,
    ) { }

  ngOnInit() {

    console.log( 'data del usuario ', this.userData )
    console.log( 'data de la consulta ', this.consult )

  }

  request(){

    console.log( this.userSelectedID )

    if( !this.userSelectedID ) {
      console.log(' debe seleccionar a un usuario' )
    }else {

      if( this.userSelectedID === 'isGuest') {
        this.consult.patient = localStorage.getItem('user-id')
        this.consult.guest = true
      }else{
        this.consult.patient = this.userSelectedID
        this.consult.guest = false
      }

      localStorage.setItem('orderDetail', JSON.stringify(this.consult))


      this.orderservice.genNewOrder( this.consult ).subscribe( resp => {
        // console.log( 'SelectuserPage: request => OrderService subscription response ', resp )
      })
      

      // this.router.navigate(['app/consultas/incoming'])
    }

  }

}
