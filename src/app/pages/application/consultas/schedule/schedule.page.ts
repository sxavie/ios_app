import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public userData = JSON.parse(localStorage.getItem('UserData'))
  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));

  dateSelected;
  timeSelected;
  timeNow;
  now:Date = new Date();
  validTime = false;

  hours = new Array(24);
  time: string; 
  month: string; 
  day: string; 
  year : string

  constructor( private router: Router,
    private alertsservice: AlertsService,
    private orderservice: OrderService ) { }

  ngOnInit() {
    let h = this.now.getHours()
    let m = this.now.getMinutes()
    this.timeNow = `${h}:${m}`;
  }

  getSelectedTime( ev ){

    this.dateSelected = ev;

    this.month = ev.getUTCMonth() + 1; //months from 1-12
    this.day = ev.getUTCDate();
    this.year = ev.getUTCFullYear();
  }

  timeValid(){

    // convertir fecha seleccionada a Date
    let dateSel = new Date(this.dateSelected)

    



    let hnow = this.now.getHours()
    let mnow = this.now.getMinutes()
    // let hsel = this.timeSelected.getHours()
    // let msel = this.timeSelected.getHours()

    // let nowFull = `${hnow}`

    // console.log(this.now.getUTCDate())
    // console.log(this.dateSelected.getUTCFullYear())

    // this.validTime = true


  }

  schedule(){    

    this.validTime = true

    if( this.dateSelected < new Date()){
      this.alertsservice.nativeToast('La fecha seleccionada no es valida')
      return;
    }

    if (this.timeSelected === undefined || this.timeSelected === null ){
      this.alertsservice.nativeToast('Debe seleccionar un horario ')
      return;
    }

    if(!this.validTime){
      this.alertsservice.nativeToast('Horario seleccionado falso ')
      return;
    } 

    // transformar fecha
    if( Number(this.month) < 10 )this.month = `0${this.month}`
    if( Number(this.day) < 10) this.day = `0${this.day}`


    this.consult.patient = this.userData._id;
    this.consult.guest = false;

    // transformar tiempo
    let times = new Date(this.timeSelected)
    this.time = times.getHours() < 10 
    ? `0${times.getHours().toString()}:${times.getMinutes().toString()}` 
    : `${times.getHours().toString()}:${times.getMinutes().toString()}`
    
    this.consult.month = this.month.toString();
    this.consult.day = this.day.toString();
    this.consult.year = this.year.toString();
    this.consult.hour = this.time

    this.consult.meeting = true;

    localStorage.setItem('orderDetail', JSON.stringify(this.consult))

    this.orderservice.genNewOrder(this.consult).subscribe( resp => {console.log( resp )})
    // this.router.navigate(['app/consultas/motivos'])

  }

}
