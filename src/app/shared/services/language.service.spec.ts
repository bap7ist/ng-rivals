import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { TestBed } from '@angular/core/testing';

describe('LanguageService', () => {
  let languageService: LanguageService;

  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    translateServiceMock = {
      setDefaultLang: jest.fn(),
      use: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });

    languageService = TestBed.inject(LanguageService);
  });

  it('should change the language', () => {
    languageService.changeLanguage('fr');
    expect(localStorage.getItem('language')).toBe('fr');
  });
});
