import { Component, inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../Core/Services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

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
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('token') !== null) {
        console.log(jwtDecode(localStorage.getItem('token')!));
      }
    }
  }
}
