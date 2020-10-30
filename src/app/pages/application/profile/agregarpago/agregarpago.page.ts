import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PayMethodsService } from 'src/app/services/paymethods.service';

@Component({
  selector: 'app-agregarpago',
  templateUrl: './agregarpago.page.html',
  styleUrls: ['./agregarpago.page.scss'],
})
export class AgregarpagoPage implements OnInit {

  public imgAvatar = localStorage.getItem('user-filename')

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
    // console.log( ' cardNumber ', this.cardNumber )
    // console.log( ' cardDetail ', this.cardDetail )
    // console.log( ' cardCVV ', this.cardCVV )

    // send la data correcta
   
    let cardDet = this.cardDetail.split('/');

    this.cardFormData = this.fb.group({
      number: this.cardNumber.replace(/\s/g, ''),
      month: cardDet[0],
      year: cardDet[1],
      cvv: this.cardCVV,
      user: localStorage.getItem('user-id')
  })
    
    this.addPaymentMethod( this.cardFormData.value )

  }

  addPaymentMethod( data ){

    console.log(data)

    this.payservice.addPayMethod(data).subscribe( resp => {
      console.log( "AgregarpagoPage service.addPayMethod() subscription response " , resp )
    })
    
  }

  mask(event){
    setTimeout(() => {
      var inputTxt = event.srcElement.value;
      inputTxt = inputTxt ? inputTxt.split(" ").join("") : "";
      inputTxt = inputTxt.length > 16 ? inputTxt.substring(0, 16) : inputTxt;
      this.cardNumber = this.maskString(inputTxt);
    }, 500);
  }
    
  maskString(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, "");
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, "$1 $2");
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, "$1 $2");
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, "$1 $2");
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, "$1 $2");
    return inputTxt;
  }

  day_month() {
    let v = this.cardDetail
    v = v.replace(/^(\d{2})(\d)/, '$1/$2'); //Insert a dot between the second and third digits
    this.cardDetail = v
  }





}
