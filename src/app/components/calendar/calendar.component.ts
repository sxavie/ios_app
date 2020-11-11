import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarComponent as CompCalendar } from 'ionic2-calendar'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  
  @Output() timeSelected = new EventEmitter<string>();

//   eventSource = [
//     { 
//       title: 'Nutriologo',
//       startTime: new Date(Date.UTC(2020,9,28,17,30,0)),
//       endTime: new Date(Date.UTC(2020,9,28,18,30,0,0)),
//       allDay: false
//     },{ 
//       title: 'CrossFit',
//       startTime: new Date(Date.UTC(2020,9,24,6,30,0)),
//       endTime: new Date(Date.UTC(2020,9,24,7,30,0,0)),
//       allDay: false
//     },{ 
//       title: 'Boda Amix',
//       startTime: new Date(Date.UTC(2020,9,31,0,0,0)),
//       endTime: new Date(Date.UTC(2020,9,31,0,0,0,0)),
//       allDay: false
//     },{ 
//       title: 'Misa',
//       startTime: new Date(Date.UTC(2020,10,1,0,0,0)),
//       endTime: new Date(Date.UTC(2020,10,2,0,0,0,0)),
//       allDay: true
//     }
// ];

  viewTilte: string;

  calendar = {
    mode: 'month',
    currentDate : new Date()
  };

  selectedDate: Date; 

  @ViewChild(CompCalendar) myCal: CompCalendar;

  constructor() { }

  ngOnInit() {}

  // onEventSelected(ev) {
  //   console.log( 'onEventSelected ', ev )
  // }
  
  onTimeSelected(ev){
    this.timeSelected.emit(ev.selectedTime)
  }

  next(){
    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev()
  }

  onViewTitleChanged(title){
    this.viewTilte = title
  }



}
