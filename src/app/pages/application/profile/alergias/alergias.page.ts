import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.page.html',
  styleUrls: ['./alergias.page.scss'],
})
export class AlergiasPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  public userData : Usuario[] = [];

  constructor(private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService) { }

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

  goHome(){
    this.router.navigate(['/app/home'])
  }

}
