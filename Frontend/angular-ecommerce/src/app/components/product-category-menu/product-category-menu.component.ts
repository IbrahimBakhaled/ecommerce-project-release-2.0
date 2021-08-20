import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {



  productCategories! : ProductCategory[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

   listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
<<<<<<< HEAD
        // console.log('Product Categories=' + JSON.stringify(data));
=======
        console.log('Product Categories=' + JSON.stringify(data));
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
        this.productCategories=data;
      }
    );
    }
  }

