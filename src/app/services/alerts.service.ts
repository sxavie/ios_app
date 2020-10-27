import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core'

const { Toast } = Capacitor.Plugins

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor( private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  async showAelrt(message: string, header: string){
    const alert = await this.alertCtrl.create({
      message,
      header,
      buttons: [{
          text: 'Aceptar',
          cssClass: 'primary'
        }]
    })
    await alert.present();
  }

  async showToast(message: string, duration:number){
    const toast = await this.toastCtrl.create({
      message,
      duration
    })
    await toast.present();
  }

  async showLoader(){
    const loader = await  this.loadingCtrl.getTop().then( loading => {
      console.log( loading )
    });
    // return loader
  }

  async nativeToast( text ){

    Toast.show({
      text
    })

  }

}
