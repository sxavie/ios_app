import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import {} from 'googlemaps';

// declare var google;

/// <reference types="googlemaps" />

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 
export class HomePage implements OnInit {


  @ViewChild('map') public mapElement: any
  map: google.maps.Map;


  userData: any;
  public imgAvatar;


  constructor(  private menuCtrl: MenuController,
    public router: Router,
    public menuData: MenuDataService,
    public userservice: UserserviceService, 
    ) {


    }
      
  ngOnInit(): void {

    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.ElementRef, mapProperties);
    

  }
      
  toggleMenu(){
    // this.menuCtrl.toggle(this.nameMenuId);
    this.menuCtrl.toggle('tdxMenu');
  }
  
  irA(pagex: string) {
    
    // console.log(pagex);
    
    switch( pagex ){
      case 'Consultas': {
        this.router.navigate(['app/consultas']);
        break;
      }
      case 'Resacas': {
        this.router.navigate(['app/resacas'])
        break
      }
      case 'Farmaica': {
        this.router.navigate(['app/farmacia'])
        break
      }
      case 'Lab': {
        this.router.navigate(['app/labs'])
        break
      }
    }

  }

  loadMap(){


    


      const center: google.maps.LatLngLiteral = {lat: 51.678418, lng: 7.809007};
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 14,
        center: center,
        disableDefaultUI: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
      });


    
 
    return this.map;
    
  }

  ionViewDidLoad(){

    // this.loadMap();

  }

}
