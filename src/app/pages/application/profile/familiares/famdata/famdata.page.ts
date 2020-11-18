import { Component, OnInit } from '@angular/core';
import { LoadingController, PickerController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-famdata',
  templateUrl: './famdata.page.html',
  styleUrls: ['./famdata.page.scss'],
})
export class FamdataPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename');

  public memberData;
  public hrefBack;

  public isEdit = false;
  public edit_save = 'Editar';
  
  public name;
  public relationship;
  public imgSrc;
  public noImg = 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png';

  public newBirth;
  public edad;
  
  public usergender = 'Seleccione';
  public userweight = '00';
  public userheight = '0.00';
  public userblood = 'Seleccione';

  constructor( public pickerCtrl: PickerController, 
    public userservice: UserserviceService,
    private alertsservice: AlertsService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.memberData =  JSON.parse(localStorage.getItem('member-view'))
    this.hrefBack = `app/familaires/familiar/${this.memberData._id}`
    this.relationship =  this.memberData.relationship
    this.name =  this.memberData.name
    
    this.imgSrc = this.memberData.filename === null ? this.noImg : this.userservice.transformFamilyFilename(this.memberData.filename)
    this.userweight = this.memberData.weight === null ? '0 Kg': this.memberData.weight;
    this.userheight = this.memberData.height === null ? '0.00 Mts': this.memberData.height;
    this.usergender = this.memberData.gender === null ? 'Seleccionar':this.memberData.gender;
    this.userblood = this.memberData.bloodType === null || this.memberData.bloodType === undefined ? 'Seleccionar' : this.memberData.bloodType
    this.edad = this.memberData.birthday === null ? '0 años' : `${this.calcularEdad(this.newBirth)} años`
  }

  async edit(){ 

    if( !this.isEdit ) {

      this.userheight = this.memberData.height === null || this.memberData.height === undefined ? '0' : this.memberData.height;
      this.userweight = this.memberData.weight === null || this.memberData.weight === undefined ? '0' : this.memberData.weight

      this.edit_save = 'Guardar';
    } else {

      const loader = await this.loadingCtrl.create({
        spinner: 'lines-small'
      })

      await loader.present();

      
      let body = { 
        birthday: this.newBirth,
        gender: this.usergender,
        height: this.userheight,
        weight: this.userweight,
        bloodType: this.userblood,
      }

      await this.userservice.updateUserData( this.memberData._id, body ).subscribe( resp => {
        
        this.edad = this.calcularEdad( this.newBirth )
        this.edad = `${this.edad} años`
        this.userheight = this.transformheight(this.userheight)
        this.userweight = this.transformweight(this.userweight)
 
        this.alertsservice.nativeToast('Se actualizo la informacion del usuario')

        this.userservice.getUserData().subscribe( () => {

          let familiarList = JSON.parse(localStorage.getItem('UserData'))

          familiarList.family.forEach(member => {
      
          if( this.memberData._id === member._id ){
              this.memberData = member;
              localStorage.setItem('member-view', JSON.stringify(member))
            }
          });
        })
      })

      await loader.dismiss();
      this.edit_save = 'Editar'
    }


    this.isEdit = !this.isEdit
  }

  calcularEdad(fecha = this.memberData.birthday ) {

    if(fecha === undefined) return 0;
    
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }
  transformweight( x = '0' ){
    if(x === null) x = '0'
    return x + ' Kg'
  }
  transformheight( x = '0' ){
    if(x === null) x = '0'
    return x + ' Mts'
  }
  async genderPick(){
    const genPicker = await this.pickerCtrl.create({
      buttons: [
        {
          text: "Cancelar",
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

}
