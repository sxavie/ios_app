import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  public token = localStorage.getItem('jwttoken')
  

  constructor( private http: HttpClient,
    private alertsservice: AlertsService,
    private router: Router ) { 
  }

  get authHeaders(){
    const x = new HttpHeaders({
      'authorization': this.token
    });
    return x
  }

  getMedicine() {

    const url = `${apiUrl}/medicine`
    const headers = this.authHeaders;

    return this.http.get( url, { headers} )
      // .pipe(tap( medicine => {
      //   // console.log( medicine )
      // }))
      .pipe(catchError( err => {
        return throwError( err );
      }))
  }

  getItemName( name: string ) {
    // https://api.cavimex.vasster.com/medicine?key=name&value=Mejoralito
    const url = `${apiUrl}/medicine`
    const headers = this.authHeaders;

    let params = new HttpParams({
      fromObject : {
        'key':'name',
        'value':name
      }
    })

    return this.http.get(url, {headers, params})
      .pipe(catchError ( err => {
        return throwError( err )
      }))

  }

  newOrder( data ){

    // https://api.cavimex.vasster.com/store/order
    const url = `${apiUrl}/store/order`
    const headers = this.authHeaders;

    return this.http.post( url, data, { headers } ).
      pipe(map( resp => {
        localStorage.removeItem('myCarrito');
        localStorage.setItem('pharm-order', JSON.stringify(resp) );

        this.router.navigate(['/app/farmacia'])
      })).pipe(catchError( err => {
        this.alertsservice.nativeToast( err.error.error )
        return throwError( err );
      }))
  }

}
