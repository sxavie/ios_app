import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultSumm } from 'src/app/models/consultsumm.model';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.page.html',
  styleUrls: ['./incoming.page.scss'],
})
export class IncomingPage implements OnInit {

  ordSummary: ConsultSumm;

  constructor( private router: Router ) { }

  ngOnInit() {

    this.ordSummary = JSON.parse(localStorage.getItem('orderSummary'))
  }



  nextt(){
    this.router.navigate(['app/consultas/summary'])
  }

  calling(){
    console.log( 'Calling Button' )
  }
  chating(){
    console.log( 'Chat Button' )
  }

}
