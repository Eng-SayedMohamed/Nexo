import {
  Component,
  inject,
  Input,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { FlowbiteService } from '../../../Core/Services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { IUserInfo } from '../../interfaces/iuser-info';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input({ required: true }) isLogin!: boolean;
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  Userinfo: WritableSignal<IUserInfo> = signal({} as IUserInfo);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (this.cookieService.check('token')) {
        this.Userinfo.set(jwtDecode(this.cookieService.get('token')));
      }
    }
  }
  signOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
