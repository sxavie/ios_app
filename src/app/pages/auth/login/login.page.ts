import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserserviceService } from 'src/app/services/userservice.service';


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
    private router: Router,
    private userservice: UserserviceService,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    if( localStorage.getItem('user-name') ){
      this.router.navigate(['app/home'])
    }
  }

  onLogin() {
    
    if ( this.frmValidation() ) {

      this.userservice.login( this.formData.value  )
        .subscribe( () => {
          // enrutamos en el user.service
          // this.router.navigate(['app'])
      }, (err) => {
        throw err
      });

    }

  }

  // Validaciones de Formulario
  frmValidation():boolean{

    if( !this.formData.valid ) {
      this.showToast('Debe completar los campos')
      return false;
    }
    if ( !this.isEmail( this.formData.value.email ) ) {
      this.showToast('El email no es valido')
      return false
    }
    return true;

  }
  isEmail(email: string):boolean{
    let emailRgx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
    return emailRgx.test(email)
  }
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000
    });
    toast.present();
  }

}
