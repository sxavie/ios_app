import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Capacitor, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core'
const { Camera, Filesystem } = Capacitor.Plugins;



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  @ViewChild('fileInput') fileInput:ElementRef;
  
  public uploadForm: FormGroup;  
  public photo;

  //Menu app propieties
  hostMenuId = 'hostMenuProfile'
  nameMenuId = 'profileHome'

  public userID = localStorage.getItem('user-id');
  public imgAvatar = localStorage.getItem('user-filename');
  public userData : Usuario[] = JSON.parse(localStorage.getItem('UserData')) || '';

  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder) {

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

    ngOnInit() {
      this.uploadForm = this.formBuilder.group({
        photo: ['']
      });
    }





  photoEdit(){
    console.log( 'editign photo' )
  }

    toggleMenu(){
      this.menuCtrl.toggle('tdxMenu');
    }

    goHome(){
      this.router.navigate(['/app/home'])
    }


    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        // header: 'Albums',
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
            this.getPhoto( 'gallery' );
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
      // let photo = await Camera.getPhoto({
      //   quality:100,
      //   resultType: CameraResultType.DataUrl,
      //   saveToGallery: true,
      //   source: CameraSource.Camera,
      // })
      // var base = photo.base64String;
      // Can be set to the src of an image now
      // console.log( 'image ',imageUrl )



      if(source === 'gallery'){

        let event = new MouseEvent('click', {bubbles: false})
        this.fileInput.nativeElement.dispatchEvent(event);

        

      }
    }

    async onPhotoUploaded(v){
      // this.photo = v.target.files
      console.log( v.target.files[0] )

      let file = v.target.files[0] 
      this.uploadForm.get('photo').setValue(file)

      const frmData = new FormData();
      frmData.append('file', this.uploadForm.get('photo').value)

      this.userservice.updateUserPhoto( this.userID, frmData).subscribe( resp => {
        console.log( resp )
      })

    }



}
