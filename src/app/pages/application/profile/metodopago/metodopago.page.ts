import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.page.html',
  styleUrls: ['./metodopago.page.scss'],
})
export class MetodopagoPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');

  constructor(private menuCtrl: MenuController,
    private router: Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
