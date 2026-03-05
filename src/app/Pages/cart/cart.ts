import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { ICart, Product2 } from '../../Shared/interfaces/icart';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { toast } from 'ngx-sonner';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartS = inject(CartS);
  private readonly id = inject(PLATFORM_ID);
  cartDetails: WritableSignal<ICart> = signal({} as ICart);
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
        this.cartDetails.set(res.data);
      },
    });
  }
  clear() {
    this.cartS.clear().subscribe((res) => {
      if (res.message == 'success') {
        this.cartDetails.set({} as ICart);
        this.cartS.counter.set(0);
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
        this.cartS.counter.set(res.numOfCartItems);
        this.cartDetails.set(res.data);
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
        this.cartDetails.set(res.data);
        this.cartS.counter.set(res.numOfCartItems);
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
