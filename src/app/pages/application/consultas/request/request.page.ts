import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Capacitor, Plugins, GeolocationOptions } from '@capacitor/core'
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, of, from as fromPromise } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AddressList } from 'src/app/interfaces/interfaces';
import { Consult } from 'src/app/models/consult.model';
import { ChangepaymentComponent } from 'src/app/components/changepayment/changepayment.component';

const { Toast, Geolocation } = Capacitor.Plugins;

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  
  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));
  public AddrList: AddressList[];
  public defMethod;
  
  public selAddress;
  public isVirtual = false 
  
  // map varaibles
  public coordinates$: Observable<GeolocationOptions>;
  public coords: { lat: 0, lon: 0 }
  public coordslat
  public coordslon

  constructor( private loadingCtrl: LoadingController,
    private router: Router,
    private payservice: PayMethodsService,
    private userservice: UserserviceService,
    private modalCtrl: ModalController ) {

      this.getDefaultPayment();
      
    }

  ngOnInit() {

    this.getAddressList()

    this.displayLoader().then((loader: any) => {
      return this.getCurrentPosition()
        .then(  position => {

          this.coordslat = position.coords.latitude
          this.coordslon = position.coords.longitude
         
          loader.dismiss();
          return position;

        })  
        .catch( err => {
          console.log( err )
          loader.dismiss();
          return null
        }) 
    })
  } // NGonInit()

  getDefaultPayment(){
    this.payservice.getPayMethods().subscribe( (resp:any) => {
      this.defMethod = resp.cards[0];
    })
  }

  async getAddressList(){
    this.userservice.getAddressList().subscribe( (resp:any) => {
      this.AddrList = resp;
    });
  }

  selectedAddress(){
    
    let address = this.AddrList.find( x => {
      return x._id === this.selAddress;
    })

    console.log( 'ya tenemos las direcciones :', address )

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

    this.consult.lat = this.coordslat
    this.consult.lon = this.coordslon

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
  

  // Cooords Plugin Geolocation
  async displayLoader(){
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
    return this.loadingCtrl;
  }

  private async getCurrentPosition(): Promise<any> {
    const isAvaliable: boolean = Capacitor.isPluginAvailable('Geolocation');

    if(!isAvaliable){
      console.log( 'Err: plugin is no avaliable' );
      return of( new Error('Err, Plugin not avaliable') )
    }

    const POSITION = Plugins.Geolocation.getCurrentPosition()
    .catch(err =>{
      console.log('Err:', err);
      return new Error(err.message || 'mensaje personalizado');
    });

    this.coordinates$ = fromPromise(POSITION).pipe(
      switchMap((data: any) => of(data.coords)));

    return POSITION;
  }

}
