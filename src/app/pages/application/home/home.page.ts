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

const { Toast, Geolocation } = Capacitor.Plugins;

// declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 
export class HomePage implements OnInit {

  public coordinates$: Observable<GeolocationPosition>;
  public defaulPosition: { latitude: 25.681473, longitude: 100.355192 };

  userData: any;
  public imgAvatar;

  constructor(  private menuCtrl: MenuController,
    public router: Router,
    public menuData: MenuDataService,
    public userservice: UserserviceService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) { }
      
  ngOnInit(){

    this.displayLoader().then((loader: any) => {
        // get the position
        return this.getCurrentPosition().then(position => {
            //close the loader = return the position
            loader.dismiss();
            // console.log( position.coords.latitude )
            return position;
        })
          // if error
          .catch( err => {
            // close lader + return Null
            loader.dismiss();
            return null
          });
      });

      if( localStorage.getItem('UserData') ) {
        this.userData =  JSON.parse( localStorage.getItem('UserData') )
        console.log( 'Home: Constructor() => UserData obtenido del localStorage JSON.parse()' )
      }else{ 
        this.userservice.getUserData().subscribe( async(resp:any) => {
          localStorage.setItem('UserData', JSON.stringify(resp) )
          this.userData = resp;
          console.log( 'Home: Constructor() => UserData obtenido del userservice.getUserData().subscribe()' )
        })   
      }
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
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
    return this.loadingCtrl;
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
  
  private async getCurrentPosition(): Promise<any> {
    const isAvaliable: boolean = Capacitor.isPluginAvailable('Geolocation');

    if(!isAvaliable){
      console.log( 'Err: plugin is no avaliable' );
      return of( new Error('Err, Plugin not avaliable') )
    }

    const POSITION = Plugins.Geolocation.getCurrentPosition()
    //hanlde capacitor
    .catch(err =>{
      console.log('Err:', err);
      return new Error(err.message || 'customized meeesage');
    });

    this.coordinates$ = fromPromise(POSITION).pipe(
      switchMap((data: any) => of(data.coords)),
      tap(data => console.log(data))
    );

    return POSITION;
    
  }

  ngOnDestroy(){
    // this.coordinates$.
  }
  
}
