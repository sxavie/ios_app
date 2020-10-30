import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  public token = localStorage.getItem('jwttoken')
  

  constructor( private http: HttpClient ) { 
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

}
