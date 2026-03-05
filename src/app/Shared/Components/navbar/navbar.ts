import {
  Component,
  computed,
  inject,
  Input,
  input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FlowbiteService } from '../../../Core/Services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { IUserInfo } from '../../interfaces/iuser-info';
import { CookieService } from 'ngx-cookie-service';
import { WishListService } from '../../../Core/Services/Wishlist/wish-list';
import { CartS } from '../../../Core/Services/Cart/cart-s';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslate } from '../../../Core/Services/my-translate';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input({ required: true }) isLogin!: boolean;
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  private readonly renderer2 = inject(Renderer2);
  private readonly myTranslate = inject(MyTranslate);
  readonly cartS = inject(CartS);
  Userinfo: WritableSignal<IUserInfo> = signal({} as IUserInfo);
  cartCounter: Signal<number> = computed(() => this.cartS.counter());
  isDarkMode: WritableSignal<boolean> = signal(false);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.checkOntheme();
      this.cartS.showCart().subscribe((res) => {
        this.cartS.counter.set(res.numOfCartItems);
      });
      if (this.cookieService.get('token') !== null) {
        this.Userinfo.set(jwtDecode(this.cookieService.get('token')!));
      }
    }
  }
  toggleDark(evt: any) {
    if (evt.target.checked == true) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.isDarkMode.set(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  checkOntheme() {
    if (localStorage.getItem('theme') === 'dark') {
      this.isDarkMode.set(true);
      this.renderer2.addClass(document.documentElement, 'dark');
    }
  }
  signOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  changeLanguage(evt: any) {
    if (evt.target.checked == true) {
      this.myTranslate.changeLang('ar');
    } else {
      this.myTranslate.changeLang('en');
    }
  }
}
