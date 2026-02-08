import { Routes } from '@angular/router';
import { Auth } from './Layout/auth/auth';
import { Blank } from './Layout/blank/blank';
import { Home } from './Pages/home/home';
import { Details } from './Pages/details/details';
import { Cart } from './Pages/cart/cart';
import { Login } from './Core/auth/login/login';
import { Register } from './Core/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: Blank,
    children: [
      { path: 'home', component: Home, title: 'Nexo - Home' },
      { path: 'details', component: Details, title: 'Nexo - About Prdouct' },
      { path: 'cart', component: Cart, title: 'Nexo - Cart' },
    ],
  },
  {
    path: '',
    component: Auth,
    children: [
      { path: 'login', component: Login, title: 'Nexo-Login' },
      { path: 'register', component: Register, title: 'Nexo-Register' },
    ],
  },
];
