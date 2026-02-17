import { Component, Input, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../Core/Services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input({ required: true }) isLogin!: boolean;
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
