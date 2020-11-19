import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {

  public from = localStorage.getItem('addaddss');
  public formAddressData = this.fb.group({
      name: '' ,
      street: '',
      number:'',
      neighborhood:'',
      state:'',
      city:'',
      country:"Mexico",
      zipcode:'',
      references:'',
      latitude: '',
      longitude: '',
      clientId:''
  });

  public home;
  public autocomplete;
  public loader;

  constructor( private fb: FormBuilder,
    private addressservice: AddressService,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.googleAutocompletefield();
  }


  googleAutocompletefield(){

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(25.705171,  -100.335615),
      new google.maps.LatLng(25.704157, -100.342403)
    )

    var input:any = document.getElementById('autoCompleteField');
    var options = {
      bounds: defaultBounds,
      types: ['geocode']
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.autocomplete.addListener('place_changed', resp => {
      this.getPlace();
    })

    

    console.log(  )

  }

  getPlace(){

      this.formAddressData.patchValue({street: ''});
      this.formAddressData.patchValue({number:''});
      this.formAddressData.patchValue({neighborhood:''});
      this.formAddressData.patchValue({state:''});
      this.formAddressData.patchValue({city:''});
      this.formAddressData.patchValue({country: ''});
      this.formAddressData.patchValue({zipcode:''});
      this.formAddressData.patchValue({latitude: ''});
      this.formAddressData.patchValue({longitude: ''});

    let place = this.autocomplete.getPlace()

    this.formAddressData.patchValue({latitude :  place.geometry.location.lat()})
    this.formAddressData.patchValue({longitude : place.geometry.location.lng()}) 

    console.log( place.address_components )

    place.address_components.forEach( x => {

      

      switch(x.types[0]) { 
        case 'street_number': { 
          this.formAddressData.patchValue({number : x.long_name});
          break; 
        }
        case 'route': { 
          console.log( x.long_name )
          this.formAddressData.patchValue({street : x.long_name});
          break; 
        }
        case 'sublocality_level_1': { 
          this.formAddressData.patchValue({neighborhood : x.long_name});
          break; 
        } 
        case 'locality': { 
          this.formAddressData.patchValue({city : x.long_name});
          break; 
        } 
        case 'administrative_area_level_1': { 
          this.formAddressData.patchValue({state : x.long_name});
          break; 
        } 
        case 'country': { 
          this.formAddressData.patchValue({country : x.long_name});
          break; 
        } 
        case 'postal_code': { 
          this.formAddressData.patchValue({zipcode: x.long_name});
          break; 
        } 



      } 
   })

  }

  onAddAddress( ){

    this.loaderPresent();
    
    let id = localStorage.getItem('user-id')
    this.formAddressData.patchValue({clientId : id});
   

    this.addressservice.addAddress(  this.formAddressData.value )
      .subscribe( (newAddress:any) =>{

        

        this.formAddressData.patchValue({name:''})
        this.formAddressData.patchValue({street:''})
        this.formAddressData.patchValue({number:''})
        this.formAddressData.patchValue({neighborhood:''})
        this.formAddressData.patchValue({state:''})
        this.formAddressData.patchValue({city:''})
        this.formAddressData.patchValue({country:''})
        this.formAddressData.patchValue({zipcode:''})
        this.formAddressData.patchValue({references:''})
        this.formAddressData.patchValue({latitude:''})
        this.formAddressData.patchValue({longitude:''})
        this.formAddressData.patchValue({clientId:''})

        localStorage.setItem('def-address', newAddress.data._id)

        var input:any = document.getElementById('autoCompleteField');
        input.value = '';


        setTimeout(() => {
          localStorage.removeItem('addaddss');
          this.router.navigate([this.from]);
          this.loader.dismiss();
            
        }, 1500);
        
      })
  }

  async loaderPresent(){

    this.loader = await this.loadingCtrl.create({
      spinner: 'lines-small',
      message: 'Espere un momento'
    })
    await this.loader.present();

  }


}
