import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting implements OnInit {
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
    localStorage.setItem('lang', lang);
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
