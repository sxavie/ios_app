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
  public userData: Usuario[] = [];
  public diseases: any[] = [];

  public diseasesFormData = this.fb.group({
      diabetes: [  ],
      hypertension: [ ],
      heartDisease: [ ],
      epilepsy: [  ],
      prevSurgeries: [  ],
      others: [  ]
  })
  
  constructor( private router: Router,
    private userservice: UserserviceService,
    private fb: FormBuilder) { }
  
  ngOnInit() {
    
    console.log( 'UserService Data' );
    this.userservice.getUserData().subscribe( (resp:any) => {
      localStorage.setItem('UserData', JSON.stringify(resp) )
      this.userData = resp;
      this.diseasesFormData.controls['diabetes'].setValue(resp.diseases.diabetes)
      this.diseasesFormData.controls['epilepsy'].setValue(resp.diseases.epilepsy)
      this.diseasesFormData.controls['heartDisease'].setValue(resp.diseases.heartDisease)
      this.diseasesFormData.controls['hypertension'].setValue(resp.diseases.hypertension)
      this.diseasesFormData.controls['prevSurgeries'].setValue(resp.diseases.prevSurgeries)
      this.diseasesFormData.controls['others'].setValue(resp.diseases.others)
    })   
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

} 
