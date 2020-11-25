import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Capacitor, Plugins } from '@capacitor/core'
import { LoadingController, ModalController } from '@ionic/angular';

import { UserserviceService } from 'src/app/services/userservice.service';

import { ChangepaymentComponent } from 'src/app/components/changepayment/changepayment.component';
import { AlertsService } from 'src/app/services/alerts.service';
import { OrderService } from 'src/app/services/order.service';

declare var google;

const { Geolocation } = Capacitor.Plugins;

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  public AddrList: any;
  
  public selAddress;
  public isVirtual = false 

  public isIncomming = true;
  public showSwitch = true;
  
  public map;
  public myLatLng = {lat:0,lng:0};

  constructor( private loadingCtrl: LoadingController,
    private router: Router,
    private orderservice: OrderService,
    private userservice: UserserviceService,
    private alertsservice: AlertsService,
    private modalCtrl: ModalController,
    private loadCtrl:LoadingController ) {
      
  }

 

  ngOnInit() {

    // consultType = Vierual/Presecial
    // 2 Presencial
    // 1 Virtual

    console.log(this.orderservice.newConsultData )

    if(this.orderservice.newConsultData.consultReason != 1){
      this.showSwitch = false;
      this.orderservice.newConsultData.consultType = 2
    }
    
    this.getAddressList();

  }

  async getAddressList(){

    
    await this.initMap(this.myLatLng, 1, 'current');
    
    this.AddrList = await this.userservice.getAddressList().toPromise();
    

  }

  selectedAddress(){
    
    if(this.selAddress === 'pinMap'){

      this.initMap(this.myLatLng, 1, 'PIN')

    }else {
      let address = this.AddrList.find( x => {
        return x._id === this.selAddress;
      })
  
      this.myLatLng = {
        lat: address.latitude,
        lng: address.longitude
      }
  
      this.initMap(this.myLatLng, 2, address.name)
    };

  }

  reqOrderNow( meeting : boolean){

    this.orderservice.newConsultData.paymentMethod = (this.userservice.defaultMethod.cardID === 'cash') ? 2 : 1
    this.orderservice.newConsultData.consultType = (this.isVirtual) ? 1 : 2
    this.orderservice.newConsultData.meeting = meeting
    this.orderservice.newConsultData.lat = this.myLatLng.lat
    this.orderservice.newConsultData.lon = this.myLatLng.lng
    let navigation = (meeting) ? 'app/consultas/schedule' : 'app/consultas/motivos'

    this.router.navigate([navigation])
    
  }


  async changeMethod(){

    const modal = await this.modalCtrl.create({
      component: ChangepaymentComponent,
      cssClass: 'changePay-modal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(() => {
      this.orderservice.newConsultData.paymentMethod = (this.userservice.defaultMethod.cardID === 'cash') ? 2 : 1

    });
    return await modal.present();

  }

  // Map definition
  async initMap( pos, source, title ){
    
    const loading = await this.loadCtrl.create({spinner: 'lines'})
    loading.present();

    let zoom = 16;

    if( source === 1 ){ 
      pos = await this.getCurrentPosition() 
      zoom = 18;
    };

    const mapHtml = await document.getElementById('mapa');

    let mapOpts = {
      zoom:zoom, 
      center:pos,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    };

    this.map = new google.maps.Map( mapHtml, mapOpts);

    if( source === 2 ){ 

      let ico = './assets/pin_31x36.png'

      // source 2: Usuario selecciona de direcciones guardadas
      const marker = new google.maps.Marker({ 
        position: pos,
        map:this.map,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: ico
      });

    } else {

      // soruce 1: geolocalizacion OnInit y seleccionar en el mapa

      let ico = './assets/pin_3.png'
      const darggMarker = new google.maps.Marker({
        position: pos,
        map: this.map,
        draggable: true,
        title: title,
        animation: google.maps.Animation.DROP,
        icon:ico
      });
  
      darggMarker.addListener("click", () => {
        if(darggMarker.getAnimation() !== null) {
          darggMarker.setAnimation(null);
        } else {
          darggMarker.setAnimation(google.maps.Animation.BOUNCE)
        }
      });

      darggMarker.addListener('dragend', ( dragendPos ) => {

        this.myLatLng = {
          lat: dragendPos.latLng.lat().toFixed(6),
          lng: dragendPos.latLng.lng().toFixed(6)
        }

        this.map.panTo(dragendPos.latLng)

      })

      this.map.setCenter(darggMarker.position);

    }
    
    loading.dismiss();
  }

  private async getCurrentPosition(){

    try {
      const position = await Plugins.Geolocation.getCurrentPosition();
      return this.myLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    } catch (err) {
      console.log( 'getCurrentPosition() => ', err )
      if(err.code === 1){ this.alertsservice.nativeToast('Usuario denego ubicación')};
      if(err.code === 2){ this.alertsservice.nativeToast('Ubocación no disponible')};
  
    }
    
  }

  async displayLoader(){

    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
    return this.loadingCtrl;

  }

}
