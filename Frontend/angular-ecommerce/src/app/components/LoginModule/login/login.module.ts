import {NgModule} from "@angular/core";
import {CallbackComponent} from "../callback/callback.component";
import {HomeComponent} from "../home/home.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../../auth.guard";
import {LoginComponent} from "./login.component";
import {ProductListComponent} from "../../product-list/product-list.component";
import {ProductCategoryMenuComponent} from "../../product-category-menu/product-category-menu.component";
import {SearchComponent} from "../../search/search.component";
import {ProductDetailsComponent} from "../../product-details/product-details.component";
import {CartStatusComponent} from "../../cart-status/cart-status.component";
import {CartDetailsComponent} from "../../cart-details/cart-details.component";
import {CheckoutComponent} from "../../checkout/checkout.component";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {A11yModule} from "@angular/cdk/a11y";
import {ProductService} from "../../../services/product.service";
import {AuthInterceptor} from "../../../auth.interceptor";
import {HtmlTemplateComponent} from "../../html-template/html-template.component";




const routes : Routes = [
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent}
];

@NgModule({
  imports : [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    A11yModule,
  ],
  declarations: [
    CallbackComponent,
    HomeComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    HtmlTemplateComponent
  ],
  exports: [
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent
  ],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true}],


  bootstrap: [LoginComponent]
})


export class LoginModule {
}
