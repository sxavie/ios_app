import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, PickerController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.page.html',
  styleUrls: ['./farmacia.page.scss'],
})
export class FarmaciaPage implements OnInit {

  public loading;
  public showSkeleton:boolean = true;
  public avaliableData;

  public addresess:any = [];
  public addresValidation;
  public noAddresses = false;
  public defid_ ='';

  constructor( private loadingCtrl: LoadingController,
    private medicineservice: MedicineService,
    private addressservice: AddressService,
    private router: Router,
    private pickerCtrl: PickerController,
    private navCtrl: NavController,) { }

  async ngOnInit() {
    
    this.addresess =  await this.addressservice.getAddress().toPromise()
    // redirecciona a direcciones

    if( this.addresess.length === 0) {
      this.noAddresses = true;
      this.showSkeleton = false;
      // this.router.navigate(['/app'])
      return;
    }

    this.defid_ = localStorage.getItem('def-address')
    if( this.defid_ != '' ){
      
      console.log(' yes def address')
      this.addresess.forEach(x => {
        
        if(x._id === this.defid_){
          this.addresValidation = x;
          console.log( 'this is te def', this.addresValidation)
        }
      });
    }else{
      console.log(' no def address ')
      this.addresValidation = this.addresess[0];
    }

    this.getColumns(this.addresess)

    await this.avaliableService(this.addresValidation);
  
  }

  async avaliableService( address ){

    this.avaliableData = await  this.medicineservice.frmAvaliable( 
      address.latitude,
      address.longitude
    ).toPromise();

    if(this.avaliableData.service){
      this.router.navigate(['/app/farmacia/products'])
      localStorage.setItem('def-address', address._id)
    };

    this.showSkeleton = false;

  }

  async addressPicker(){
    const genPicker = await this.pickerCtrl.create({
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(v:any) => {


            if(v.address.value === '0'){ this.addAddress() } else{

              this.showSkeleton = true;
            this.addresess.forEach(addr => {
              if(addr._id === v.address.value){

                this.addresValidation = addr
                this.avaliableService(addr)
              }
            });
            

            }
          }
        }
      ],
      columns:[{
        name:'address',
        options: this.getColumns(this.addresess)
    }]

    });
    await genPicker.present();
  }

  addAddress(){
    localStorage.setItem('addaddss', '/app/farmacia');
    // this.router.navigate(['/app/farmacia/addaddress'])
    this.navCtrl.navigateBack(['/app/farmacia/addaddress'])
  }

 getColumns(columnOptions) {
    let columns = [];
    for (let i = 0; i < columnOptions.length; i++) {
      columns.push({
        text: columnOptions[i].name,
        value: columnOptions[i]._id
      });
    }
    columns.push({text: 'Nueva', value: '0'})
    return columns;
  }

  async loadingPresent(){

    this.loading = await this.loadingCtrl.create({
      spinner: 'lines-small',
      message: 'Validando disponibilidad'
    });

    await this.loading.present();
    

  }

}
