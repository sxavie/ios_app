import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Capacitor, Plugins, GeolocationOptions } from '@capacitor/core'
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable, of, from as fromPromise } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AddressList } from 'src/app/interfaces/interfaces';
import { Consult } from 'src/app/models/consult.model';
import { ChangepaymentComponent } from 'src/app/components/changepayment/changepayment.component';
import { GoogleMap } from '@ionic-native/google-maps';

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
  
  // map varaibles

  // @ViewChild('mapa') mapElement: ElementRef; 
  public map;
  public myLatLng = {lat:0,lng:0};

  // public coordinates$: Observable<GeolocationOptions>;
  public coords: { lat: 0, lon: 0 }
  public coordslat
  public coordslon

  constructor( private loadingCtrl: LoadingController,
    private router: Router,
    private payservice: PayMethodsService,
    private userservice: UserserviceService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadCtrl:LoadingController ) {

      this.getDefaultPayment();
      
    }
  async ngAfterViewInit() {
    // this.initMap();


    this.initMap(this.myLatLng, 1, 'current')

    
  }
  ngOnInit() {

    this.getAddressList()

    // this.displayLoader().then((loader: any) => {
    //   return this.getCurrentPosition()
    //     .then(  position => {

    //       this.coordslat = position.coords.latitude
    //       this.coordslon = position.coords.longitude
         
    //       loader.dismiss();
    //       return position;

    //     })  
    //     .catch( err => {
    //       console.log( err )
    //       loader.dismiss();
    //       return null
    //     }) 
    // })


  } // NGonInit()
  getDefaultPayment(){
    this.payservice.getPayMethods().subscribe( (resp:any) => {
      this.defMethod = resp.cards[0];
    })
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
    }
  }
  validatePayment(){
    if(!this.consult.paymentMethod){
      this.consult.paymentMethod = 2 
    }
  }
  reqOrderNow( meeting : boolean){

    this.consult.meeting = meeting

    if( this.isVirtual ) { this.consult.consultType = 2
    }else{ this.consult.consultType = 1} 

    this.consult.lat = this.myLatLng.lat
    this.consult.lon = this.myLatLng.lng

    this.validatePayment()

    localStorage.setItem('orderDetail',  JSON.stringify(this.consult));

    if(meeting){
      this.router.navigate(['app/consultas/schedule'])
    }else{
      this.router.navigate(['app/consultas/motivos'])
    }
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
    }

    const mapHtml = document.getElementById('mapa');

    let mapOpts = {
      zoom:zoom, 
      center:pos,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    }

    this.map = new google.maps.Map( mapHtml, mapOpts);

    if( source === 2 ){ 

      // source 2: Usuario selecciona de direcciones guardadas
      const marker = new google.maps.Marker({ 
        position: pos,
        map:this.map,
        title: title,
        animation: google.maps.Animation.DROP,
      })

    }else {

      // soruce 1: geolocalizacion OnInit y seleccionar en el mapa
      const darggMarker = new google.maps.Marker({
        position: pos,
        map: this.map,
        draggable: true,
        title: title,
        animation: google.maps.Animation.DROP,
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
      if(err.code === 1){ this.showToast('Usuario denego ubicación')};
      if(err.code === 2){ this.showToast('Ubocación no disponible')};
    }
    
  }


  // Cooords Plugin Geolocation
  async displayLoader(){

    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
    return this.loadingCtrl;

  }

  // private async getCurrentPosition(): Promise<any> {
  //   const isAvaliable: boolean = Capacitor.isPluginAvailable('Geolocation');

  //   if(!isAvaliable){
  //     console.log( 'Err: plugin is no avaliable' );
  //     return of( new Error('Err, Plugin not avaliable') )
  //   }

  //   const POSITION = Plugins.Geolocation.getCurrentPosition()
  //   .catch(err =>{
  //     console.log('Err:', err);
  //     return new Error(err.message || 'mensaje personalizado');
  //   });

  //   this.coordinates$ = fromPromise(POSITION).pipe(
  //     switchMap((data: any) => of(data.coords)));

  //   return POSITION;
  // }

  async showToast(msg: string){

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present();

  }

}
