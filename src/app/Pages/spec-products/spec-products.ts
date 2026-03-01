import { Product } from './../../Core/Services/Product/product';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../Shared/interfaces/product';
import { toast } from 'ngx-sonner';
import { CartS } from '../../Core/Services/Cart/cart-s';

@Component({
  selector: 'app-spec-products',
  imports: [RouterLink],
  templateUrl: './spec-products.html',
  styleUrl: './spec-products.css',
})
export class SpecProducts implements OnInit {
  private readonly product = inject(Product);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartS = inject(CartS);

  Brandproducts: WritableSignal<IProduct[]> = signal([]);
  categoryProducts: WritableSignal<IProduct[]> = signal([]);
  id: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.getId();
    this.getCategories();
    this.getByBrand();
  }
  getId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id.set(res.get('id')!);
      },
    });
  }
  getCategories() {
    this.product.getProductsOfCategories(this.id()).subscribe({
      next: (res) => {
        console.log(res);
        this.categoryProducts.set(res.data);
      },
    });
  }
  getByBrand() {
    this.product.getProductsOfBrand(this.id()).subscribe({
      next: (res) => {
        this.Brandproducts.set(res.data);
      },
    });
  }
  addToCart(id: string) {
    this.cartS.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          toast.success('Added successful!', {
            description: res.message,
            duration: 3000,
            closeButton: true,
          });
        }
      },
    });
  }
}
