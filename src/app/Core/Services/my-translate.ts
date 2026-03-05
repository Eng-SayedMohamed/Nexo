import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MyTranslate {
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private translate: TranslateService,
  ) {
    if (isPlatformBrowser(platformId)) {
      translate.setFallbackLang('en');
      const lang = localStorage.getItem('lang')!;
      if (lang) {
        translate.use(lang);
      }
      this.changeDir();
    }
  }
  changeDir() {
    if (localStorage.getItem('lang') == 'en') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(document.documentElement, 'lang', 'rtl');
    } else if (localStorage.getItem('lang') == 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.changeDir();
  }
}
