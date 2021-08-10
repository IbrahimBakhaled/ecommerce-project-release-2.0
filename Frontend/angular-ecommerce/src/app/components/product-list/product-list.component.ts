import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',

  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products! : Product[];
  currentCategoryId! : number;


  constructor(private productService : ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listProducts();
    });

  }


  listProducts(){

    // verifier si "id" est valable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');


    if (hasCategoryId){
      // prendre l'id comme param string est le converté "string" a "number" avec "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // l'id est pas valable en va affecté la valeur par defaut est 1
      this.currentCategoryId = 1;
    }


    // get products

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
