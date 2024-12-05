import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-language-switch',
    templateUrl: './language-switch.component.html',
    styleUrls: ['./language-switch.component.scss'],
    imports: [NgClass]
})
export class LanguageSwitchComponent implements OnInit {
  @Input() theme: string;
  isFrench: boolean;

  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.isFrench = this.languageService.selectedLanguage === 'fr';
  }

  changeLanguage(lang: string): void {
    this.isFrench = lang === 'fr';
    this.languageService.changeLanguage(lang);
  }
}
