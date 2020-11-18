import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, PickerController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-datosgenerales',
  templateUrl: './datosgenerales.page.html',
  styleUrls: ['./datosgenerales.page.scss'],
})
export class DatosgeneralesPage implements OnInit {


  public imgAvatar:string;
  public userData : Usuario = JSON.parse(localStorage.getItem('UserData')) || '';
  
  public username:string;
  public usergender:string;
  public userheight:string;
  public userweight:string;
  public userAge:number;
  public userblood:string;

  public edad:any;

  public edit_save:string = 'Editar' 
  public isEdit = false;
  public newBirth;


  constructor( private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private pickerCtrl: PickerController,
    private alertsservice: AlertsService,
    private loadingCtrl: LoadingController ) { }

  ngOnInit( ) {

    this.imgAvatar = localStorage.getItem('user-filename');
  
    if( localStorage.getItem('UserData') ) {
      console.log( 'LolcaStorage Data' )
      this.userData =  JSON.parse( localStorage.getItem('UserData') )
      this.username = this.userData.name;
      this.usergender = this.userData.gender;
      this.userblood = this.userData.bloodType;
      this.userweight = this.transformweight(this.userData.weight)
      this.userheight = this.transformheight(this.userData.height)

      if(this.userData.birthday === null ){
        this.edad = '0 años';
      }else{
        this.userAge = this.calcularEdad(this.userData.birthday)
        this.edad = this.userAge+' años';
      }
    }else{ 
      console.log( 'UserService Data' );
      this.userservice.getUserData().subscribe( (resp:any) => {
        localStorage.setItem('UserData', JSON.stringify(resp) )
        this.userData = resp;
        this.username  = this.userData.name;
        this.usergender = this.userData.gender;
        this.userblood = this.userData.bloodType;
        this.userweight = this.transformweight(this.userData.weight)
        this.userheight = this.transformheight(this.userData.height)
        console.log( this.userData.birthday )
        if( this.userData.birthday === null ){
          this.edad = '0 años';
        }else{
          this.userAge = this.calcularEdad(this.userData.birthday)
          this.edad = this.userAge+' años';
        }
      })   
    }
  }

  calcularEdad(fecha = this.userData.birthday ) {

    if(fecha === undefined){
      return 0 ;
    }

    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }
  
  async genderPick(){
    const genPicker = await this.pickerCtrl.create({
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(v:any) => {
            this.usergender = v.Genero.value;
          }
        }
      ],
      columns:[{
        name:'Genero',
        options:[
          { text: 'Masculino', value: 'Masculino'},
          { text: 'Femenino', value: 'Femenino'}
      ]
      }]
    });
    await genPicker.present();
  }

  async bloodPick(){
    const bloodPick = await this.pickerCtrl.create({
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      },{
        text: 'OK',
        handler:(v:any) => {
          this.userblood = v.Peso.value;
        }
      }],
      columns: [{
        name: 'Peso',
        options:[
          { text: 'A+', value: 'A+'},
          { text: 'A-', value: 'A-'},
          { text: 'B+', value: 'B+'},
          { text: 'B-', value: 'B-'},
          { text: 'AB+', value: 'AB+'},
          { text: 'AB-', value: 'AB-'},
          { text: 'O+', value: 'O+'},
          { text: 'O-', value: 'O-'},
        ]
      }]
    });

    await bloodPick.present();
  }

  async edit(){ 

    if( !this.isEdit ){
      this.edit_save = 'Guardar'

      this.userheight = this.userData.height
      this.userweight = this.userData.weight
      this.newBirth = this.userData.birthday === null ? new Date : this.userData.birthday

    }else{

  
      let loader = await this.loadingCtrl.create({
        spinner: 'lines-small'
      });

      await loader.present();


      let body = { 
        birthday: this.newBirth,
        gender: this.usergender,
        height: this.userheight,
        weight: this.userweight,
        bloodType: this.userblood,
       }

       this.userservice.updateUserData( this.userData._id, body ).subscribe( resp => { 

          this.edad = this.calcularEdad(this.newBirth)
          this.edad = this.edad + ' años'
          this.userheight = this.transformheight(this.userheight)
          this.userweight = this.transformweight(this.userweight)

          loader.dismiss();

          this.alertsservice.nativeToast('Se actualizo la informacion del usuario')

        })
        
      this.edit_save = "Editar"
    }

    this.isEdit = !this.isEdit
  }

  goHome(){
    this.router.navigate(['/app/home'])
  }

  transformweight( x = '0' ){
    if(x === null) x = '0'
    return x + ' Kg'
  }
  transformheight( x = '0' ){
    if(x === null) x = '0'
    return x + ' Mts'
  }

}
