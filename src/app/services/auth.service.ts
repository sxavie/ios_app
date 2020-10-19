import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { LoginForm, RegisterForm } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserserviceService } from './userservice.service';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, 
    private router: Router,
    private userservice: UserserviceService ) { }

  register( formData: RegisterForm) {

    console.log( formData );

    let url = `${ apiUrl }/user/register`
    
    console.log( 'UserService: register() => HTTP Post registro de usuario'  )    
    return this.http.post(url, formData)
      .pipe(map( (resp: any) =>{
        console.log( 'UserService: register() => HTTP Post Usuario registrado ', resp  )
        localStorage.setItem('email-verify', formData.email );
        console.log( 'UserService: register() => almacenando el LocalStorage email para verificar ', resp  )
        this.router.navigate(['/verifyaccount'])
        console.log( 'UserserviceService: register() => RouterLink /verifyaccount' )
      }))
      .pipe(catchError( err => {
        return throwError( err )
      }));
  
  }
  verifyAcccount( email: string, pin: string) {
  
    console.log( 'UserService: verifyAcccount() => HTTP Post para verificar cuenta'  ) 
    const body = {  }   
    return this.http.post(`${ apiUrl }/users/verifyAccount`, { email,pin } )
      .pipe(map( (resp: any) =>{
        console.log( 'UserService: verifyAcccount() => HTTP Post Cuenta Vrificada ', resp  )
      }))
      .pipe(catchError(err => {
        return throwError(err);
      }))
  
  }

  login( formData: LoginForm ) {

    return this.http.post(`${ apiUrl }/user/login`, formData)
      .pipe(map( (resp: any)=>{

        localStorage.setItem('jwttoken', resp.token)
        console.log( 'UserService: login() => Token almacenado en el LocalStorage jwttoken'  )
        this.userservice.decodeToken( resp.token );

      }))
      .pipe(catchError( err => {
        return throwError( err )
      }));
  }


}
