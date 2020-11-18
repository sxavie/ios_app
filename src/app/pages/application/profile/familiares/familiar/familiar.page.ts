import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.page.html',
  styleUrls: ['./familiar.page.scss'],
})
export class FamiliarPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');

  public imgSrc;
  public userData:any = [];
  public familiarList:any;
  public familiarId:any;
  public familiar:any;
  public filename:any;

  constructor( private activatedroute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private userservice: UserserviceService ) { }

  async ngOnInit() {


    let spinner = await this.loadingCtrl.create({
      spinner: 'lines-small'
    })

    await spinner.present();

    this.activatedroute.params.subscribe( param => {
      this.familiarId = param.id;
    });

    this.userData =  JSON.parse(localStorage.getItem('UserData'));
    this.familiarList = this.userData.family;

    this.familiarList.forEach(member => {
      
      if( this.familiarId === member._id ){
        this.familiar = member;
        localStorage.setItem('member-view', JSON.stringify(member))
        this.filename = member.filename;
        if(this.filename === null || this.filename === undefined){ 
          this.imgSrc  =  'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png' 
        } else {
          this.imgSrc = this.userservice.transformFamilyFilename( this.filename )
        } 
        this.loadingCtrl.dismiss();
        return;
      }

    });

  }

}
