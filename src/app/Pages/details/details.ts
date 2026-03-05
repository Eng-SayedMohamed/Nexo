import { Product } from './../../Core/Services/Product/product';
import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISpecProduct } from '../../Shared/interfaces/ispec-product';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';
import { WishListService } from '../../Core/Services/Wishlist/wish-list';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly product = inject(Product);
  private readonly cartS = inject(CartS);
  private readonly wishList = inject(WishListService);

  id: WritableSignal<string> = signal('');
  specProduct: WritableSignal<ISpecProduct> = signal({} as ISpecProduct);
  counter: WritableSignal<number> = signal(1);
  wishs: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
    this.getRouteId();
    this.getSpecProduct();
    this.getWishList();
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
  addToWishlist(id: string) {
    if (this.wishs().includes(id)) {
      this.wishList.deleteFav(id).subscribe((res) => {
        this.wishs.set(res.data);
        toast.success('Complete the product removal from the favorites list.', {
          description: res.message,
          duration: 3000,
          closeButton: true,
        });
      });
    } else {
      this.wishList.addFav(id).subscribe((res) => {
        if (res.status == 'success') {
          this.wishs.set(res.data);
          toast.success('Added successful!🥳', {
            description: res.message,
            duration: 3000,
            closeButton: true,
          });
        }
      });
    }
  }
  getWishList() {
    this.wishList.getFav().subscribe((res) => {
      this.wishs.set(res.data.map((item: any) => item.id));
    });
  }
}
