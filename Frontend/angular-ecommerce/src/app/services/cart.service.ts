import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // subject is a subclass of Observable.
  // We can use Subject to publish events in the code
  // and then this event will be sent to all subscribers



  // we changed Subject to BehaviorSubject because we need the latest updates of our totalPrice and totalQuantity
  // and Subject doesnt support that feature so that's why i changed it
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }



  addToCart (theCartItem : CartItem){

    // verifier si en a deja l'item dans notr cart
    let alreadyExistsInCart:boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length >0) {
      //chercher l'item dans la cart basé sur item id
      for (let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }
      //verifier si on le trouvé
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart){

      // incrementé quantity
      existingCartItem.quantity++;
    }
    else {

      // ajouter l'item au tableau
      this.cartItems.push(theCartItem);
    }

    // compter le total de la cart et la quantité
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue : number = 0;
    let totalQuantityValue: number =0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }


    // publishé les nouvelles valeures tous les subscribers sera recevoir le data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);


    this.logCartData(totalPriceValue, totalQuantityValue);

  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('=======');
  }

  decrementQuantity(tempCartItem: CartItem) {

    tempCartItem.quantity--;
    if (tempCartItem.quantity ===0){
      this.remove(tempCartItem);
    } else {
      this.computeCartTotals();
    }
    
  }

  public remove(theCartItem: CartItem) {

    // obtenir l'index du item dans la table

    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    // si on trouve item apartir le tableau
    if (itemIndex >-1)
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();


  }
}


