import { Product } from './../../Core/Services/Product/product';
import { Component, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISpecProduct } from '../../Shared/interfaces/ispec-product';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  constructor(
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Product) private readonly product: Product,
  ) {}
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
  plus() {
    this.counter.update((value) => value + 1);
  }
  minus() {
    this.counter.update((value) => value - 1);
  }
}
