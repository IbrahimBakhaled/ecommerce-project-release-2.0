import {Component, OnInit, ɵConsole} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShoppylandFormService} from "../../services/shoppyland-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup : FormGroup;

  totalPrice : number =0;
  totalQuantity: number =0;


  creditCardYears : number[] = [];
  creditCardMonths : number[] = [];



  countries: Country[] = [];
  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  constructor(public formBuilder: FormBuilder,
              private shoppylandFormService : ShoppylandFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName : [''],
        email:['']
      }),
    shippingAddress: this.formBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']

    }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']

      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']

      }),
    });

     const startMonth : number = new Date().getMonth() +1;
     console.log('startMonth: ' + startMonth);

     this.shoppylandFormService.getCreditCardMonths(startMonth).subscribe(
       data => {
         console.log("Retrieved credit card months: " + JSON.stringify(data));
       this.creditCardMonths = data;
       }
     );


     this.shoppylandFormService.getCountries().subscribe(
       data => {
         console.log("Retrieved countries: " + JSON.stringify(data));
         this.countries = data;
       }
     );


     this.shoppylandFormService.getCreditCardYears().subscribe(
       data =>{
         console.log("Retrieved credit card years: " + JSON.stringify(data));
         this.creditCardYears = data;
       }
     );

  }




  onSubmit(){
    console.log("you clicked on submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("the Email address is " + this.checkoutFormGroup.get('customer')!.value.email);
  }


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup!.value.expirationYear);


    // si l'annee actuel egale selected year alors commencé avec le mois actuell

    let startMonth : number;

    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else {
      startMonth = 1;
    }

    this.shoppylandFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card month:" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`);
    console.log(`${formGroupName} country name : ${countryName}`);

    this.shoppylandFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        // selecte le premier state par defaut
        formGroup!.get('state')!.setValue(data[0]);
      }
    );
  }
}
