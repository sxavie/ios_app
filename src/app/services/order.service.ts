import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsService } from './alerts.service';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public token = localStorage.getItem('jwttoken');
  public userid = localStorage.getItem('user-id')

  constructor( private http: HttpClient,
    private router: Router,
    private alertsservice: AlertsService) { }

  get authHeaders(){

    let h = new HttpHeaders({
      'authorization': this.token
    })

    return h;
  }

  genNewOrder( orderData ){

    let url = `${apiUrl}/order`

    let headers = this.authHeaders;

    return this.http.post( url, orderData, {headers} )
      .pipe(tap( (resp:any) => {

        // console.log( 'OrderService: genNewOrder => HTTP Response ', resp )

        if(resp.meeting){
          this.alertsservice.nativeToast('Su orden ha sido agendada')
          this.router.navigate(['app/'])
        }else{
          localStorage.setItem('orderSummary', JSON.stringify(resp))
          this.router.navigate(['app/consultas/incoming'])
        }
        
        localStorage.removeItem('orderDetail')

      }))
      .pipe(catchError( e => {
        this.alertsservice.nativeToast(e.error.message)
        return throwError( e )
      }));

  }



}
 