import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loggedGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  let cook = inject(CookieService);
  let id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (cook.get('token')) {
      _Router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
