import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt'
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

const helper = new JwtHelperService;

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  


  constructor( public userservice: UserserviceService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  logOut(){
    this.userservice.logout();
    this.router.navigate(['/'])
  }

  updateDiseases(){
    console.log( 'ConsultasView Susbcription Response ');
  }

}
