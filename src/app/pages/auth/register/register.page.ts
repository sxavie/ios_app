import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public formSubmitted = false;

  public formData = this.fb.group({
    name: [ '', Validators.required ],
    email: [ '', Validators.required ], // , Validators.pattern('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$') 
    password: [ '', Validators.required],
    mobile: [ '', [Validators.required, Validators.minLength(10)]],
    userType: '3',
    terminos: false
  });

  constructor( private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private userservice: UserserviceService 
    ) { }

  ngOnInit() {
    if( localStorage.getItem('user-name') ){
      this.router.navigate(['/app/home'])
    }
  }

  onRegister() {

    if ( this.frmValidation() ) {
      // registrar usuario en la API
      console.log('RegisterPage: onRegister() => Formulario OK')

      // console.log('======TEST====== : No subscriptions')
      this.userservice.register( this.formData.value ).subscribe( () => {
        console.log('RegisterPage: onRegister() => Subscription a UserserviceService.register()')
      })

      localStorage.setItem('email-verify', this.formData.value.email );
      this.router.navigate(['/verifyaccount'])

    }else {
      console.log('RegisterPage: onRegister() => Formulario no validado') 
    }
    
  }


    // Validaciones de Formulario
    frmValidation():boolean{

      if( !this.formData.valid ) {
        this.showToast('Debe completar los campos')
        return false;
      }

      if ( !this.isEmail( this.formData.value.email )) {
        this.showToast('El email no es valido')
        return false
      }

      if ( !this.validPhone( this.formData.value.mobile )) {
        this.showToast('El numero no es valido')
        return false
      }

      if ( !this.formData.value.terminos ){
        this.showToast('Debe aceptar los términos')
        return false
      }

      return true;
    }

    validPhone(phNumber):boolean {
      let number = phNumber.toString()
      if(number.length < 10) { return false } 
      return true
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
