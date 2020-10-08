import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm = this.fb.group({
    email: [ 'xavier.hernandez@vasster.com' , Validators.required ],
    password: [ '123', Validators.required ]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router 
    ) { }

  ngOnInit() {
  }

  onLogin(){
    console.log(  this.loginForm.value )
    this.router.navigate(['/home'])
  }

}
