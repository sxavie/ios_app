import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public formSubmitted = false;
  public termsValidator = false;

  public registerForm = this.fb.group({
    nombre: [ '', Validators.required ],
    email: [ '', Validators.required ], // , Validators.pattern('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$') 
    password: [ '', Validators.required],
    telefono: [ '', [Validators.required, Validators.minLength(10)]],
    terminos: [ false, Validators.required ]
  });

  constructor( 
    private fb: FormBuilder,
    private router: Router 
    ) { }

  ngOnInit() {
    if( localStorage.getItem('user-name') ){
      this.router.navigate(['/home'])
    }
  }

  onRegister() {

    this.formSubmitted = true;
    this.termsValidator = this.registerForm.value.terminos

    if( !this.termsValidator ) { return false } 
    else {
      console.log("Usuario Registrado")
      this.router.navigate(['/login'])
    }


  }

}
