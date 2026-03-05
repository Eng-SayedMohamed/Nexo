import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Orders } from '../../Core/Services/Orders/orders';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { IUserInfo } from '../../Shared/interfaces/iuser-info';
import { IOrders } from '../../Shared/interfaces/iorders';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  private readonly orders = inject(Orders);
  private readonly cookies = inject(CookieService);
  private readonly id = inject(PLATFORM_ID);
  info: IUserInfo = {} as IUserInfo;
  order: WritableSignal<IOrders[]> = signal([]);
  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      this.info = jwtDecode(this.cookies.get('token'));
      this.orders.getUserOrders(this.info.id).subscribe((res) => {
        this.order.set(res);
      });
    }
  }
}
