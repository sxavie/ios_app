import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarComponent as CompCalendar } from 'ionic2-calendar'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  
  @Output() timeSelected = new EventEmitter<string>(); 

  viewTilte: string;

  calendar = {
    mode: 'month',
    currentDate : new Date()
  };

  selectedDate: Date; 

  @ViewChild(CompCalendar) myCal: CompCalendar;

  constructor() { }

  ngOnInit() {

  
  }

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
