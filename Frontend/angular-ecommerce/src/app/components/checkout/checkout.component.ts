import {Component, OnInit, ɵConsole} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShoppylandFormService} from "../../services/shoppyland-form.service";

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

}
