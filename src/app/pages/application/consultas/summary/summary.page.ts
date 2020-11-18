import { Component, OnInit } from '@angular/core';
import { ConsultSumm } from 'src/app/models/consultsumm.model';
import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  ordSummary: ConsultSumm;
  orderResp:any;

  public dateTime = '';
  public defMethod:any;

  constructor( private userservice: UserserviceService,
    private payservice: PayMethodsService) { }

  async ngOnInit() {

    this.ordSummary = JSON.parse(localStorage.getItem('orderSummary'))
    this.orderResp = JSON.parse(localStorage.getItem('orderSocketResp'))

    this.dateTime = this.transformDateTime(this.ordSummary.date)

    this.getPayment(this.ordSummary.paymentMethod);

  }


  getPayment(x){

    if(x === 'Tarjeta Debito o Credito'){
      console.log('service promissse')
      this.payservice.getPayMethods().subscribe( (x:any) => {
        console.log( x.cards[0] )
        this.defMethod =  x.cards[0];
      });
    } else {
      let cash = { brand: 'cash', cardID: 'cash', default_source: 'cash', last4: '' }
      console.log(cash)
      this.defMethod =  cash;
    }
}

  transformDateTime( z ):string{

    let x = z.split('T');

    let xDate = x[0];
    let xTime = x[1];

    const middleDash = '-';
    const slash = '/';
    let SlashedDate = xDate.split(middleDash).join(slash);

    const dot = '.';
    let splitedTime = xTime.split(dot);

    return `${SlashedDate} ${splitedTime[0]}`;
  }

}
 