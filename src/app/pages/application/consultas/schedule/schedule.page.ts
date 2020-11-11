import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consult } from 'src/app/models/consult.model';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));

  dateSelected;
  timeSelected;

  hours = new Array(24);
  time: string; 
  month: string; 
  day: string; 
  year : string

  constructor( private router: Router,
    private alertsservice: AlertsService ) { }

  ngOnInit() {
  }

  getSelectedTime( ev ){

    this.dateSelected = ev;

    this.month = ev.getUTCMonth() + 1; //months from 1-12
    this.day = ev.getUTCDate();
    this.year = ev.getUTCFullYear();
  }


  schedule(){

    if( this.dateSelected < new Date()){
      this.alertsservice.nativeToast('La fecha seleccionada no es valida')
      return;
    }

    console.log(this.time, 'time time' )
    if (this.time === undefined || this.time === null ){
      this.alertsservice.nativeToast('Debe seleccionar un horario ')
      return;
    }

    if( Number(this.month) < 10 )this.month = `0${this.month}`
    if( Number(this.day) < 10) this.day = `0${this.day}`
    if( Number(this.time + 1) < 10) this.time = `0${this.time + 1}:00`
    else this.time = `${this.time + 1}:00`
    
    this.consult.month = this.month.toString();
    this.consult.day = this.day.toString();
    this.consult.year = this.year.toString();
    this.consult.hour = this.time

    this.consult.meeting = true;

    localStorage.setItem('orderDetail', JSON.stringify(this.consult))

    this.router.navigate(['app/consultas/motivos'])

  }

}
