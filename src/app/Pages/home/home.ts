import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Product } from '../../Core/Services/Product/product';
import { IProduct } from '../../Shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ICategory } from '../../Shared/interfaces/icategory';
import { Category } from '../../Core/Services/Categories/categories';
import { CartS } from '../../Core/Services/Cart/cart-s';
import { toast } from 'ngx-sonner';
import { WishListService } from '../../Core/Services/Wishlist/wish-list';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InfiniteScrollDirective, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly productService = inject(Product);
  private readonly categoriesService = inject(Category);
  private readonly cartS = inject(CartS);
  private readonly wishList = inject(WishListService);
  private readonly id = inject(PLATFORM_ID);
  Products: WritableSignal<IProduct[]> = signal([]);
  categories: WritableSignal<ICategory[]> = signal([]);
  currentPage: WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> = signal(false);
  isEnd: WritableSignal<boolean> = signal(false);
  responsiveOptions: any[] | undefined;
  wishs: WritableSignal<string[]> = signal([]);
  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      this.getProducts();
      this.getCategories();
      this.getWishList();
    }
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    stagePadding: 30,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
  };
  addToCart(id: string) {
    this.cartS.addToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          toast.success('Added successful!🥳', {
            description: res.message,
            duration: 3000,
            closeButton: true,
          });
          this.cartS.counter.set(res.numOfCartItems);
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
