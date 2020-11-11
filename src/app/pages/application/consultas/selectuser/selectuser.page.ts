import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
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

  public txtType;

  constructor( private alsertsservice: AlertsService,
    private orderservice: OrderService,
    ) { }

  ngOnInit() {

    if(this.consult.meeting) this.txtType = 'Agendar'
    else this.txtType = 'Solicitar'

  } 


  request(){

    if( !this.userSelectedID ) {
      this.alsertsservice.showAelrt('Debe seleccionar un usuario', 'Usuario')
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
      })
      
    }

  }

}
