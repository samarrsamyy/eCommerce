import { Routes } from '@angular/router';
import { authGuardsGuard } from './core/guards/auth.guards.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';

export const routes: Routes = [
  {
    path: '' , canActivate:[loggedGuard],component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent:()=> import('./components/login/login.component').then(c=>c.LoginComponent)},
      { path: 'register',  loadComponent:()=> import('./components/register/register.component').then(c=>c.RegisterComponent)},
      { path: 'forgetPassword',  loadComponent:()=> import('./components/forget-password/forget-password.component').then(c=>c.ForgetPasswordComponent) }
    ],
  },
  {
    path: '' ,canActivate:[authGuardsGuard] , 
    component: BlankComponent,
    children: [
      {path:'' , redirectTo:'home' , pathMatch:'full'},
      { path: 'home', loadComponent:()=> import('./components/home/home.component').then(c=>c.HomeComponent) },
      { path: 'product',loadComponent:()=> import('./components/product/product.component').then(c=>c.ProductComponent) },
      { path: 'cart', loadComponent:()=> import('./components/cart/cart.component').then(c=>c.CartComponent) },
      { path: 'category',loadComponent:()=> import('./components/categories/categories.component').then(c=>c.CategoriesComponent)},
      { path: 'brands', loadComponent:()=> import('./components/brands/brands.component').then(c=>c.BrandsComponent) },
      { path: 'details/:id', loadComponent:()=> import('./components/details/details.component').then(c=>c.DetailsComponent) },
      { path: 'payment/:id',loadComponent:()=> import('./components/payment/payment.component').then(c=>c.PaymentComponent) },
      { path: 'cashPayment/:id', loadComponent:()=> import('./components/cash-payment/cash-payment.component').then(c=>c.CashPaymentComponent)},
      { path: 'allorders',loadComponent:()=> import('./components/allorders/allorders.component').then(c=>c.AllordersComponent)},
      { path: 'creditPayment/:id', loadComponent:()=> import('./components/credit-payment/credit-payment.component').then(c=>c.CreditPaymentComponent)},
      { path: 'wishList', loadComponent:()=> import('./components/wish-list/wish-list.component').then(c=>c.WishListComponent)}

    ],
  },
  { path: '**', loadComponent:()=> import('./components/not-found/not-found.component').then(c=>c.NotFoundComponent) },
];
