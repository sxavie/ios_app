import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.page.html',
  styleUrls: ['./verifyaccount.page.scss'],
})
export class VerifyaccountPage implements OnInit {

  public pinIsValid = false;
  public pin = '';
  
  constructor( private authservice: AuthService,
    private toastCtrl: ToastController,
    private router: Router ) { }

  ngOnInit() {
  }

  verifyAccount(){

    let email = localStorage.getItem('email-verify')
    console.log( 'VerifyaccountPage: verifyAccount() => Susbcribe al servicio de verifycar cuenta' )
    
    this.authservice.verifyAcccount(email, this.pin).subscribe( (resp:any) => {
      if (resp.message === 'Usuario no encontrado.'){
        this.showToast( resp.message );
      }else {
        this.showToast( resp.message );
        this.router.navigate(['/login'])
      }
    })
  
  }

  pinValidation( ) {

    if( this.pin.length < 4 ) {
      this.pinIsValid = false
    }else {
      this.pinIsValid = true
    }

  }

  codeResend(){
    console.log( 'VerifyaccountPage: codeResend() => click reenvio de codigo' )
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000
    });
    toast.present();
  }

}
