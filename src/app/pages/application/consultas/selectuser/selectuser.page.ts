import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Socket } from 'ngx-socket-io';
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
  public loader;

  constructor( private alsertsservice: AlertsService,
    private orderservice: OrderService,
    private socket: Socket,
    private loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {

    this.txtType = this.consult.meeting ? 'Agendar' : 'Solicitar'

  } 


 async request(){

  this.loader = await this.loadingCtrl.create({
    spinner: 'lines-small'
  })

  await this.loader.present();

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
      this.orderservice.genNewOrder( this.consult ).subscribe( () => {
        console.log('Escuchar Socket')
        this.socketListen()
      })
      
    }

  }

  socketListen(){

    this.socket.connect();

    console.log( this.userSelectedID );
    console.log(  'socket listening')

    this.socket.fromEvent( this.userSelectedID).subscribe( response => {
      console.log('Doc Response', response);
      localStorage.setItem('orderSocketResp', JSON.stringify(response))
      this.router.navigate(['app/consultas/incoming'])
      this.loader.dismiss();
    });

  }

}
