import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-labschedule',
  templateUrl: './labschedule.page.html',
  styleUrls: ['./labschedule.page.scss'],
})
export class LabschedulePage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  getSelectedTime( e ){
    console.log( e )
  }

  labs_next(){
    this.router.navigate(['app/labs/labaddresses']);
  }

}
