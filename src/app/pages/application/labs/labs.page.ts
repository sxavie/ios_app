import { Component, OnInit } from '@angular/core';


import { CameraOptions, CameraResultType, Capacitor, Plugins } from '@capacitor/core'
const { Camera } = Plugins;

@Component({
  selector: 'app-labs',
  templateUrl: './labs.page.html',
  styleUrls: ['./labs.page.scss'],
})
export class LabsPage implements OnInit {

  constructor() { }

  ngOnInit() {

  this.takePic();    

  }

  async takePic(){

    let CameraOpts: CameraOptions = {
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    }

    const image = await Camera.getPhoto(CameraOpts)

    var imageUrl = image.webPath;

    console.log(  imageUrl )

  }

}
