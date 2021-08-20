import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';



  constructor(private httpClient:HttpClient) { }







  public getProductList(theCategoryId : number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }






  public getProductListPaginate(thePage: number,
                                thePageSize: number,
                                theCategoryId : number): Observable<GetResponseProducts>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }









  public getProductCategories() : Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }








  public searchProducts(theKeyword: string) :Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }








  public searchProductsPaginate(thePage: number,
                                thePageSize: number,
                                theKeyword : string): Observable<GetResponseProducts>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }









  getProduct(theProductId: number):Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }






}


interface GetResponseProducts {
  _embedded :{
    products: Product[];
  },
  // we added these lines (page: size,totalelements,totalpages,number) because before adding them spring data rest by default
  // gives us a responses with thees parameters in last lines http://localhost:8080/api/products?page=0&size=500
  page:{
    size: number,
    totalElements : number,
    totalPages: number,
    number: number
  }

}

interface GetResponseProductCategory {
  _embedded :{
    productCategory: ProductCategory[];
  }

}
