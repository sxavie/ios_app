import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public token = localStorage.getItem('jwttoken');
  public userid = localStorage.getItem('user-id')

  constructor( private http: HttpClient,
    private router: Router) { }

  get authHeaders(){

    let h = new HttpHeaders({
      'authorization': this.token
    })

    return h;
  }

  genNewOrder( orderData ){

    // https://api.cavimex.vasster.com/order
    let url = `${apiUrl}/order`

    let headers = this.authHeaders;

    return this.http.post( url, orderData, {headers} )
      .pipe(tap( (resp:any) => {
        console.log( 'OrderService: genNewOrder => HTTP Response ', resp )
        localStorage.setItem('orderSummary', JSON.stringify(resp))
        this.router.navigate(['app/consultas/incoming'])
      }))
      .pipe(catchError( err => {
        return throwError( err )
      }));

  }

}
 