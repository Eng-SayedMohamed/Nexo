import { MyTranslate } from './Core/Services/my-translate';
import { Component, OnInit, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './Core/Services/Flowbite/flowbite';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBarModule, HlmToasterImports],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Store');
  constructor(
    private flowbiteService: FlowbiteService,
    MyTranslate: MyTranslate,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  checkOntheme() {
    if (localStorage.getItem('theme') === 'dark') {
      this.renderer2.addClass(document.documentElement, 'dark');
    }
  }
}
