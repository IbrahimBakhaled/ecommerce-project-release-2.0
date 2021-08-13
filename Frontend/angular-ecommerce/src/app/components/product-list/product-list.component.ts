import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',

  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  // proprreties pour la pagination
  thePageNumber: number = 1;
  thePageSize: number = 15;
  theTotalElements: number = 0;


  previousKeyword!: string;


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }


  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // si en a different keyword de precedent en va mettre thepageNumber a 1

    if (this.previousKeyword != theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePAgeNumber=${this.thePageNumber}`);






    // chercher le produit à travers clé "keyword"
    this.productService.searchProductsPaginate(this.thePageNumber -1, this.thePageSize, theKeyword).subscribe(this.processResult())
  }

  handleListProducts() {
    // verifier si "id" est valable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');


    if (hasCategoryId) {
      // prendre l'id comme param string est le converté "string" a "number" avec "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // l'id est pas valable en va affecté la valeur par defaut est 1
      this.currentCategoryId = 1;
    }


    // verifier si en a un different categorie
    // note: angular sera utilisé le component si il est actuelllement verifier
    // si en a differnetn categorie id de la precent alors definer le a 1 (thePageNumber = 1)
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // get products
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());

  }

   public processResult() {
    return data => {
      this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  addToCart(tempProduct: Product) {

    console.log(`Adding to cart: ${tempProduct.name}, ${tempProduct.unitPrice}`);

    const theCartItem = new CartItem(tempProduct);

    this.cartService.addToCart(theCartItem);
    
  }
}
