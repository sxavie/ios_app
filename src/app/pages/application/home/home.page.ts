import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import {} from 'googlemaps';

import { Capacitor, Plugins, GeolocationPosition } from '@capacitor/core';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { Usuario } from 'src/app/models/usuario.model';
import { OrderService } from 'src/app/services/order.service';

const { Geolocation } = Capacitor.Plugins;

// declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 
export class HomePage implements OnInit {

  public map;
  public myLatLng;
  public loading;

  public userData: Usuario;

  constructor(  private menuCtrl: MenuController,
    public router: Router,
    public menuData: MenuDataService,
    public userservice: UserserviceService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public alertsservice: AlertsService,
    public orderService: OrderService
    ) { 

    }
      
  ngOnInit(){

    this.userservice.getUserData().subscribe( async(resp:any) => {

      this.userData = resp;


      if( !this.userData.isOrder === null ){
      
        this.alertsservice.showAelrt('Orden en curso', 'Orden')
        // this.router.navigate(['/app/consultas/incoming'])
      }

      this.initMap();

    })   
      
  }


  
  irA(pagex: string) {
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['app/consultas']);
        break;
      }
      case 'Resacas': {
        this.orderService.newConsultData = new Consult(6)
        this.router.navigate(['app/consultas/request'])
        break
      }
      case 'Farmaica': {
        this.router.navigate(['app/farmacia'])
        break
      }
      case 'Lab': {
        this.router.navigate(['app/labs'])
        break
      }
    }

  }

  async initMap(){

    let pos = await this.getPosition() 
 
    const mapHtml = document.getElementById('homemapa');

    let mapOpts = {
      zoom:16, 
      center:pos,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    };

    this.map = new google.maps.Map( mapHtml, mapOpts )

   
  }

  async getPosition() {

      try {
        const position = await Plugins.Geolocation.getCurrentPosition();
        return this.myLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      } catch (err) {
        console.log( 'getCurrentPosition() => ', err )
        // if(err.code === 1){ this.alertsservice.nativeToast('Usuario denego ubicación')};
        // if(err.code === 2){ this.alertsservice.nativeToast('Ubocación no disponible')};
      }

  }

  async displayLoader(){

    this.loading = await this.loadingCtrl.create({
      spinner: 'lines-small',
      translucent: true
    });

    await this.loading.present();
    // return this.loadingCtrl;
  }

  toggleMenu(){ 
    this.menuCtrl.toggle('tdxMenu') 
  }

  ngOnDestroy(){
    localStorage.removeItem('User-Data')
  }
  
}
