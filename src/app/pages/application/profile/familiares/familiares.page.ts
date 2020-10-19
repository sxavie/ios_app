import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AgregarfamiliarPage } from '../agregarfamiliar/agregarfamiliar.page';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.page.html',
  styleUrls: ['./familiares.page.scss'],
})
export class FamiliaresPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  public userData : Usuario[] = [];

  constructor(
    private router: Router,
    private userservice: UserserviceService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {

    if( localStorage.getItem('UserData') ) {
      console.log( 'LolcaStorage Data' )
      this.userData =  JSON.parse( localStorage.getItem('UserData') )
    }else{ 
      console.log( 'UserService Data' );
      this.userservice.getUserData().subscribe( (resp:any) => {
        localStorage.setItem('UserData', JSON.stringify(resp) )
        this.userData = resp;
      })   
    }
  }

  async addMemberModal(ev: any){    
    console.log('FamiliaresPage addMemberModal() ==> Ejecutando el modal ')

    const modal = await this.modalCtrl.create({
      component: AgregarfamiliarPage,
      cssClass: ''
    });
    return await modal.present();

    // const popover = await this.popoverCtrl.create({
    //   component: AgregarfamiliarPage,
    //   cssClass: 'popover_class',
    //   event: ev,
    //   translucent: true,
    //   animated: true
    // });
    // return await popover.present();

  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
