import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-historialmedico',
  templateUrl: './historialmedico.page.html',
  styleUrls: ['./historialmedico.page.scss'],
})
export class HistorialmedicoPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');
  public userData: Usuario;
  public diseases: any;

  public diseasesFormData = this.fb.group({
      diabetes: false,
      hypertension: false,
      heartDisease: false,
      epilepsy: false,
      prevSurgeries: false,
      others: false
  })
  
  constructor( private router: Router,
    private userservice: UserserviceService,
    private fb: FormBuilder) { }
  
  ngOnInit() {
    
    console.log( 'UserService Data' );
    this.userservice.getUserData().subscribe( (resp:any) => {
      localStorage.setItem('UserData', JSON.stringify(resp) )
      this.userData = resp;

        this.diseasesFormData = this.fb.group({
          diabetes: resp.diseases.diabetes,
          hypertension: resp.diseases.epilepsy,
          heartDisease: resp.diseases.heartDisease,
          epilepsy: resp.diseases.hypertension,
          prevSurgeries: resp.diseases.prevSurgeries,
          others: resp.diseases.others
      })
    })   
  }

  hMedicalSave(){
    console.log( 'ChekBox IonChange: SUscribirse al servicio ', this.diseasesFormData.value )

    this.userservice.updateUserDataDiseases( this.diseasesFormData.value ).subscribe( resp => {
      console.log(  'Subscription to service response ===> ',  resp )
    })
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

} 
