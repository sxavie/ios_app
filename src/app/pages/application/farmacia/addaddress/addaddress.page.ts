import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {

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

  constructor( private fb: FormBuilder,
    private addressservice: AddressService,
    private router: Router,
    private navCtrl: NavController) { }

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
    
    let id = localStorage.getItem('user-id')
    this.formAddressData.patchValue({clientId : id});
   
    // this.addressservice.addAddress(  this.formAddressData.value )
    //   .subscribe( () =>{

    //     this.formAddressData.value.name='';
    //     this.formAddressData.value.street='';
    //     this.formAddressData.value.number='';
    //     this.formAddressData.value.neighborhood='';
    //     this.formAddressData.value.state='';
    //     this.formAddressData.value.city='';
    //     this.formAddressData.value.country='';
    //     this.formAddressData.value.zipcode='';
    //     this.formAddressData.value.references='';
    //     this.formAddressData.value.latitude='';
    //     this.formAddressData.value.longitude='';
    //     this.formAddressData.value.clientId='';

        this.navCtrl.back();             
        
    //   })
  


  }

}
