import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartS {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  counter: WritableSignal<number> = signal(0);
  addToCart(id: string): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: id,
    });
  }
  showCart(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: this.cookieService.get('token'),
      },
    });
  }
  deleteItem(id: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`);
  }
  updateCount(id: string, number: number): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: number,
    });
  }
  clear(): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`);
  }
}
