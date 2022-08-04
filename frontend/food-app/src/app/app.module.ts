import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodService } from './services/food.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { from } from 'rxjs';

import {Routes, RouterModule} from '@angular/router';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { SearchComponent } from './components/search/search.component';

import { DetailComponent } from './components/detail/detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartService } from './services/CartService';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

import {CheckoutComponent} from './components/checkout/checkout.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { EmployeePortalComponent } from './components/employee-portal/employee-portal.component';
import { OwnerPortalComponent } from './components/owner-portal/owner-portal.component';
import {Chart} from 'node_modules/chart.js';
import { NgChartsModule } from 'ng2-charts';



const routes: Routes = [
  // PATH TO MATCH and when path matches create new instance of the component 
 
  {path:'user-portal',component: UserPortalComponent},
  {path:'employee-portal',component:EmployeePortalComponent},
  {path:'owner-portal', component:OwnerPortalComponent},
  {path:'login', component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path:'food/:id', component: DetailComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'search/:keyword', component: FoodListComponent },
{path: 'category/:id', component: FoodListComponent},
{path: 'category', component: FoodListComponent},
{path: '', redirectTo:'', pathMatch:"full", component: FoodListComponent},
// this is one exception 
{path:'**', redirectTo:'',pathMatch:'full', component: FoodListComponent},
// this is a generic wildcard will match on anything that did not match above routes 

];
// the order of routes are important 

@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    NavbarComponent,
    FooterComponent,
    DetailComponent,
    CategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    SignupComponent,
    LoginComponent,
    UserPortalComponent,
    EmployeePortalComponent,
    OwnerPortalComponent
 
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [FoodService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
