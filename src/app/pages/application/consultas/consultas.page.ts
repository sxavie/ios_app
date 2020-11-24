import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Consult } from 'src/app/models/consult.model';
import { OrderService } from 'src/app/services/order.service';
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
    private alertCtrl: AlertController,
    private orderservice: OrderService
    ) { }

  ngOnInit() { }

  toggleMenu(){
    this.menuCtrl.toggle('tdxMenu');
  }

  reqNewOrder(  reason ){
    let navigate = (reason === '6') ? '/app/consultas/agenda' : '/app/consultas/request'
    this.orderservice.newConsultData = new Consult(reason)
    this.router.navigate([navigate])
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
