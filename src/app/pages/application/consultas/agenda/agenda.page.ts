import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CalendarComponent as CompCalendar } from 'ionic2-calendar'
import { ModalController } from '@ionic/angular';
import { AgendaModalPage } from '../agenda-modal/agenda-modal.page';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  public userData =  JSON.parse(localStorage.getItem('UserData'));
  public events :any= [];

  // configuracion de calendario
  @ViewChild(CompCalendar) myCal: CompCalendar;
  
  viewTilte: string;

  calendar = {
    mode: 'month',
    currentDate : new Date()
  };

  public eventSource = [
    { 
      title: 'Nutriologo',
      startTime: new Date(Date.UTC(2020,9,28,17,30,0)),
      endTime: new Date(Date.UTC(2020,9,28,18,30,0,0)),
      allDay: false
    },{ 
      title: 'CrossFit',
      startTime: new Date(Date.UTC(2020,9,24,6,30,0)),
      endTime: new Date(Date.UTC(2020,9,24,7,30,0,0)),
      allDay: false
    },{ 
      title: 'Boda Amix',
      startTime: new Date(Date.UTC(2020,9,31,0,0,0)),
      endTime: new Date(Date.UTC(2020,9,31,0,0,0,0)),
      allDay: false
    },{ 
      title: 'Misa',
      startTime: new Date(Date.UTC(2020,10,1,0,0,0)),
      endTime: new Date(Date.UTC(2020,10,1,0,0,0,0)),
      allDay: true
    }
];
  

  constructor( private orderservice: OrderService,
    private modalCtrl: ModalController ) { }

  async ngOnInit() {

    this.events = await this.orderservice.scheduled( this.userData._id ).toPromise();

    this.events.data.forEach(ev => {
      
      this.eventSource.push({
        title: ev.consultReason,
        endTime: new Date(ev.date),
        startTime: new Date(ev.date),
        allDay: true
      })
    });
  }

  async onTimeSelected(ev){

    console.log( ev )
    
    if(ev.events.length>0){
      

      let evSc = await this.modalCtrl.create({
        component: AgendaModalPage,
        cssClass: 'agendaModal-modal',
        componentProps: {
          events: ev.events,
          date: ev.selectedTime
        },
        swipeToClose: true,
        presentingElement: await this.modalCtrl.getTop(),
        showBackdrop: false
      })

      await evSc.present();

    }
  }

  onEventSelected(ev){
    console.log(' on event selñected event ', ev)
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
