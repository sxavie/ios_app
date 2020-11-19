import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Consult } from 'src/app/models/consult.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'], 
})
export class ConsultasPage implements OnInit {
  
  constructor( public userservice: UserserviceService,
    private router: Router,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {

    localStorage.removeItem('pharmDefPay')

  }

  toggleMenu(){
    this.menuCtrl.toggle('tdxMenu');
  }


  reqNewOrder(  reason ){

    console.log(reason)
    if( reason === '6'){
      this.router.navigate(['/app/consultas/agenda'])
    }else{
      let consult:Consult = new Consult(parseInt(reason))
      localStorage.setItem('orderDetail', JSON.stringify(consult))
      this.router.navigate(['/app/consultas/request'])
    }
  }

  async alertOrderInPorgress() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Orden en progreso!',
      message: 'Actualmente tiene una orden en progreso.',
      buttons: [
        {
          text: 'Regresar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['/app'])
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/app/consultas/incoming'])
          }
        }
      ]
    });

    await alert.present();
  }  

}
