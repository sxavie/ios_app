import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { Diseases, LoginForm, RegisterForm, UpdateForm } from '../interfaces/interfaces';
import { Usuario } from '../models/usuario.model';
import { Observable, of, throwError } from 'rxjs';
import { AlertsService } from './alerts.service';

// variables
const apiUrl = environment.apiUrl;
const helper = new JwtHelperService;

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
    private router: Router,
    private alertsservice: AlertsService
    ) { }
    
    get authHeaders() {

      let x = new HttpHeaders({
        'authorization': this.token
      });

      return x;
    }

    transformFilename( u:any ){

      let imgPath;
      localStorage.removeItem('user-filename')
      if( u === null || u === undefined ){
        imgPath = 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png';
      }else{
        let splitImgFormat = u.split('.');
        imgPath = `${apiUrl}/images/users/${splitImgFormat[0]}`
      }
      localStorage.setItem('user-filename', imgPath)

      return imgPath
    }

    transformFamilyFilename( u:any ){
      let imgPath;
      if( u === null || u === undefined ){
        imgPath = 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png';
      }else{
        let splitImgFormat = u.split('.');
        imgPath = `${apiUrl}/images/users/${splitImgFormat[0]}`
      }
      return imgPath
    }

    decodeToken( token ) {

      const u = helper.decodeToken( token )
      // console.log( 'UserserviceService: decodeToken() => token en decodificado, u.id: ', u.id )

      this.transformFilename(u.filename)

      localStorage.setItem('user-name', u.name)
      localStorage.setItem('user-email', u.email)
      localStorage.setItem('user-id', u.id)

      // console.log( 'UserserviceService: decodeToken() => data de Usuario guardado en el LocalStorage' )
      this.router.navigate(['/app'])
      // console.log( 'UserserviceService: decodeToken() => RouterLink /app' )
    }

    getUserData(): Observable<Usuario>{
    // getUserData(){

      // console.log('UserserviceService: getUserData() => Call getUserData();')

      let token = localStorage.getItem('jwttoken');
      let uid = localStorage.getItem('user-id')
      let url = `${ apiUrl }/users/${ uid }`

      let headers = new HttpHeaders({
        'authorization': token 
      })

      // console.log( 'UserserviceService: getUserData() => Token y userid Obtenidos de localStorage para el HHTP request' )
      // console.log( 'token:', token)
      // console.log( 'userid:', uid)

      return this.http.get<Usuario>(  url ,{ headers } )
        .pipe(tap( (x:any) => {

          localStorage.removeItem('UserData');
          localStorage.setItem('UserData', JSON.stringify(x));
 

          this.transformFilename(x.filename)

          // console.log( 'UserserviceService: getUserData() => http.get https://api.cavimex.vasster.com/users/:userid ' )
          
          const{ _id, name, email, password, 
            dateCreated, userType, birthday, gender, filename, mobile, bloodType,
            height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
            isOrder, skills, allergies, diseases, family } = x

          // this.usuario = new Usuario( x._id, x.name, x.email, x.password, x.dateCreated, x.userType, x.birthday, x.gender, x.filename, x.mobile, x.bloodType, x.height, x.weight, x.paymentID, x.terms, x.verified, x.verificationCode, x.active, x.firebaseToken, x.isOrder, x.skills, x.allergies, x.diseases, x.family);
          
          this.usuario = new Usuario( _id, name, email, password, 
            dateCreated, userType, birthday, gender, filename, mobile, bloodType,
            height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
            isOrder, skills, allergies, diseases, family);

          // console.log( 'UserserviceService: getUserData() => Data capturada en el modelo de Usuario ' )     
          // console.log( 'UserserviceService: getUserData() => usuario: ', this.usuario )

         }))
         .pipe(catchError( err => {
           return throwError(err)
         }));

    }
    //pendiente
    updateUserData( id, body ){

      let url = `${ apiUrl }/users/${ id }`

      let headers = this.authHeaders;


      return this.http.put( url , body, { headers })
        .pipe(tap( (resp:any) => {
          // console.log( 'UserserviceService: updateUserData() => Subscription to update (HTTP PUT) request', resp  )
          // console.log('obteniendo la user Data;')
          // Funcion para guardar en el LOCAL la data actualizada
        }))
          .pipe(catchError ( err => {
            return throwError( err )
          }));
    }

    updateUserDataAllergies( id, allergies ){

      let token = localStorage.getItem('jwttoken');
      let url = `${ apiUrl }/users/${id}`

      let headers = new HttpHeaders({
        'authorization': token
      });
      return this.http.put( url , allergies, { headers })
        .pipe(catchError( err => {
          return throwError( err )
        }))
    }

    updateUserDataDiseases( data: Diseases ){

      // console.log('UserService: updateUserDataDiseases() => Start')
      
      let token = localStorage.getItem('jwttoken');
      let uid = localStorage.getItem('user-id');
      let url = `${ apiUrl }/user/medicalhistory/${ uid }`

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      headers = headers.set('authorization', token)

      // console.log( data )

      const httpParamsData = new HttpParams()
      .set("diabetes", data.diabetes.toString() )
      .set("epilepsy", data.epilepsy.toString() )
      .set("heartDisease",data.heartDisease.toString() )
      .set("hypertension",data.hypertension.toString() )
      .set("prevSurgeries", data.prevSurgeries.toString() )
      .set("others", "true");


      // console.log( 'Data to susbcribre: ' , httpParamsData )
      return this.http.post(url, httpParamsData, {headers})
        .pipe(map( () => {
          // console.log( 'UserService: HTTP request response: ', resp )
        }))
        .pipe(catchError( err => {
          return throwError(err)
        }))
    }

    addMember( data ){

      let token = localStorage.getItem('jwttoken');
      let uid = localStorage.getItem('user-id')
      let url = `${ apiUrl }/user/addmember/${ uid }`;

      let headers = new HttpHeaders({
        'authorization': token
      });

      return this.http.post( url, data, {headers} )
        .pipe(map(resp => {
          // console.log( 'UserService: addMember() => HTTP POST Response ', resp )
          localStorage.removeItem('UserData');
        }))
        .pipe(catchError( err => {
          return throwError( err );
        }))

    }

    getAddressList(){
      let url = `${ apiUrl }/addresses/${this.userid}/list`
      let headers = this.authHeaders;

      return this.http.get( url, { headers })
        .pipe(tap( addressList => {
          // console.log('UserService: getAddressList => HTTP GET Response: ', addressList)
        }))
        .pipe(catchError( err => {
          return throwError( err );
        }))
    }

    updateUserPhoto( id, photo ){

      // https://api.cavimex.vasster.com/user/photo/5f91caa9ed5b402c0370f227
      let url = `${apiUrl}/user/photo/${id}`;
      let headers = this.authHeaders;

      return this.http.put( url, photo, {headers} )
        .pipe(catchError( err  => { return throwError(err)}));

    }

    // funcion sin usar
    saveLocalStorage( userData, ){
      // console.log( 'UserService: saveLocalS() => Data almacenada en el local storage' )
    }

}
