import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemCart } from 'src/app/interfaces/interfaces';
import { Product } from 'src/app/models/product.model';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {

  public myCarrito:ItemCart[] = [];
  public isEmptyCart: boolean = true;

  public shiping = 65;
  public itemsTotal = 0;
  public itemsQty = 0;
  public ordTotal = 0;

  constructor( private alertCtrl: AlertController,
    private router: Router,
    private loadCtrl: LoadingController,
    private actionSheeCtrl: ActionSheetController,
    private aletsservice: AlertsService) {}

  async ionViewWillEnter() {

    let loader = await this.loadCtrl.create({
      spinner: 'lines-small'
    })

    await loader.present();

    console.log( 'ngOnInit()')
    if(localStorage.getItem('myCarrito')) {
      // console.log( 'se obtuvo de local' )
      this.myCarrito = JSON.parse(localStorage.getItem('myCarrito'))
      this.isEmptyCart = false
    }
    // }else{
    //   console.log( 'sin carrito')
    // }

    this.totalCalculator()

    loader.dismiss();

  }

  ngOnInit() {} 

  totalCalculator(){

    if( !this.isEmptyCart ){
        
      let itemsPrice$:Observable<any> = from(this.myCarrito);
        itemsPrice$.pipe(map((item:any) => {
          let itemTotal;
          itemTotal = ( item.price * item.quantity )

          // console.log(item.price, ' total por ', item.quantity, ' items  => ' , itemTotal)

          this.itemsTotal = this.itemsTotal + itemTotal;
          this.itemsQty = this.itemsQty + item.quantity
        })).subscribe( resp => {
          this.ordTotal = this.itemsTotal + this.shiping
          // console.log( 'total en orden ' ,this.ordTotal )
        })
    }

  }

  findItemIdx(iFind){
    let index = this.myCarrito.findIndex(function(itm) {
      if(iFind._id === itm._id)
        return true
    });
    return index
  }


  removeToCart( item:ItemCart ){

    this.itemsTotal = 0;
    this.itemsQty = 0;
    this.ordTotal = 0;

    let newItem:ItemCart = {
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      fileName: item.fileName,
      quantity: 1
    }

    let idx = this.findItemIdx(newItem);

    if( idx > -1 ){

      this.myCarrito.splice(idx, 1)

      this.aletsservice.nativeToast( `Se a eliminado ${ item.name } del carrito` )

      if(this.myCarrito.length === 0){
        this.emptyCart();
        // this.router.navigate(['/app/farmacia'])
      }else{
        console.log('caluclar nuevo rpecio')
        this.totalCalculator();
        localStorage.setItem('myCarrito',  JSON.stringify(this.myCarrito) )
      }

    }

  }
 
  async itemContextual( item: ItemCart ) {

    const actionSheet = await this.actionSheeCtrl.create({
      header: item.name,
      buttons: [{
        text: `Eliminar ${item.quantity } ${item.name}(s) del carrito`,
        icon: 'trash-outline',
        role: 'destructive',
        cssClass: 'primary',
        handler: () => {
          this.removeToCart(item)
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();

  }

  async emptyAlert(){

    const alert = await this.alertCtrl.create({
      header: '¡Confirmar!',
      message: '¿Esta seguro que desea limpiar el carrito de compras?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Vaciar',
          handler: () => {
            this.emptyCart();
            this.router.navigate(['/app/farmacia']);
          }
        }
      ]
    });

    await alert.present();

  }

  emptyCart(){
    localStorage.removeItem('myCarrito');
    this.myCarrito = [];
    this.shiping = 0;
    this.itemsTotal = 0;
    this.itemsQty = 0;
    this.ordTotal = 0;
    this.isEmptyCart = true;
    this.aletsservice.nativeToast( `Su carrito de compras esta vacio` )
  }





}
