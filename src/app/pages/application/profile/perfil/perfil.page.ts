import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Menu app propieties
  hostMenuId = 'hostMenuProfile'
  nameMenuId = 'profileHome'

  constructor( private menuCtrl: MenuController,
      private router: Router) { }

  ngOnInit() {
  }
  
  toggleMenu(){
    // this.menuCtrl.toggle(this.nameMenuId);
    this.menuCtrl.toggle('tdxMenu');
  }

  goHome(){
    this.router.navigate(['/home'])
  }

}
