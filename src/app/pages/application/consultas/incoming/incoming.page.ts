import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.page.html',
  styleUrls: ['./incoming.page.scss'],
})
export class IncomingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  calling(){
    console.log( 'Calling Button' )
  }
  chating(){
    console.log( 'Chat Button' )
  }

}
