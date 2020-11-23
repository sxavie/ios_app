import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { LoginForm, RegisterForm } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
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
      .pipe(tap( (resp: any) =>{
        console.log( 'UserService: verifyAcccount() => HTTP Post Cuenta Vrificada ', resp  )
      }))
      .pipe(catchError(err => {
        return throwError(err);
      }))
  
  }

  verifyResendCode( email ){

    // https://api.cavimex.vasster.com/users/resendcode?verify=true

    let url = `${apiUrl}/users/resendcode?verify=true`;
    

    return this.http.post( url, {email})
      .pipe(map( (res) => console.log( res )));


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

  passwordResetRequest( email ){

    let url = `${apiUrl}/users/password-reset-request`

    return this.http.post(url, { email })
      .pipe(map(resp => {
        this.router.navigate(['/verifyfpwdpin']) 
      }))
      .pipe(catchError( err => {
        return throwError( err );
      }))

  }

  passwordResetVerify( email, pin ){
    let url = `${apiUrl}/users/password-reset-verify`

    return this.http.post(url, {email, pin})
      .pipe(tap( resp => {
        localStorage.setItem('pin', pin)
        this.router.navigate(['/changepwdreq'])
      }))
      .pipe(catchError( err => {
        return throwError(err);
      }))
  }

  ResetRequestResendCode( email ){
    let url = `${apiUrl}/users/resendcode?password=true`

    return this.http.post( url, {email})
      .pipe(map( resp => {
      }))
      .pipe(catchError ( err => {
        return throwError( err )
      }))
  }

  changePasswordRequest( email, pin, password){
    let url = `${apiUrl}/users/password-reset`

    return this.http.post( url, { email, pin, password })
      .pipe(map( resp => {
        localStorage.removeItem('fpwdEmail')
        localStorage.removeItem('pin')
        this.router.navigate(['/login']);
      }))
      .pipe(catchError( err => {
        return throwError( err );
      }))
  }


  logout() {
    localStorage.clear()

    this.userservice.usuario = null;
    this.router.navigate(['/'])
    console.log( 'UserserviceService: logout() => LocalStorage clean' )
  }


}
