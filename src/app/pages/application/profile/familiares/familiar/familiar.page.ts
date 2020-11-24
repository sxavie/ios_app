import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.page.html',
  styleUrls: ['./familiar.page.scss'],
})
export class FamiliarPage implements OnInit {

  public imgAvatar;
  public userData:Usuario;
  public familiarList:any[];
  public memberImgSrc;

  public familiarId:string;
  public familiar:Usuario;
  public filename:any;

  constructor( private activatedroute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private userservice: UserserviceService ) {
      this.userData =  this.userservice.usuario;
      this.familiarList = this.userData.family;
    }

  async ngOnInit() {

    this.imgAvatar = this.userservice.usuario.imageUrl;

    let spinner = await this.loadingCtrl.create({
      spinner: 'lines-small'
    })

    await spinner.present();

    this.activatedroute.params.subscribe( param => {
      this.familiarId = param.id;
    });

    this.familiarList.forEach((member:Usuario) => {
      
      if( this.familiarId === member._id ){

        const { _id, name, email, password, dateCreated, userType, birthday, gender, filename, mobile, bloodType, height, weight,
          paymentID, terms, verified, verificationCode, active, firebaseToken, isOrder, skills, allergies
          , diseases, family  } = member

        this.userservice.userView = new Usuario( _id, name, email, password, dateCreated, userType, birthday, gender, filename, mobile, bloodType, height, weight,
          paymentID, terms, verified, verificationCode, active, firebaseToken, isOrder, skills, allergies
          , diseases, family)

          this.memberImgSrc = this.userservice.userView.imageUrl

        this.loadingCtrl.dismiss();
        return;
      }

    });

  }

}
