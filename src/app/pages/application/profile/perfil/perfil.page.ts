import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Capacitor, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera, Filesystem } = Capacitor.Plugins;



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  

  public userID = localStorage.getItem('user-id');
  public imgAvatar = localStorage.getItem('user-filename');
  public userData : Usuario[] = JSON.parse(localStorage.getItem('UserData')) || '';

  public loading;

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {

      if( localStorage.getItem('UserData') ) {
        this.userData =  JSON.parse( localStorage.getItem('UserData') )
        console.log( 'Perfil: Constructor() => UserData obtenido del localStorage JSON.parse()' )
      }else{
        this.userservice.getUserData().subscribe( async(resp:any) => {
          localStorage.setItem('UserData', JSON.stringify(resp) )
          this.userData = resp;
          console.log( 'Perfil: Constructor() => UserData obtenido del userservice.getUserData().subscribe()' )
        })
      }

    this.imgAvatar = localStorage.getItem('user-filename');

    }

    async ngOnInit() {
      
      this.loading = await this.loadingCtrl.create({
        spinner: 'lines-small',
        message: 'Actualizando'
      })

    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'actionSheet-custom',
        buttons: [{
          text: 'Camara',
          icon: 'camera-outline',
          handler: () => {
            this.getPhoto( CameraSource.Camera );
          }
        },{
          text: 'Galeria',
          icon: 'image-outline',
          handler: () => {
            this.getPhoto( CameraSource.Photos );
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
      });

      await actionSheet.present();

    }

    async getPhoto( source ){

      let photo = await Camera.getPhoto({
        quality:100,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true,
        source: source
      })

      var file = await photo;

      this.updatePhoto(file)
    }

    async updatePhoto(file){

      await this.loading.present();

      const blob = this.b64toBlob(file, 'image/jpg');

      let frmData = new FormData();
      frmData.append('image', blob)

      this.userservice.updateUserPhoto( this.userID, frmData).subscribe( () => {
        this.userservice.getUserData().subscribe( resp => {
          this.imgAvatar = this.userservice.transformFilename( resp.filename );
          this.loading.dismiss()
        })
      })
    }

    private b64toArrayBff( file ){
      const bytesString = atob(file.dataUrl.split(',')[1]);
      const ab = new ArrayBuffer(bytesString.length);
      const ia = new Uint8Array(ab);

      for ( let i = 0; i < bytesString.length; i++ ) {
        ia[i] = bytesString.charCodeAt(i);
      }
      
      return ia;
    }

    private b64toBlob( file, mimetype ){
      return new Blob([this.b64toArrayBff(file)], {
        type: mimetype
      })
    }

    toggleMenu(){
      this.menuCtrl.toggle('tdxMenu');
    }

    goHome(){
      this.router.navigate(['/app/home'])
    }

} 
