import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { OtpComponent } from './core/auth/otp/otp.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AdminproductComponent } from './core/components/admin/admin-product/adminproduct.component';
import { ProductComponent } from './core/components/public/product/product.component';
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
      { path: 'product', component: ProductComponent },
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
