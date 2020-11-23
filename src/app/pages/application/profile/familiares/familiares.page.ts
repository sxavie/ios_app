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
  public userData : Usuario;

  constructor(
    private router: Router,
    private userservice: UserserviceService,
    private modalCtrl: ModalController, 
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.userData = this.userservice.usuario
  }




  async addMemberModal(ev: any){    
    console.log('FamiliaresPage addMemberModal() ==> Ejecutando el modal ')

    const modal = await this.modalCtrl.create({
      component: AgregarfamiliarPage,
      cssClass: 'addMember-modal',
      backdropDismiss: false
      
    }); 
    
    modal.onWillDismiss().then(() => {
      this.userData = this.userservice.usuario
    });

    return await modal.present();

  }

  goFamiliar( id ){
    this.router.navigate([`/app/familiares/familiar/${id}`]);
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }


}
