import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly httpClient = inject(HttpClient);
  getCategories(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  getCategoryProducts(id: string): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
}
