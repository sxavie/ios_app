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
  public loading;

  constructor(private menuCtrl: MenuController,
    private router: Router,
    private payservice: PayMethodsService,
    private loaderCtrl: LoadingController) { }

  ngOnInit() {



    this.getPayCards();
    
  }

  async getPayCards(){

    this.loading = await this.loaderCtrl.create({
      spinner: 'lines-small'
    })

    await this.loading.present();

    this.payservice.getPayMethods().toPromise().then( (data:any) => {
      this.cards = data.cards;
      this.loading.dismiss();
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
