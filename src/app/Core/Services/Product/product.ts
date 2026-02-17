import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private readonly httpClient = inject(HttpClient);
  getProducts(page: number = 1): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  }
  getSpecProduct(id: string): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}
