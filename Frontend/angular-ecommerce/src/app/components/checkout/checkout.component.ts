import {Component, OnInit, ɵConsole} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppylandFormService} from "../../services/shoppyland-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {ShoppylandValidators} from "../../validators/shoppyland-validators";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router, RouterModule} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";

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
              private shoppylandFormService : ShoppylandFormService,
              private cartService : CartService,
              private checkoutService : CheckoutService,
              private router : Router) { }

  ngOnInit(): void {
    this.reviewCartDetails();



    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
        lastName : new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
        email: new FormControl('',
                                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), ShoppylandValidators.notOnlyWhitespace]),
      }),
    shippingAddress: this.formBuilder.group({
      street:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
      city:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
      state:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      zipCode:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace])

    }),
      billingAddress: this.formBuilder.group({
        street:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
        city:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
        state:new FormControl('', [Validators.required]),
        country:new FormControl('', [Validators.required]),
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace])


      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShoppylandValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
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
    // console.log("you clicked on submit button");
    // console.log(this.checkoutFormGroup.get('customer')!.value);
    // console.log("the Email address is " + this.checkoutFormGroup.get('customer')!.value.email);



    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }


    // configurer l'ordre
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // obtenir cart items
    const cartItems = this.cartService.cartItems;

    // cree orderItem apartir de cartItems
          // converter cartItems vers OrderItems
    let orderItems : OrderItem[] = [];
    for (let i=0; i<cartItems.length; i++){
      orderItems[i] = new OrderItem(cartItems[i]);
    }

    // configurer purchase
    let purchase = new Purchase();

    // configurer purchase / customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    //configurer purchase / shippingAddress
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;
    //configurer purchase // billingAddress
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState : State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry : Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;
    //configurer order / orderItels
    purchase.order = order;
    purchase.orderItems = orderItems;
    // finallement appelé REST API apartir CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response =>{
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    )
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
  private reviewCartDetails() {
     // abonné a cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    //abonné a cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }


  // les getterus pour les validation du form
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName'); }
  get email(){ return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city'); }

  get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressState(){ return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city'); }

  get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode'); }


  private resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset form
    this.checkoutFormGroup.reset();
    //navigate back to product list
    this.router.navigateByUrl("/products");
  }
}
