import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  signUp(userData: any): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }
  signIn(userData: any): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
  }
}
