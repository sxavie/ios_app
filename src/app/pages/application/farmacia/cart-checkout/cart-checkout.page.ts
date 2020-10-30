import { Component, OnInit } from '@angular/core';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { ItemCart } from 'src/app/interfaces/interfaces';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit, ViewWillEnter {

  
  public myCarrito:ItemCart[] = JSON.parse(localStorage.getItem('myCarrito'));

  public shiping = 65;
  public itemsTotal = 0;
  public itemsQty = 0;
  public ordTotal = 0;
  
  constructor( private loadCtrl: LoadingController) { }

  ngOnInit() {
  
    console.log( this.myCarrito )
  }


  async ionViewWillEnter() {
    let loader = await this.loadCtrl.create({
      spinner: 'lines-small'
    })
    await loader.present();
    this.myCarrito = JSON.parse(localStorage.getItem('myCarrito'))
    this.totalCalculator()
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

}
