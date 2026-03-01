import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { ICart, Product2 } from '../../Shared/interfaces/icart';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartS = inject(CartS);
  private readonly id = inject(PLATFORM_ID);
  cartDetails: ICart = {} as ICart;
  products: WritableSignal<Product2[]> = signal([]);
  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      this.showCart();
    }
  }
  showCart() {
    this.cartS.showCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.products.set(res.data.products);
      },
    });
  }
  clear() {
    this.cartS.clear().subscribe((res) => {
      if (res.message == 'success') {
        this.cartDetails = {} as ICart;
        toast.success('Your Shopping Cart Is Now Empty 😊', {
          description: res.message,
          duration: 3000,
          closeButton: true,
          position: 'top-center',
        });
      }
    });
  }
  delete(id: string) {
    this.cartS.deleteItem(id).subscribe((res) => {
      if ((res.status = 'success')) {
        this.cartDetails = res.data;
        toast.success('Removed successful!', {
          description: res.message,
          duration: 3000,
          closeButton: true,
          position: 'top-center',
        });
      }
    });
  }
  updateCount(id: string, number: number) {
    this.cartS.updateCount(id, number).subscribe((res) => {
      if ((res.status = 'success')) {
        this.cartDetails = res.data;
        toast.success('Quantity updated successfully😍', {
          description: res.message,
          duration: 3000,
          closeButton: true,
          position: 'top-center',
        });
      }
    });
  }
}
