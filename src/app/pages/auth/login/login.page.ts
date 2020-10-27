import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public formData = this.fb.group({
    email: [ '' , Validators.required ],
    password: [ '', Validators.required ],
    source: '3',
    firebaseToken: ''
  })

  constructor( private fb: FormBuilder,
    private authservice: AuthService,
    private alertsservice: AlertsService
    ) { }

  ngOnInit() {

    // if( localStorage.getItem('user-name') ){
    //   this.router.navigate(['app/home'])
    // }

  }

  onLogin() {
    
    if ( this.frmValidation() ) {

      this.authservice.login( this.formData.value  )
        .subscribe( () => {}, (err) => {
        throw err
      });

    }

  }

  // Validaciones de Formulario
  frmValidation():boolean{

    if( !this.formData.valid ) {
      this.alertsservice.nativeToast('Debe completar los campos')
      return false;
    }
    if ( !this.isEmail( this.formData.value.email ) ) {
      this.alertsservice.nativeToast('El email no es valido')
      return false
    }
    return true;

  }
  isEmail(email: string):boolean{
    let emailRgx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
    return emailRgx.test(email)
  }


}
