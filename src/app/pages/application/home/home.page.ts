import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import {} from 'googlemaps';

import { Capacitor, Plugins, GeolocationPosition } from '@capacitor/core';
import { Observable, of, from as fromPromise } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { Usuario } from 'src/app/models/usuario.model';

const { Geolocation } = Capacitor.Plugins;

// declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 
export class HomePage implements OnInit {

  public coordinates$: Observable<GeolocationPosition>;
  public defaulPosition: { latitude: 25.681473, longitude: 100.355192 };

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
    public alertsservice: AlertsService
    ) { 

    }
      
  ngOnInit(){

    console.log( 'user en home ',this.userservice.usuario )
    
      this.userservice.getUserData().subscribe( async(resp:any) => {

        this.userData = resp;
        this.userservice.transformFilename( resp.filename );

        if( resp.isOrder != null ){
          this.router.navigate(['/app/consultas/incoming'])
        }

        console.log( 'Home: Constructor() => UserData obtenido del userservice.getUserData().subscribe()' )
      })   
      
  }


  toggleMenu(){
    // this.menuCtrl.toggle(this.nameMenuId);
    this.menuCtrl.toggle('tdxMenu');
  }
  
  irA(pagex: string) {
    
    // console.log(pagex);
    
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['app/consultas']);
        break;
      }
      case 'Resacas': {
        let consult:Consult = new Consult(5)
        localStorage.setItem('orderDetail', JSON.stringify(consult))
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



  async displayLoader(){

    this.loading = await this.loadingCtrl.create({
      spinner: 'lines-small',
      translucent: true
    });

    await this.loading.present();
    // return this.loadingCtrl;
  }

  private async presentAlert( message: string): Promise<HTMLIonAlertElement>{

    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'We are ofline',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
    return alert;
  }
  
  // private async getCurrentPosition(): Promise<any> {
  //   const isAvaliable: boolean = Capacitor.isPluginAvailable('Geolocation');

  //   if(!isAvaliable){
  //     console.log( 'Err: plugin is no avaliable' );
  //     return of( new Error('Err, Plugin not avaliable') )
  //   }

  //   const POSITION = Plugins.Geolocation.getCurrentPosition()
  //   //hanlde capacitor
  //   .catch(err =>{
  //     console.log('Err:', err);
  //     return new Error(err.message || 'customized meeesage');
  //   });

  //   this.coordinates$ = fromPromise(POSITION).pipe(
  //     switchMap((data: any) => of(data.coords)),
  //     tap(data => console.log(data))
  //   );

  //   return POSITION; 
    
  // }

  ngOnDestroy(){
    localStorage.removeItem('User-Data')
  }

  async initMap(){

    let pos = await this.getPosition() 

    const mapHtml = document.getElementById('mapa');

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

    this.loading.dismiss();
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
  
}
