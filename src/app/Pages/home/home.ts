import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../Core/Services/Product/product';
import { IProduct } from '../../Shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ICategory } from '../../Shared/interfaces/icategory';
import { Category } from '../../Core/Services/Categories/categories';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';
import { WishList } from '../../Core/Services/Wishlist/wish-list';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InfiniteScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly productService = inject(Product);
  private readonly categoriesService = inject(Category);
  private readonly cartS = inject(CartS);
  private readonly wishList = inject(WishList);
  Products: WritableSignal<IProduct[]> = signal([]);
  categories: WritableSignal<ICategory[]> = signal([]);
  currentPage: WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> = signal(false);
  isEnd: WritableSignal<boolean> = signal(false);
  responsiveOptions: any[] | undefined;
  wishs: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getWishList();
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
    });
  }
  getProducts() {
    if (this.isLoading() || this.isEnd()) return;

    this.isLoading.set(true);

    this.productService.getProducts(this.currentPage()).subscribe({
      next: (res) => {
        const newData = res.data;

        if (newData.length === 0) {
          this.isEnd.set(true);
        } else {
          this.Products.update((oldProducts) => [...oldProducts, ...newData]);

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
  onScroll() {
    this.getProducts();
  }
  primeCarusol() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
  addToCart(id: string) {
    this.cartS.addToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          toast.success('Added successful!🥳', {
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
