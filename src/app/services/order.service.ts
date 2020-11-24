import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingController } from '@ionic/angular';
import { Consult } from '../models/consult.model';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public token = localStorage.getItem('jwttoken');
  public userid = localStorage.getItem('user-id')

  // Order Variables
  public newConsultData: Consult;
  public consultResponse 
  
  
  public loader;

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

  genNewOrder(){

    this.loadPresnte('Generando la orden')

    let url = `${apiUrl}/order`
    let headers = this.authHeaders;

    console.log( 'la data de la cosnulta ', this.newConsultData );

    return this.http.post( url, this.newConsultData, {headers} )
      .pipe(tap( (order:any) => {

        console.log( ' respueste de solicitud',order )

        if(order.meeting){
          this.alertsservice.nativeToast('Su orden ha sido agendada')
          this.router.navigate(['app/'])
        }else{
          this.consultResponse = order
          // this.router.navigate(['app/consultas/incoming'])
        }
        this.loader.dismiss()

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
 