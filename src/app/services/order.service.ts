import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingController } from '@ionic/angular';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public loader;

  public token = localStorage.getItem('jwttoken');
  public userid = localStorage.getItem('user-id')

  constructor( private http: HttpClient,
    private router: Router,
    private alertsservice: AlertsService,
    private loadingCtrl: LoadingController) { }

  get authHeaders(){

    let h = new HttpHeaders({
      'authorization': this.token
    })

    return h;
  }

  genNewOrder( orderData ){

    this.loadPresnte('Generando la orden')

    let url = `${apiUrl}/order`
    let headers = this.authHeaders;

    return this.http.post( url, orderData, {headers} )
      .pipe(tap( (resp:any) => {

        console.log( 'OrderService: genNewOrder => HTTP Response ', resp )
        
        console.log('orderDsts',  orderData )
        if(resp.meeting){
          this.alertsservice.nativeToast('Su orden ha sido agendada')
          this.router.navigate(['app/'])
        }else{
          localStorage.setItem('orderSummary', JSON.stringify(resp))
          // this.router.navigate(['app/consultas/incoming'])
        }
        this.loader.dismiss()
        localStorage.removeItem('orderDetail')

      }))
      .pipe(catchError( e => {
        this.alertsservice.nativeToast(e.error.message)
        this.loader.dismiss();
        return throwError( e.error )
      }));

  }


  scheduled( id ){
    // https://api.cavimex.vasster.com/order/5f85d2c85be5532208edbc58/meeting

    let url = `${apiUrl}/order/${id}/meeting`
    let headers = this.authHeaders

    return this.http.get(url, {headers})
      .pipe(catchError( err => 
        {return throwError( err )}
      ))
  }

  async loadPresnte( msg ){

    this.loader = await this.loadingCtrl.create({
      spinner: 'lines-small',
      message: msg
    })
  
    await this.loader.present();

  }



}
 