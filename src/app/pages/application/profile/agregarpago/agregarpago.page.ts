import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { PayMethodsService } from 'src/app/services/paymethods.service';
import { UserserviceService } from 'src/app/services/userservice.service';

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
    number: ["", Validators.required],
    month: ["", Validators.required],
    year: ["", Validators.required],
    cvv: ["",Validators.required],
    user: "",
})

  constructor( private fb: FormBuilder,
    private payservice: PayMethodsService,
    private userservice: UserserviceService,
    private alertsservice: AlertsService ) { }

  ngOnInit( ) { }


  cardValidation(){

    
    let frmOK = this.fieldsValidation();

    if( frmOK != 'OK'){
      this.alertsservice.nativeToast( frmOK )
      return
    }
   
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

  fieldsValidation(){

    if(!this.cardNumber) { 
      return 'Introduzca el number de la tarjeta'
    } else { 
      if( this.cardNumber.length < 16 ) {
        return 'Introduzca el numero de tarjeta valido'
      }
    }
    if(!this.cardDetail) { 
      return 'Introduzca el mes y año de expiracion de la tarjeta'
    } else {
      if(this.cardDetail.length < 5) { return 'Introduzca fecha de expiracion valida'}
    }
    if(!this.cardCVV)
      { return 'Introduzca el codigo de seguridad de la tarjeta'
    } else { 
      if(this.cardCVV.length != 3) {
        return 'El numero de seguridad no es valido'
      }
    }

    return 'OK'
  }

  addPaymentMethod( data ){

    console.log(data)

    this.payservice.addPayMethod(data).subscribe( () =>{}, err =>{ console.log( err )})
    
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
