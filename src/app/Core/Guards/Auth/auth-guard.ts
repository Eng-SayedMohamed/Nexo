import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  let cook = inject(CookieService);
  let id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (cook.get('token')) {
      return true;
    } else {
      _Router.navigate(['/login']);
      return false;
    }
  } else {
    return true;
  }
};
