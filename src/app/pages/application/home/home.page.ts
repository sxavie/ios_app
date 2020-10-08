import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {
  }
  
  irA(pagex: string) {
    
    // console.log(pagex);
    
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['/consultas']);
        break;
      }
      case 'Resacas': {
        this.router.navigate(['/resacas'])
        break
      }
      case 'Farmaica': {
        this.router.navigate(['/farmacia'])
        break
      }
      case 'Lab': {
        this.router.navigate(['/labs'])
        break
      }
    }

  }
}
