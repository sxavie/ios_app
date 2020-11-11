import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.page.html',
  styleUrls: ['./familiar.page.scss'],
})
export class FamiliarPage implements OnInit {


  imgAvatar = localStorage.getItem('user-filename')

  userData:any = [];
  familiarList:any;
  familiarId:any;
  familiar:any;

  constructor( private activatedroute: ActivatedRoute,
    private loadingCtrl: LoadingController ) { }

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
        this.loadingCtrl.dismiss();
        return;
      }

    });

  }

}
