import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consult } from 'src/app/models/consult.model';

@Component({
  selector: 'app-motivos',
  templateUrl: './motivos.page.html',
  styleUrls: ['./motivos.page.scss'],
})
export class MotivosPage implements OnInit {

  public consult:Consult = JSON.parse( localStorage.getItem('orderDetail') );
  public motivos:any[] = [];

  constructor( private router: Router ) { }

  ngOnInit() {

  }

  addMotivo( value ) {
    let index = this.motivos.indexOf(value);
    if(index === -1) { this.motivos.push( value )
    }else{ this.motivos.splice( index, 1 ) }
  }
  reqNewOrder(){

    this.consult.symptoms = this.motivos;
    localStorage.setItem('orderDetail', JSON.stringify(this.consult) );
    this.router.navigate(['app/consultas/selectuser'])

  }



}
 