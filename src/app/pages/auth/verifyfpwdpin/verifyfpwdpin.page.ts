import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyfpwdpin',
  templateUrl: './verifyfpwdpin.page.html',
  styleUrls: ['./verifyfpwdpin.page.scss'],
})
export class VerifyfpwdpinPage implements OnInit {

  public fEmailAccount = localStorage.getItem('fpwdEmail');
  public pinIsValid = false;
  public pin = '';

  constructor( private router: Router) { }

  ngOnInit() {
  }

  verifyAccount(){

    // let email = localStorage.getItem('email-verify')
    console.log( 'VerifyaccountPage: verifyAccount() => Susbcribe al servicio de verifycar cuenta' )
    this.router.navigate(['/changepwdreq'])
  
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

  // async showToast(msg) {
  //   const toast = await this.toastCtrl.create({
  //       message: msg,
  //       duration: 2000
  //   });
  //   toast.present();
  // }

}
