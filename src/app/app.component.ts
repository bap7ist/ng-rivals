import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, take, tap } from 'rxjs';
import { languageChoice } from './store/actions/app.actions';
import { getAshak, getLanguage } from './store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private translate: TranslateService,
    private observer: BreakpointObserver
  ) {}

  language: string;
  showLanguage: boolean;
  loading: boolean;
  ashak$: Observable<string>;

  isMobile$ = this.observer
    .observe('(max-width: 424px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  languages = [
    {
      name: 'Français',
      id: 'fr',
    },
    {
      name: 'English',
      id: 'en',
    },
    {
      name: 'Español',
      id: 'es',
    },
  ];

  ngOnInit(): void {
    this.loading = true;
    this.ashak$ = this.store.select(getAshak);
    this.selectLanguage('fr');
    this.showLanguage = false;
  }

  selectLanguage(lang: string): void {
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
      });
  }
}
