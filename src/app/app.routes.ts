import { Routes } from '@angular/router';
import { Blank } from './Layout/blank/blank';
import { Auth } from './Layout/auth/auth';
import { authGuard } from './Core/Guards/Auth/auth-guard';

import { loggedGuard } from './Core/Guards/logged/logged-guard';
import { Checkout } from './Pages/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: Auth,
    canActivate: [loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./Core/auth/login/login').then((m) => m.Login),
        title: 'Nexo-Login',
      },
      {
        path: 'register',
        loadComponent: () => import('./Core/auth/register/register').then((m) => m.Register),
        title: 'Nexo-Register',
      },
      {
        path: 'forgot',
        loadComponent: () => import('./Core/auth/forgot/forgot').then((m) => m.Forgot),
        title: 'Nexo-Forgot Password',
      },
    ],
  },
  {
    path: '',
    component: Blank,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./Pages/home/home').then((m) => m.Home),
        title: 'Nexo - Home',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () => import('./Pages/details/details').then((m) => m.Details),
        title: 'Nexo - About Prdouct',
      },
      {
        path: 'cart',
        loadComponent: () => import('./Pages/cart/cart').then((m) => m.Cart),
        title: 'Nexo - Cart',
      },
      {
        path: 'categories',
        loadComponent: () => import('./Pages/categories/categories').then((m) => m.Categories),
        title: 'Nexo - Categories',
      },
      {
        path: 'allorders',
        loadComponent: () => import('./Pages/order/order').then((m) => m.Order),
        title: 'Nexo - Order',
      },
      {
        path: 'brands',
        loadComponent: () => import('./Pages/brands/brands').then((m) => m.Brands),
        title: 'Nexo - Brands',
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./Pages/wish-list/wish-list').then((m) => m.WishList),
        title: 'Nexo - Wishlist',
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./Pages/spec-products/spec-products').then((m) => m.SpecProducts),
        title: 'Nexo - Products',
      },
      {
        path: 'setting',
        loadComponent: () => import('./Pages/setting/setting/setting').then((m) => m.Setting),
        title: 'Nexo - Setting',
      },
      {
        path: 'check/:id',
        loadComponent: () => import('./Pages/checkout/checkout').then((m) => m.Checkout),
        title: 'Nexo - Checkout',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./Pages/notfound/notfound').then((m) => m.Notfound),
    title: 'Nexo - Not Found',
  },
];
