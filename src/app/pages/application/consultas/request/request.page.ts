import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Capacitor, Plugins } from '@capacitor/core'
import { LoadingController, ModalController } from '@ionic/angular';

import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AddressList } from 'src/app/interfaces/interfaces';
import { Consult } from 'src/app/models/consult.model';
import { ChangepaymentComponent } from 'src/app/components/changepayment/changepayment.component';
import { AlertsService } from 'src/app/services/alerts.service';

declare var google;

const { Geolocation } = Capacitor.Plugins;

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit, AfterViewInit {

  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));
  public AddrList: AddressList[];
  public defMethod;
  
  public selAddress;
  public isVirtual = false 

  public isIncomming = true;
  public showSwitch = true;
  
  public map;
  public myLatLng = {lat:0,lng:0};

  constructor( private loadingCtrl: LoadingController,
    private router: Router,
    private payservice: PayMethodsService,
    private userservice: UserserviceService,
    private alertsservice: AlertsService,
    private modalCtrl: ModalController,
    private loadCtrl:LoadingController ) {

      this.getDefaultPayment();
      
  }

  ngOnInit() {

    //Validar isOrder null
    if(localStorage.getItem('orderSummary')){ 
      this.isIncomming = true
    } else { 
      this.isIncomming = false
    }

    if(this.consult.consultReason != 1){

      this.showSwitch = false;
      this.consult.consultType = 2
    }

        
      this.getAddressList();
  }
  
  async ngAfterViewInit() {

    this.initMap(this.myLatLng, 1, 'current');
  
  }

  getDefaultPayment(){
    
    let cash = { brand: 'cash', cardID: 'cash', default_source: 'cash', last4: '' }

    if(this.consult.paymentMethod === 2){

      this.defMethod = cash;

      // console.log( this.defMethod, ' metodo ' )

    }else{

      this.payservice.getPayMethods().subscribe( (resp:any) => {
        this.defMethod = resp.cards[0];
        console.log( this.defMethod )

        if(this.defMethod === undefined){
          this.defMethod = cash;
        }

      });

    }

  }

  getAddressList(){

    this.userservice.getAddressList().subscribe( (resp:any) => {
      this.AddrList = resp;
    });

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

  validatePayment(){

    if(!this.consult.paymentMethod){
      this.consult.paymentMethod = 1 
    };

  }

  reqOrderNow( meeting : boolean){

    this.consult.meeting = meeting

    if( this.isVirtual ) { this.consult.consultType = 1
    }else{ this.consult.consultType = 2} 

    this.consult.lat = this.myLatLng.lat
    this.consult.lon = this.myLatLng.lng

    this.validatePayment()

    localStorage.setItem('orderDetail',  JSON.stringify(this.consult));

    if(meeting){
      this.router.navigate(['app/consultas/schedule'])
    }else{
      this.router.navigate(['app/consultas/motivos'])
    };

  }

  async changeMethod(){

    const modal = await this.modalCtrl.create({
      component: ChangepaymentComponent,
      cssClass: 'changePay-modal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(() => {
      this.consult = JSON.parse(localStorage.getItem('orderDetail'))
      this.getDefaultPayment();
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

    const mapHtml = document.getElementById('mapa');

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
