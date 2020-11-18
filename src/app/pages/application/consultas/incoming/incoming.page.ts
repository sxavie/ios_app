import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ConsultSumm } from 'src/app/models/consultsumm.model';


import { Capacitor, Plugins } from '@capacitor/core'
import { UserserviceService } from 'src/app/services/userservice.service';
const { Geolocation } = Capacitor.Plugins;


@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.page.html',
  styleUrls: ['./incoming.page.scss'],
})
export class IncomingPage implements OnInit, AfterViewInit {

  
  orderResp: ConsultSumm;

  // uber/map params.
  public map;
  directionsDisplay = new google.maps.DirectionsRenderer

  // dubicacion del uber
  public origin = { lat: 0, lng: 0 };
  // a donde se solicita
  public destination = {lat:0, lng:0};

  constructor( private router: Router,
    private loadCtrl: LoadingController,
    private menuCtrl: MenuController,
    private userservice: UserserviceService ) { }

    

  ngOnInit() {
    
    this.orderResp = JSON.parse(localStorage.getItem('orderSocketResp'))
    this.destination = { lat: Number(this.orderResp.address.latitude), lng: Number(this.orderResp.address.longitude) };
  }

  ngAfterViewInit(){
    this.initMap();
    
  }

  async initMap(){

    const loading = await this.loadCtrl.create({spinner: 'lines'})
    loading.present();

    let pos = await this.getCurrentPosition();

    const mapHtml = document.getElementById('map');
    let mapOpts = {
      zoom:14, 
      center:pos,
      mapTypeIds: 'roadmap',
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    };

    this.map = new google.maps.Map( mapHtml, mapOpts )
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.calculateRoute(pos);

      loading.dismiss();
    })


    

  }

  private calculateRoute(pos){

    new google.maps.DirectionsService().route({
      origin: pos,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, ( resp , status ) => {
      
      if(status === google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(resp)
      }else{
        console.log( ' err ', status)
      }
    })

  }

  private async getCurrentPosition(){

    try {
      const position = await Plugins.Geolocation.getCurrentPosition();
      return this.origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    } catch (err) {
      console.log( 'getCurrentPosition() => ', err )
      // if(err.code === 1){ this.showToast('Usuario denego ubicación')};
      // if(err.code === 2){ this.showToast('Ubocación no disponible')};
    }
    
  }




  toggleMenu(){
    this.menuCtrl.toggle('tdxMenu');
  }
  calling(){
    console.log( 'Calling Button' )
  }
  chating(){
    console.log( 'Chat Button' )
  }

  nextt(){
    this.router.navigate(['app/consultas/summary'])
  }

}
