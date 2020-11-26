import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

import { Capacitor, CameraResultType, CameraSource } from '@capacitor/core'
import { AlertsService } from 'src/app/services/alerts.service';
const { Camera } = Capacitor.Plugins;



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  

  public userID = localStorage.getItem('user-id');
  public imgAvatar:string;
  public userData: Usuario;

  public loading; 

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertsservice: AlertsService) {

      this.userData = this.userservice.usuario;
      this.imgAvatar = this.userData.imageUrl;

    }

    async ngOnInit() {
      
      this.loading = await this.loadingCtrl.create({
        spinner: 'lines-small',
        message: 'Actualizando'
      })

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

      this.userservice.updateUserPhoto( this.userID, frmData).subscribe( 
        (photoUpdated) => {},
        (onError) => {
          this.loading.dismiss() 
          if ( onError.status === 0 ) {
            this.alertsservice.showAelrt('Error al conectarse con el servidor', 'Server Error')
          } else {
            this.alertsservice.nativeToast( onError.error.message )
          }
        },
        () => {
          this.userservice.getUserData().subscribe( 
            (userData) => {
              this.imgAvatar = this.userservice.transformFilename( userData.filename );
            },
            (onError) => {
              // Subscription handle errors
              this.loading.dismiss() 
              if ( onError.status === 0 ) {
                this.alertsservice.showAelrt('Error al conectarse con el servidor', 'Server Error')
              } else {
                this.alertsservice.nativeToast( onError.error.message )
              }
            },
            () => {
              this.userservice.imgUpdated.emit(this.imgAvatar)
              this.loading.dismiss() 
            }
          )
        }
      )

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

    toggleMenu(){
      this.menuCtrl.toggle('tdxMenu');
    }

    goHome(){
      this.router.navigate(['/app/home'])
    }

} 
