import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../Core/Services/Wishlist/wish-list';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit {
  wishlistProducts: any[] = [];

  private readonly _wishlistService = inject(WishListService);
  private readonly cartS = inject(CartS);

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this._wishlistService.getFav().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
      },
    });
  }

  removeItem(id: string): void {
    this._wishlistService.deleteFav(id).subscribe({
      next: (res) => {
        this.wishlistProducts = this.wishlistProducts.filter((item) => item._id !== id);
      },
    });
  }

  addToCart(id: string): void {
    this.cartS.addToCart(id).subscribe((res) => {
      if (res.status == 'success') {
        toast.success('Added successful!🥳', {
          description: res.message,
          duration: 3000,
          closeButton: true,
        });
      }
    });
  }
}
