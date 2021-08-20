import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { ProductListComponent } from './components/product-list/product-list.component';
import {Routes, RouterModule} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {A11yModule} from "@angular/cdk/a11y";
<<<<<<< HEAD
import { CallbackComponent } from './components/LoginModule/callback/callback.component';
import { HomeComponent } from './components/LoginModule/home/home.component';
import {LoginModule} from "./components/LoginModule/login/login.module";
import {LoginComponent} from "./components/LoginModule/login/login.component";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth.guard";
import { HtmlTemplateComponent } from './components/html-template/html-template.component';
=======
import {LoginComponent} from "./components/login/login.component";
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from "./auth.guard";
import {AuthInterceptor} from "./auth.interceptor";
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71



const routes : Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
<<<<<<< HEAD
  {path: '',redirectTo: '/login', pathMatch:'full'},
  {path: '**', redirectTo: '/login', pathMatch:'full'},
  // {path: 'checkout', component: CheckoutComponent},
  // {path: 'cart-details', component: CartDetailsComponent},
  // {path: 'products/:id', component: ProductDetailsComponent},
  // {path: 'search/:keyword', component: ProductListComponent},
  // {path: 'category/:id', component: ProductListComponent, canActivate: [AuthGuard]},
  // {path: 'category', component: ProductListComponent, canActivate: [AuthGuard]},
  // {path: 'products', component: ProductListComponent}
=======
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '',redirectTo: '/products', pathMatch:'full'},
  {path: '**', redirectTo: '/products', pathMatch:'full'},

>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
];


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent,
    // HtmlTemplateComponent
=======
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    CallbackComponent,
    HomeComponent,

>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    A11yModule,
    LoginModule
  ],
  providers:  [
    ProductService,
    {provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true}
  ],
=======
    A11yModule
  ],
  providers: [ProductService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
      multi: true


  }
  ],

>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
  bootstrap: [AppComponent]
})
export class AppModule { }

