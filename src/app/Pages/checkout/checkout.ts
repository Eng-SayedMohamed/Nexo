import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Orders } from '../../Core/Services/Orders/orders';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-checkout',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orders = inject(Orders);
  private readonly cartS = inject(CartS);
  private readonly router = inject(Router);
  cartId: WritableSignal<string> = signal('');
  checkout: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(\+20|0)1[0125]\d{8,10}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.getID();
  }
  getID(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId.set(res.get('id')!);
      },
    });
    console.log(this.cartId());
  }
  cash(): void {
    this.orders.cashOrder(this.cartId(), this.checkout.value).subscribe((res) => {
      this.cartS.counter.set(0);
      toast.success('Order Placed Successfully', {
        description: 'Your order has been placed successfully and will be delivered to you soon.',
      });
      setTimeout(() => {
        this.router.navigate(['/allorder']);
      }, 1000);
    });
  }
  payOnline(): void {
    this.orders.checkOut(this.cartId(), this.checkout.value).subscribe((res) => {
      open(res.session.url, '_self');
    });
  }
}
