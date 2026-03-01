import { Product } from './../../Core/Services/Product/product';
import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISpecProduct } from '../../Shared/interfaces/ispec-product';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly product = inject(Product);
  private readonly cartS = inject(CartS);
  id: WritableSignal<string> = signal('');
  specProduct: WritableSignal<ISpecProduct> = signal({} as ISpecProduct);
  counter: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.getRouteId();
    this.getSpecProduct();
  }
  getRouteId() {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params.get('id'));
        this.id.set(params.get('id') || '');
      },
    });
  }
  getSpecProduct() {
    this.product.getSpecProduct(this.id()).subscribe({
      next: (res) => {
        this.specProduct.set(res.data);
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
