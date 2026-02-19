import { Routes } from '@angular/router';
import { Blank } from './Layout/blank/blank';
import { Auth } from './Layout/auth/auth';
import { authGuard } from './Core/Guards/Auth/auth-guard';
import { Home } from './Pages/home/home';
import { loggedGuard } from './Core/Guards/logged/logged-guard';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
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
    ],
  },
  {
    path: '',
    component: Blank,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: Home,
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
        path: 'brands',
        loadComponent: () => import('./Pages/brands/brands').then((m) => m.Brands),
        title: 'Nexo - Brands',
      },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () => import('./Pages/wish-list/wish-list').then((m) => m.WishList),
        title: 'Nexo - Wishlist',
      },
      {
        path: '**',
        loadComponent: () => import('./Pages/notfound/notfound').then((m) => m.Notfound),
        title: 'Nexo - Not Found',
      },
    ],
  },
];
