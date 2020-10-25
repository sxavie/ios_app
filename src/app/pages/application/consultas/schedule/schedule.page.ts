import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consult } from 'src/app/models/consult.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public consult:Consult =  JSON.parse(localStorage.getItem('orderDetail'));

  dateSelected;

  hours = new Array(24);
  time: string; 
  month: string; 
  day: string; 
  year : string

  constructor( private router: Router ) { }

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
      console.log(  'La fecha es menor a hoy' )
    }else{

      this.consult.month = this.month.toString();
      this.consult.day = this.day.toString();
      this.consult.year = this.year.toString();
            
      this.time = (this.time + 1).toString();
      this.time = this.time + ':00'
      this.consult.hour = this.time
      this.consult.meeting = true;

      

      localStorage.setItem('orderDetail', JSON.stringify(this.consult))

      this.router.navigate(['app/consultas/motivos'])

    }
  }

}
