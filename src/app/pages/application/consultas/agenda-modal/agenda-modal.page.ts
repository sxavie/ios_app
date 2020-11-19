import { Component, Input, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-agenda-modal',
  templateUrl: './agenda-modal.page.html',
  styleUrls: ['./agenda-modal.page.scss'],
})
export class AgendaModalPage implements OnInit {

  
  @Input() date: string;
  @Input() events:any [];
  
  public forEvents:any[] = [];
  public time;
  public numberDay;
  public nameDay
  
  public image;

  constructor( public userservice: UserserviceService) { }

  ngOnInit() {

    this.image = localStorage.getItem('user-filename')

   this.setDateVariables();

  }

  setDateVariables(){

    let date: Date = new Date( this.date );

    this.nameDay = this.getNameDay( date.getDay() )
    this.numberDay = date.getDate();

    for (let i = 0; i < this.events.length; i++) {
      const ev = this.events[i];

      const time = new Date(ev.startTime)
      const h = time.getHours();
      const m = time.getMinutes();
      
      this.forEvents.push({
        title: ev.title,
        startTime: ev.startTime,
        endTime: ev.endTime,
        allDay: ev.allDay,
        time: `${h}:${m}`
      })
    }
  }


  getNameDay( day ):string {

    let name

    switch (day) {
      case 0:
        name = 'Domingo'
        break;
      case 1:
        name = 'Lunes'
        break;
      case 2:
        name = 'Martes'
        break;
      case 3:
        name = 'Miércoles'
        break;
      case 4:
        name = 'Jueves'
        break;
      case 5:
        name = 'Viernes'
        break;
      case 6:
        name = 'Sábado'
        break;
      default:
        name = 'NA'
        break;
    }

    return name
  }

}
