import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './core/layouts/admin/admin.component';
import { AdminproductComponent } from './core/components/admin/admin-product/adminproduct.component';

import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './core/layouts/public/public.component';
import {ProductsComponent } from './core/components/public/products/products.component';
import { OtpComponent } from './core/auth/otp/otp.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductdetailComponent } from './core/components/public/productdetail/productdetail.component';
import { CartComponent } from './core/components/public/cart/cart.component';
import { OrderstatusComponent } from './core/components/public/orderstatus/orderstatus.component';
import { OrdernormalComponent } from './core/components/public/ordernormal/ordernormal.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminproductComponent,
    LoginComponent,
    HomeComponent,
    PublicComponent,
    OtpComponent,
    RegisterComponent,
    ProductsComponent,
    ProductdetailComponent,
    CartComponent,
    OrderstatusComponent,
    OrdernormalComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
