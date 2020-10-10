import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public errorResponse = false;
  public errorMesg = ''

  public formData = this.fb.group({
    email: [ 'hugo.costilla@vasster.com' , Validators.required ],
    password: [ '123', Validators.required ],
    source: '3',
    firebaseToken: ''
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userservice: UserserviceService
    ) { }

  ngOnInit() {
    if( localStorage.getItem('user-name') ){
      this.router.navigate(['/home'])
    }
  }

  onLogin() {
    this.userservice.login( this.formData.value  )
      .subscribe( resp => {
        this.errorResponse = false;
        this.router.navigate(['/home'])
      }, (err) => {
        this.errorResponse = true;
        this.errorMesg = err.error.message
      })
  }

}
