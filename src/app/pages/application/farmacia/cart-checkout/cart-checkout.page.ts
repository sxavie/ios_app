import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ViewWillEnter } from '@ionic/angular';
import { ItemCart } from 'src/app/interfaces/interfaces';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AddressService } from 'src/app/services/address.service';
import { PayMethodsService } from 'src/app/services/paymethods.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { ChangepaymentComponent } from 'src/app/components/changepayment/changepayment.component';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit, ViewWillEnter {

  
  public myCarrito:ItemCart[] = JSON.parse(localStorage.getItem('myCarrito'));
  public myAddresses:any[] = [];
  public defMethod;

  public shiping = 65;
  public itemsTotal = 0;
  public itemsQty = 0;
  public ordTotal = 0;

  public defaultPayid;
  public defaulAddresid;
  public defaulAddres;

  
  constructor( private loadCtrl: LoadingController,
    private addressservice: AddressService,
    private payservice: PayMethodsService,
    private medicineservice: MedicineService,
    private modalCtrl: ModalController,
    private alertsservie: AlertsService) { 

    this.getDefaultPayment() 
  
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {


    this.defaulAddresid = localStorage.getItem('def-address')

    let loader = await this.loadCtrl.create({
      spinner: 'lines-small'
    })
    await loader.present();
    this.myCarrito = JSON.parse(localStorage.getItem('myCarrito'))
    this.totalCalculator()

    await this.addressservice.getAddress().subscribe((addresses: any) => {

      addresses.forEach(element => {
        if (element._id === this.defaulAddresid) {
          this.defaulAddres = element;
        }

        if( this.defaulAddres === undefined ){
          this.defaulAddres = addresses[0];
        }

      });
      
    });
    
    loader.dismiss();
  }

  totalCalculator(){
    
    let itemsPrice$:Observable<any> = from(this.myCarrito);
      itemsPrice$.pipe(map((item:any) => {
        let itemTotal;
        itemTotal = ( item.price * item.quantity )

        this.itemsTotal = this.itemsTotal + itemTotal;
        this.itemsQty = this.itemsQty + item.quantity
      })).subscribe( () => {
        this.ordTotal = this.itemsTotal + this.shiping
      })

  

  }

  getDefaultPayment(){

    let cash = { brand: 'cash', cardID: 'cash', default_source: 'cash', last4: '' }

    if( localStorage.getItem('pharmDefPay') ){
      let defaultPey = localStorage.getItem('pharmDefPay')

      if( defaultPey === '0'){
          this.defMethod = cash;
          this.defaultPayid = '2'
      }else{

        this.payservice.getPayMethods().subscribe( (resp:any) => {
          this.defMethod = resp.cards[0];
  
          this.defaultPayid = '1'
  
          if(this.defMethod === undefined){
            this.defMethod = cash;
            this.defaultPayid = '2' 
          }

        });

      }
    }else{

      this.payservice.getPayMethods().subscribe( (resp:any) => {
        this.defMethod = resp.cards[0];

        this.defaultPayid = '1'

        if(this.defMethod === undefined){
          this.defMethod = cash;
          this.defaultPayid = '2' 
        }

      });
      
    }

}


  async changeMethod(){

    const modal = await this.modalCtrl.create({
      component: ChangepaymentComponent,
      cssClass: 'changePay-modal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(() => {
      this.getDefaultPayment();
    });
    return await modal.present();

  }


  buttonCheckout(){

    interface OrderItems{
      medicine: string,
      quantity: string,
    }

    interface PharmOrder{
      user: string,
      items: OrderItems[],
      addressId: string,
      paymentMethod: string,
    }

    if(this.defaulAddres === null){
      this.alertsservie.nativeToast('No se selecciono una direccion de domicilio')
      return; 
    }

    if(!this.defaultPayid){
      this.alertsservie.nativeToast('No se selecciono un metodo de pago')
      return
    }

    var carrito = JSON.parse(localStorage.getItem('myCarrito'));
    let orditems: OrderItems[] = [];
    
    carrito.forEach((element:ItemCart) => {

      let pushing:OrderItems = { medicine: '', quantity: ''}
      pushing.medicine = element._id;
      pushing.quantity = element.quantity.toString();
      orditems.push(pushing)

    });


    var newOrden:PharmOrder = ({
      user: localStorage.getItem('user-id'),
      items: orditems,
      addressId: this.defaulAddresid,
      paymentMethod: this.defaultPayid
    })

  


    this.medicineservice.newOrder(newOrden).subscribe( () => {
      
      this.shiping = 65;
      this.itemsTotal = 0;
      this.itemsQty = 0;
      this.ordTotal = 0;
    })

  }



}
