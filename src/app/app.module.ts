import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './core/layouts/admin/admin.component';
import { AdminproductComponent } from './core/components/admin/admin-product/adminproduct.component';

import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './core/layouts/public/public.component';
import { ProductComponent } from './core/components/public/product/product.component';
import { OtpComponent } from './core/auth/otp/otp.component';
import { RegisterComponent } from './core/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminproductComponent,
    LoginComponent,
    HomeComponent,
    PublicComponent,
    ProductComponent,
    OtpComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
