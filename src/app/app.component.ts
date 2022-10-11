import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { take, tap } from 'rxjs';
import { languageChoice } from './store/actions/app.actions';
import { getAshak, getLanguage } from './store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private translate: TranslateService) {}

  isChecked: boolean;
  language: string;
  showLanguage: boolean;
  loading: boolean;
  ashak: string;

  ngOnInit(): void {
    this.loading = true;
  }

  selectLanguage(lang: string): void {
    lang === 'fr' ? (this.isChecked = true) : (this.isChecked = false);
    this.store.dispatch(languageChoice({ language: lang }));
    this.getLanguage();
    this.showLanguage = !this.showLanguage;
  }

  getLanguage(): void {
    this.store
      .select(getLanguage)
      .pipe(take(1))
      .subscribe((lang) => {
        this.language = lang;
        lang === 'fr' ? (this.isChecked = true) : (this.isChecked = false);
      });
  }

  onReturnFromLoader(ashak: string): void {
    this.ashak = ashak;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
