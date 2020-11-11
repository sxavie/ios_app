import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit, ViewWillEnter {

  public myAddresses:any[] = [];
  public selectedIDAddress;

  constructor( private addressservice: AddressService,
    private router: Router ) { }

  ionViewWillEnter() {
    if( localStorage.getItem('def-address')) this.selectedIDAddress = localStorage.getItem('def-address')

    this.addressservice.getAddress().subscribe( (addresses:any) => {
      console.log( addresses )
      this.myAddresses = addresses;
    })
  }

  ngOnInit() {
  }

  changeAddress(){
    localStorage.setItem('def-address', this.selectedIDAddress);
    // this.router.navigate(['/app/farmacia/cart-checkout'])
  }

}
