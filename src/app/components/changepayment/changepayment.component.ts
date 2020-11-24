import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-changepayment',
  templateUrl: './changepayment.component.html',
  styleUrls: ['./changepayment.component.scss'],
})
export class ChangepaymentComponent implements OnInit {

  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));
  public cards: any;

  constructor( private payservice: PayMethodsService,
    private modalCtrl: ModalController,
    private userservice: UserserviceService,
    private loadingCtrl: LoadingController ) { }

  ngOnInit() {

    this.getPayCards()

  }

  getPayCards(){

    // present del loadingCtrl
    this.loadingCtrl.getTop().then( hasLoading => {

      if (!hasLoading) {
        this.loadingCtrl.create({
          spinner: 'lines-small',
          translucent: true
        }).then( loading => loading.present())
      }

    })

    this.payservice.getPayMethods().toPromise().then( (data:any) => {
      this.cards = data.cards;

      // dissmiss del loadingCtrl
      this.loadingCtrl.getTop().then(hasLoading => {
        if (hasLoading) {
            this.loadingCtrl.dismiss();
        }
      });

    })
  } 

  changeMethod( card ){

    if(card === '0' ){
      this.userservice.defaultMethod = { brand: 'cash', cardID: 'cash', default_source: 'cash', last4: '' }
    } else {
      this.payservice.setPayMethod( card.cardID ).subscribe( resp => {
        this.userservice.defaultMethod = card;
      }) 
    }

    this.close();

  }
  

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
}

} 
