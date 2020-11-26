import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Socket } from 'ngx-socket-io';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { OrderService } from 'src/app/services/order.service';

import { Plugins } from '@capacitor/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';
const { Toast } = Plugins;

@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.page.html',
  styleUrls: ['./selectuser.page.scss'],
})
export class SelectuserPage implements OnInit {

  public imgAvatar: string;
  public userData: Usuario
  public userSelectedID;

  public txtType;
  public loader;

  constructor( private alsertsservice: AlertsService,
    public userservice: UserserviceService,
    private orderservice: OrderService,
    private socket: Socket,
    private loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.userData = this.userservice.usuario;
    this.imgAvatar = this.userData.imageUrl;
    this.txtType = this.orderservice.newConsultData.meeting ? 'Agendar' : 'Solicitar'
  } 


 async request(){

    if( !this.userSelectedID ) {
      this.alsertsservice.showAelrt('Debe seleccionar un usuario', 'Usuario')
    }else {

      if( this.userSelectedID === 'isGuest') {
        this.orderservice.newConsultData.patient = this.userData._id
        this.orderservice.newConsultData.guest = true
      }else{
        this.orderservice.newConsultData.patient = this.userSelectedID
        this.orderservice.newConsultData.guest = false
      }

      this.orderservice.genNewOrder().subscribe( () => {
        console.log('Escuchar Socket')
        this.socketListen()
      })

    }

  }

  socketListen(){

    let socketListened = false;

    this.socket.connect();

    this.loadPresnte('Buscando a tu doctor')

    this.socket.fromEvent( this.userSelectedID).subscribe( response => {
      console.log('Doc Response', response);
      this.loader.dismiss();
      localStorage.setItem('orderSocketResp', JSON.stringify(response))
      this.router.navigate(['app/consultas/incoming'])
    });

    setTimeout(() => {
      
      if(!socketListened){
        // this.alsertsservice.showAelrt( 'No encontramos un doctor cerca de tu zona, intentalo mas tarde', 'Consulta')
        this.loader.dismiss();
        this.socket.disconnect();
      }

    }, 15000);

  }

  async loadPresnte( msg ){

    this.loader = await this.loadingCtrl.create({
      spinner: 'lines-small',
      message: msg
    })
  
    await this.loader.present();

  }

}
