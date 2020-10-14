import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { LoginForm, RegisterForm } from '../interfaces/interfaces';
import { Usuario } from '../models/usuario.model';

// variables
const helper = new JwtHelperService;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  public token = localStorage.getItem('jwttoken');
  public userid = localStorage.getItem('user-id')

  // No guardamos nada en el modelo usuario
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

      
    login( formData: LoginForm ) {

      return this.http.post(`${ apiUrl }/user/login`, formData)
        .pipe(tap( (resp: any)=>{

          localStorage.setItem('jwttoken', resp.token)
          console.log( 'UserService: login() => Token almacenado en el LocalStorage jwttoken'  )
          this.decodeToken( resp.token );
        })
      );
    }
    decodeToken( token ) {

      const u = helper.decodeToken( token )
      console.log( 'UserserviceService: decodeToken() => token en decodificado, u.id: ', u.id )
      let imgPath;
      if( u.filename === null ){
        imgPath = 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png';
      }else{
        let splitImgFormat = u.filename.split('.');
        imgPath = `${ apiUrl }/images/users/${ splitImgFormat[0] }`
      }

      localStorage.setItem('user-name', u.name)
      localStorage.setItem('user-email', u.email)
      localStorage.setItem('user-filename', imgPath)
      localStorage.setItem('user-id', u.id)

      console.log( 'UserserviceService: decodeToken() => data de Usuario guardado en el LocalStorage' )
      this.router.navigate(['/app'])
      console.log( 'UserserviceService: decodeToken() => RouterLink /app' )
    }
    getUserData(){

      console.log('UserserviceService: getUserData() => Call getUserData();')

      let token = localStorage.getItem('jwttoken');
      let uid = localStorage.getItem('user-id')

      let headers = new HttpHeaders({
        'authorization': token
      })

      console.log( 'UserserviceService: getUserData() => Token y userid Obtenidos de localStorage para el HHTP request' )
      console.log( 'token:', token)
      console.log( 'userid:', uid)

      return this.http.get(  `${ apiUrl }/users/${ uid }`,{ headers } )
        .pipe(tap( (resp:any) => {
          console.log( 'UserserviceService: getUserData() => http.get https://api.cavimex.vasster.com/users/:userid ' )
          this.usuario = new Usuario( resp._id, resp.name, resp.email, resp.password, resp.dateCreated, resp.userType, resp.birthday, resp.gender, resp.filename, resp.mobile, resp.bloodType, resp.height, resp.weight, resp.paymentID, resp.terms, resp.verified, resp.verificationCode, resp.active, resp.firebaseToken, resp.isOrder, resp.skills, resp.allergies, resp.diseases, resp.family);
          console.log( 'UserserviceService: getUserData() => Data capturada en el modelo de Usuario ' )     
          console.log( 'UserserviceService: getUserData() => usuario: ', this.usuario )

        }))
    }

    register( formData: RegisterForm) {
      
      console.log( 'UserService: register() => HTTP Post registro de usuario'  )    
      return this.http.post(`${ apiUrl }/user/register`, formData)
        .pipe(tap( (resp: any) =>{
          console.log( 'UserService: register() => HTTP Post Usuario registrado ', resp  )
          localStorage.setItem('email-verify', formData.email );
          console.log( 'UserService: register() => almacenando el LocalStorage email para verificar ', resp  )
          this.router.navigate(['/verifyaccount'])
          console.log( 'UserserviceService: register() => RouterLink /verifyaccount' )
        })
      );

    }
    verifyAcccount( email: string, pin: string) {

      console.log( 'UserService: verifyAcccount() => HTTP Post para verificar cuenta'  ) 
      const body = {  }   
      return this.http.post(`${ apiUrl }/users/verifyAccount`, { email,pin } )
        .pipe(tap( (resp: any) =>{
          console.log( 'UserService: verifyAcccount() => HTTP Post Cuenta Vrificada ', resp  )
        })
      );

    }
    

    logout() {
      localStorage.removeItem('jwttoken');
      localStorage.removeItem('user-name')
      localStorage.removeItem('user-email')
      localStorage.removeItem('user-filename')
      localStorage.removeItem('user-id')
      localStorage.removeItem('UserData')
      localStorage.removeItem('email-verify')
      console.log( 'UserserviceService: logout() => LocalStorage clean' )
    }

}
