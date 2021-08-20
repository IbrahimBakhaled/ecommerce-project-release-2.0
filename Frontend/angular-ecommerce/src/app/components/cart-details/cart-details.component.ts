import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice : number =0;
  totalQuantity: number=0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    // obtenir handler au carte items
    this.cartItems = this.cartService.cartItems;


    // subscribe a la carte totolPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe a la carte totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compté la carte total price et quantité
    this.cartService.computeCartTotals();
  }

  incrementQuantity(tempCartItem: CartItem) {
    this.cartService.addToCart(tempCartItem);
  }

  decrementQuantity(tempCartItem: CartItem) {

    this.cartService.decrementQuantity(tempCartItem);
  }

 public remove(tempCartItem: CartItem) {

    this.cartService.remove(tempCartItem);
  }
}
