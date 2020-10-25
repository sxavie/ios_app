import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Consult } from 'src/app/models/consult.model';
import { PayMethodsService } from 'src/app/services/paymethods.service';


@Component({
  selector: 'app-changepayment',
  templateUrl: './changepayment.component.html',
  styleUrls: ['./changepayment.component.scss'],
})
export class ChangepaymentComponent implements OnInit {

  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));

  public cards: any;

  constructor( private payservice: PayMethodsService,
    private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.getPayCards()

    
  }

  getPayCards(){

    this.payservice.getPayMethods().toPromise().then( (data:any) => {
      console.log( 'ToPromise Data ', data )
      this.cards = data.cards;
      console.log( 'ToPromise Cards ', this.cards )
    })
  }

  changeMethod( idCard ){

    if(idCard === '0' ){
      this.consult.paymentMethod = 1;
      console.log('pago en efectivo')


    }else{   
      this.consult.paymentMethod = 2;
      console.log( 'pago con tarjeta' )
      this.payservice.setPayMethod( idCard ).subscribe( resp => {
        console.log( 'rresponse after choose payment method , ChangePaymento.component ', resp )
        this.close();
      })
    }

    localStorage.setItem('orderDetail', JSON.stringify(this.consult));

  }

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
}

} 
