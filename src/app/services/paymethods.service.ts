import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card } from '../interfaces/interfaces';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class PayMethodsService {

  constructor( private http: HttpClient,
    private router: Router ) { }

  
  addPayMethod( cardData: Card ){

    let token = localStorage.getItem('jwttoken')
    let url = `${ apiUrl }/payment/card`

    let headers = new HttpHeaders({
      'authorization': token
    })

    // console.log( 'PayMethodsService: addPayMethod() => cardData', cardData );

    return this.http.post( url, cardData, { headers } )
      .pipe(tap( resp => {
        // console.log( 'PayMethodsService: addPayMethod() => HTTP POST Response ', resp )
        this.router.navigate(['/app/metodopago'])
      }))
      .pipe(catchError( err => {
        return throwError( err )
      }))


  }
  
  getPayMethods(){
    // https://api.cavimex.vasster.com/payment/card/:user	devuelve un listado de los metodos de pago agregados por el usuario
    let uid = localStorage.getItem('user-id');
    let token = localStorage.getItem('jwttoken');
    let url = `${ apiUrl }/payment/card/${ uid }`;

    let headers = new HttpHeaders({
      'authorization': token
    })

    // console.log( headers )

    return this.http.get( url, { headers }  )
    .pipe(tap( resp => {
      // console.log( 'PayMethodsService: getPayMethods() => HTTP GET Response ', resp )
    }))
    .pipe(catchError ( err => {
      return throwError( err );
    }))
    
  }
  
  setPayMethod( cardId: string ){
    // https://api.cavimex.vasster.com/payment/card/default	definir tarjeta como predeterminada
    let uid = localStorage.getItem('user-id');
    let token = localStorage.getItem('jwttoken');
    let url = `${ apiUrl }/payment/card/default`

    let headers = new HttpHeaders({
      'authorization': token
    });

    // console.log( 'PayMethodsService: addPayMethod() => cardData', cardId );

    return this.http.post(url, {"user": uid, "card": cardId}, { headers })
      .pipe(map( resp => {
        // console.log( 'PayMethodsService: setPayMethod() => HTTP POS Response ', resp )
      }))
      .pipe(catchError( err => {
        return throwError( err );
      }))


  }


}
