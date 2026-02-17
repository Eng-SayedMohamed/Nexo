import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../Core/Services/Product/product';
import { IProduct } from '../../Shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true, // تأكد إنها موجودة لو مش بتستخدم Modules
  imports: [RouterLink, InfiniteScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly productService = inject(Product);

  Products: WritableSignal<IProduct[]> = signal([]);
  currentPage: WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> = signal(false);
  isEnd: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    // لو بنحمل حالياً أو وصلنا للنهاية، متنفذش الطلب
    if (this.isLoading() || this.isEnd()) return;

    this.isLoading.set(true);

    // بنبعت رقم الصفحة الحالية للـ Service
    this.productService.getProducts(this.currentPage()).subscribe({
      next: (res) => {
        const newData = res.data;

        if (newData.length === 0) {
          this.isEnd.set(true);
        } else {
          // التعديل السحري هنا: بنضيف الداتا الجديدة للقديمة جوه الـ Signal
          this.Products.update((oldProducts) => [...oldProducts, ...newData]);

          // زود رقم الصفحة للمرة الجاية
          this.currentPage.update((page) => page + 1);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  // الدالة اللي هتنادي عليها لما المستخدم ينزل لتحت
  onScroll() {
    this.getProducts();
  }
}
