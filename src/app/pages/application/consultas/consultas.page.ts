import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Consult } from 'src/app/models/consult.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'], 
})
export class ConsultasPage implements OnInit {
  
  constructor( public userservice: UserserviceService,
    private router: Router,
    private menuCtrl: MenuController
    ) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle('tdxMenu');
  }


  reqNewOrder(  reason ){
    console.log( reason )
    let consult:Consult = new Consult(parseInt(reason))
    localStorage.setItem('orderDetail', JSON.stringify(consult))
    this.router.navigate(['/app/consultas/request'])
    
    
  }

  

}
