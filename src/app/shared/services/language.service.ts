import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  selectedLanguage: string;

  languages: Array<string> = ['fr', 'en'];

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.languages.includes(
      localStorage.getItem('language')
    )
      ? localStorage.getItem('language')
      : this.translate.getBrowserLang();

    if (this.languages.includes(this.selectedLanguage)) {
      this.changeLanguage(this.selectedLanguage);
    }
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
