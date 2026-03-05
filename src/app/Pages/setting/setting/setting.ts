import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslate } from '../../../Core/Services/my-translate';

@Component({
  selector: 'app-setting',
  imports: [TranslatePipe],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting implements OnInit {
  private readonly myTranslate = inject(MyTranslate);
  currentLang = 'en';
  isDark = false;

  ngOnInit() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang');

    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }

    if (savedLang) {
      this.currentLang = savedLang;
    }
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.myTranslate.changeLang(lang);
  }

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }

  disableDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }
}
