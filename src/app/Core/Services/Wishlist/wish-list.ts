import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishList {
  private readonly httpClient = inject(HttpClient);
  getFav(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }
  deleteFav(id: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`);
  }
  addFav(id: string): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      productId: id,
    });
  }
}
