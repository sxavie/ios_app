import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {

  public email = '';

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  sendEmail(){

    if( this.email != '' ) {

      localStorage.setItem('fpwdEmail', this.email)

      this.router.navigate(['/verifyfpwdpin'])

    }
    
  }

}
