import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { Diseases, LoginForm, PayMethod, RegisterForm, UpdateForm } from '../interfaces/interfaces';
import { Usuario } from '../models/usuario.model';
import { Observable, of, Subject, throwError } from 'rxjs';
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
  
  public userFoto = '../../assets/userNoImg.png';
  public usuario: Usuario;
  public userView: Usuario;

  //variables variables
  public imgUpdated : EventEmitter<string> = new EventEmitter<string>();
  public defaultMethod: PayMethod = { brand: 'cash', cardID: 'cash', default_source: 'cash', last4: '' }
  public defaultAddressID: string;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertsservice: AlertsService
    ) {    }
    
    get authHeaders() {

      this.token = localStorage.getItem('jwttoken');

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
        this.userFoto = imgPath
      }else{
        let splitImgFormat = u.split('.');
        imgPath = `${apiUrl}/images/users/${splitImgFormat[0]}`
        this.userFoto = imgPath
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

      this.transformFilename(u.filename)

      localStorage.setItem('user-name', u.name)
      localStorage.setItem('user-email', u.email)
      localStorage.setItem('user-id', u.id)

      this.router.navigate(['/app'])
      
    }

    getUserData(): Observable<Usuario>{

      let token = localStorage.getItem('jwttoken');
      let uid = localStorage.getItem('user-id')
      let url = `${ apiUrl }/users/${ uid }`

      let headers = new HttpHeaders({
        'authorization': token 
      })


      return this.http.get<Usuario>(  url ,{ headers } )
        .pipe(tap( (x:any) => {

          this.transformFilename(x.filename)
          const{ _id, name, email, password, 
            dateCreated, userType, birthday, gender, filename, mobile, bloodType,
            height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
            isOrder, skills, allergies, diseases, family, relationship } = x

          this.usuario = new Usuario( _id, name, email, password, 
            dateCreated, userType, birthday, gender, filename, mobile, bloodType,
            height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
            isOrder, skills, allergies, diseases, family, relationship);


            console.log( 'new user Model ' ,this.usuario)

         }))
         .pipe(catchError( err => {
           return throwError(err)
         }));

    }

    getMemberData( memberid:string ) {

      let token = localStorage.getItem('jwttoken');
      let url = `${ apiUrl }/users/${ memberid }`

      let headers = new HttpHeaders({
        'authorization': token 
      })

      return this.http.get<Usuario>(  url ,{ headers } )
      .pipe(tap( (x:any) => {

        const{ _id, name, email, password, 
          dateCreated, userType, birthday, gender, filename, mobile, bloodType,
          height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
          isOrder, skills, allergies, diseases, family, relationship } = x

        this.userView = new Usuario( _id, name, email, password, 
          dateCreated, userType, birthday, gender, filename, mobile, bloodType,
          height, weight, paymentID, terms, verified, verificationCode, active, firebaseToken,
          isOrder, skills, allergies, diseases, family, relationship);

       }))
       .pipe(catchError( err => {
         return throwError(err)
       }));

    }

    updateUserData( id, body ){

      let url = `${ apiUrl }/users/${ id }`
      let headers = this.authHeaders;

      return this.http.put( url , body, { headers })
        .pipe(tap( () => {

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

    updateUserDataDiseases( id, data: Diseases ){

      // console.log('UserService: updateUserDataDiseases() => Start')
      
      let token = localStorage.getItem('jwttoken');

      let url = `${ apiUrl }/user/medicalhistory/${ id }`

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
        .pipe(tap( () => {
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
        .pipe(tap( ()=> {
          setTimeout(() => {
            this.getUserData();
          }, 150);
        }))
        .pipe(catchError( err => {
          return throwError( err );
        }))

    }

    getAddressList(){
      let url = `${ apiUrl }/addresses/${this.usuario._id}/list`
      let headers = this.authHeaders;

      return this.http.get( url, { headers })
        .pipe(tap( addressList => {
        }))
        .pipe(catchError( err => {
          return throwError( err );
        }))
    }

    updateUserPhoto( id, form ){

      // https://api.cavimex.vasster.com/user/photo/5f91caa9ed5b402c0370f227
      let url = `${apiUrl}/user/photo/${id}`;
      let headers = this.authHeaders;

      return this.http.put( url, form, {headers} )
        .pipe(catchError( err  => { return throwError(err)}));

    }

    // funcion sin usar
    saveLocalStorage( userData, ){
      // console.log( 'UserService: saveLocalS() => Data almacenada en el local storage' )
    }

}
