import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  selectedLanguage: string;

  languages: Array<string> = ['fr', 'en'];

  private _translate = inject(TranslateService);

  public languageLocalStorage = signal(localStorage.getItem('language'));
  
  public currentLanguage$ = this._translate.onLangChange.pipe(
    map(langEvent => langEvent.lang)
  );

  public currentLanguage = signal(this._translate.currentLang);

  public currentLanguageChange = toSignal(this.currentLanguage$);

  changeLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.languageLocalStorage.set(localStorage.getItem('language'));
    this._translate.use(lang);
  }
}
