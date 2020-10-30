import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { PayMethodsService } from 'src/app/services/paymethods.service';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.page.html',
  styleUrls: ['./metodopago.page.scss'],
})
export class MetodopagoPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  // public cards: any[] = [];
  public cards: any;

  constructor(private menuCtrl: MenuController,
    private router: Router,
    private payservice: PayMethodsService,
    private loaderCtrl: LoadingController) { }

  ngOnInit() {

    this.getPayCards();
    
  }

  getPayCards(){

    this.payservice.getPayMethods().toPromise().then( (data:any) => {
      console.log( 'ToPromise Data ', data )
      this.cards = data.cards;
      console.log( 'ToPromise Cards ', this.cards )
    })
    
    // .subscribe( (resp:any) => {
    //   this.cards = resp;
    //   console.log( 'MetodopagoPage: ngOnInit() => Susbcription Response ', this.cards )
    // })

  }

  async changeMethod( idCard ){

    let loader = await this.loaderCtrl.create({
      spinner: 'lines-small'
    })

    loader.present();
    
    this.payservice.setPayMethod( idCard ).subscribe( resp => {
      this.getPayCards()
      loader.dismiss();
    })

  }

  goHome(){
    this.router.navigate(['/app/home'])
  }



}
