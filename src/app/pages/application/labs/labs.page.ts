import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.page.html',
  styleUrls: ['./labs.page.scss'],
})
export class LabsPage implements OnInit {

  public serviceSelected;

  constructor( private router: Router ) { }

  ngOnInit() {


  }

  serviceRequest(){

    if (this.serviceSelected){
      
        localStorage.setItem('orderLab', this.serviceSelected);

        this.router.navigate(['/app/labs/labschedule']);
    }
    // else{
    //   console.log( ' No selecciono servicip' )
    // }
  }



}
