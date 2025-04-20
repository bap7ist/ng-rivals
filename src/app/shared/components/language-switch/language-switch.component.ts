import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NgClass } from '@angular/common';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
  imports: [NgClass],
})
export class LanguageSwitchComponent implements OnInit {
  private _languageService = inject(LanguageService);

  @Input() theme: string;

  isFrench = computed(() => {
    return (
      this._languageService.currentLanguage() === 'fr' ||
      this._languageService.currentLanguageChange() === 'fr'
    );
  });

  public constructor() {
    effect(() => {
      if (
        this._languageService.languageLocalStorage() &&
        this._languageService.languageLocalStorage() !==
          this._languageService.currentLanguageChange()
      ) {
        this._languageService.changeLanguage(
          this._languageService.languageLocalStorage()
        );
      }
    });
  }

  ngOnInit(): void {}

  public changeLanguage(lang: string): void {
    this._languageService.changeLanguage(lang);
  }
}
