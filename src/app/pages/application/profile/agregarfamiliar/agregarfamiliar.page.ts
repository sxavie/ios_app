import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  addFamiliar(){

    console.log( this.FormFamiliar.value )
  }

  close(){
    
      this.modalCtrl.dismiss({
        'dismissed': true
      });

  }

}
