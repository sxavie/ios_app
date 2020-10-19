import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PayMethodsService } from 'src/app/services/paymethods.service';

@Component({
  selector: 'app-agregarpago',
  templateUrl: './agregarpago.page.html',
  styleUrls: ['./agregarpago.page.scss'],
})
export class AgregarpagoPage implements OnInit {


  public cardNumber:string;
  public cardDetail:string;
  public cardCVV: string;

  public cardFormData = this.fb.group({
    number: "",
    month: "",
    year: "",
    cvv: "",
    user: "",
})

  constructor( private fb: FormBuilder,
    private payservice: PayMethodsService ) { }

  ngOnInit( ) {
  }


  cardValidation(){

    // validar los campos
    console.log( ' cardNumber ', this.cardNumber )
    console.log( ' cardDetail ', this.cardDetail )
    console.log( ' cardCVV ', this.cardCVV )

    // send la data correcta

    let mes = this.cardDetail.substring(0,2);
    let ano = this.cardDetail.substring(2,4)
    
    this.cardFormData = this.fb.group({
      number: this.cardNumber,
      month: mes,
      year: ano,
      cvv: this.cardCVV,
      user: localStorage.getItem('user-id')
  })
    
    this.addPaymentMethod( this.cardFormData.value )

  }

  addPaymentMethod( data ){

    this.payservice.addPayMethod(data).subscribe( resp => {
      console.log( "AgregarpagoPage service.addPayMethod() subscription response " , resp )
    })
    
  }

  // masking( ){

  //   console.log( "hola mundo" )

  //   this.cardNumber = this.cardNumber.replace(/\d{12}(\d{4})/, "XXXXXXXXXXXX$1");
  
  // }



}
