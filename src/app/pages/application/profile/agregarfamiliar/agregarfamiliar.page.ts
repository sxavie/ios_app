import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-agregarfamiliar',
  templateUrl: './agregarfamiliar.page.html',
  styleUrls: ['./agregarfamiliar.page.scss'],
})
export class AgregarfamiliarPage implements OnInit {

  public FormFamiliar = this.fb.group({
    name: ['', Validators.required],
    relationship: ['', Validators.required],
    source: '3'
  })

  constructor( private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userservice: UserserviceService ) { }

  ngOnInit() {
  }
 
  addFamiliar(){  

    console.log(   this.FormFamiliar.value )

    this.userservice.addMember( this.FormFamiliar.value ).subscribe( resp =>{
      console.log( 'AgregarFamiliarPage: Subscription response ', resp );
      this.close();
    })
  }

  close(){
    
      this.modalCtrl.dismiss({
        'dismissed': true
      });

  }
  

}
