import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { OtpComponent } from './core/auth/otp/otp.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AdminproductComponent } from './core/components/admin/admin-product/adminproduct.component';
import { ProductsComponent } from './core/components/public/products/products.component';
import { GuardGuard } from './core/config/interceptors/guard/guard.guard';
import { AdminComponent } from './core/layouts/admin/admin.component';
import { PublicComponent } from './core/layouts/public/public.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [GuardGuard],
    data: {
      role: 'ROLE_STAFF',
    },
    children: [{ path: 'product', component: AdminproductComponent }],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp', component: OtpComponent },
  {
    path: '**',
    component: PublicComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
