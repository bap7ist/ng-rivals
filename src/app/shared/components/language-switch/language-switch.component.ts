import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { languageChoice } from 'src/app/store/actions/app.actions';
import { getLanguage } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent implements OnInit {
  @Input() theme: string;
  isFrench: boolean;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store
      .select(getLanguage)
      .pipe(take(1))
      .subscribe((lang) => (this.isFrench = lang === 'fr'));
  }

  selectLanguage(lang: string): void {
    this.isFrench = lang === 'fr';
    this.store.dispatch(languageChoice({ language: lang }));
  }
}
