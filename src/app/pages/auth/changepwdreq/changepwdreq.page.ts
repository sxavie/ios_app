import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwdreq',
  templateUrl: './changepwdreq.page.html',
  styleUrls: ['./changepwdreq.page.scss'],
})
export class ChangepwdreqPage implements OnInit {

  public passwordValidation;
  public password;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  changePassword(){


    if ( this.passwordValidation === this.password) {

      console.log( 'La contraseña coincide' ) 
      this.router.navigate(['/login'])
      localStorage.removeItem('fpwdEmail')

    }else{
      console.log( 'la contraseña no coincide' )
    }
  }

}
