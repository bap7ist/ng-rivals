import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import {
  fadeInOutExtraFast,
  slideInLeft,
  slideInRight,
  slideInTopFast,
} from 'src/app/animations/animations';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { Filter } from 'src/app/shared/models/Filter';
import { RivalsCard } from 'src/app/shared/models/RivalsCard';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FooterComponent, CardComponent, TranslateModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [slideInTopFast, fadeInOutExtraFast, slideInRight, slideInLeft],
})
export class CardsComponent implements OnInit {
  cards: Array<RivalsCard> = [];
  filteredCards: Array<RivalsCard>;
  showCardDetails: boolean;
  selectedCard: RivalsCard;
  selectedCardIndex: number;
  zoom: boolean;
  isSearch: boolean;
  cardsSearched: Array<RivalsCard> = [];
  showRareHelp: boolean;
  showFilters: boolean;
  showTypeModal: boolean;
  selectedType: { type: string; description: string };

  swipeXStart: number;
  swipeXEnd: number;
  swipeYStart: number;
  swipeYEnd: number;

  test: string; //

  isTablet$ = this.observer
    .observe('(max-width: 1200px)')
    .pipe(map(breakpoints => breakpoints.matches));

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  usedLanguage: string = 'fr';

  @ViewChild('search') search: ElementRef;

  searchFilters: Array<Filter> = [
    {
      id: 'nom',
      checked: true,
    },
    {
      id: 'description',
      checked: true,
    },
  ];

  typeFilters: Array<Filter> = [
    {
      id: 'attaque',
      checked: true,
    },
    {
      id: 'tactique',
      checked: true,
    },
    {
      id: 'competence',
      checked: true,
    },
    {
      id: 'ashak',
      checked: true,
    },
    {
      id: 'guilde',
      checked: true,
    },
  ];

  rareFilters: Array<Filter> = [
    {
      id: 'schema',
      checked: true,
      definition_fr:
        "Uniques, les schémas sont des cartes très puissantes. Il n'existe que 2 manières de s'en procurer : en dépensant 5 ressources identiques ou en interragissant avec un sponsor.",
      definition_en: '',
    },
    {
      id: 'rare',
      checked: true,
      definition_fr:
        "Présents en seulement 2 exemplaires dans l'Interface, les cartes rares sont très recherchées.",
      definition_en: '',
    },
    {
      id: 'peu commune',
      checked: true,
      definition_fr: "Présentes en 3 exemplaires dans l'Interface.",
      definition_en: '',
    },
    {
      id: 'commune',
      checked: true,
      definition_fr: "Présentes en 4 exemplaires dans l'interface.",
      definition_en: '',
    },
    {
      id: 'base',
      checked: true,
      definition_fr:
        'Ce sont les cartes du début de partie. Les blasters et les psywaves mais aussi les cartes spéciales des Ashaks.',
      definition_en: '',
    },
  ];

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.usedLanguage = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(lang => {
      this.usedLanguage = lang.lang;
    });
    this.initCards();
  }

  public onSearchClick(event: MouseEvent, origin: string): void {
    this.isSearch = !this.isSearch;
    this.cardsSearched = [];

    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 200);
    if (this.isSearch && origin === 'mobile') {
      scrollTo({ top: event.pageY, behavior: 'smooth' });
    }
  }

  public onTypeClick(type: string): void {
    this.showTypeModal = true;
    this.showRareHelp = true;
    this.selectedType = { type: '', description: '' };
    this.selectedType.type = type;
    this.selectedType.description = `cards.type.${type}.description`;
  }

  public swipe(event: TouchEvent, when: string): void {
    if (when === 'start') {
      this.swipeXEnd = null;
      this.swipeYEnd = null;
      this.swipeXStart = event.changedTouches.item(0).clientX;
      this.swipeYStart = event.changedTouches.item(0).clientY;
    } else if (when === 'end') {
      this.swipeXEnd = event.changedTouches.item(0).clientX;
      this.swipeYEnd = event.changedTouches.item(0).clientY;
    }

    if (
      this.swipeXStart < this.swipeXEnd &&
      this.swipeXEnd !== null &&
      this.swipeXEnd - this.swipeXStart > 140
    ) {
      this.nextCard();
    } else if (
      this.swipeXStart > this.swipeXEnd &&
      this.swipeXEnd !== null &&
      this.swipeXStart - this.swipeXEnd > 140
    ) {
      this.previousCard();
    }
  }

  public onSearch(event: any): void {
    this.cardsSearched = this.cards.filter(card => {
      if (
        event.target.value.toLowerCase() === 'i am a founder' ||
        event.target.value.toLowerCase() === 'je suis un fondateur'
      ) {
        return card.rare === 'exclusive';
      } else if (
        event.target.value.length > 0 &&
        card.id !== 'the_founder' &&
        card.id !== 'gemmologist'
      ) {
        if (this.searchFilters[0].checked) {
          if (this.searchFilters[1].checked) {
            return (
              (this.usedLanguage === 'fr'
                ? card.name_fr
                : card.name_en
              ).includes(event.target.value.toLowerCase()) ||
              (card.text_fr
                ? (this.usedLanguage === 'fr'
                    ? card.text_fr.toLowerCase()
                    : card.text_en.toLowerCase()
                  ).includes(event.target.value.toLowerCase())
                : '') ||
              (card.ashak
                ? card.ashak.includes(event.target.value.toLowerCase())
                : '')
            );
          } else {
            return (
              (this.usedLanguage === 'fr'
                ? card.name_fr
                : card.name_en
              ).includes(event.target.value.toLowerCase()) ||
              (card.ashak
                ? card.ashak.includes(event.target.value.toLowerCase())
                : '')
            );
          }
        } else {
          return (
            (card.text_fr
              ? (this.usedLanguage === 'fr'
                  ? card.text_fr.toLowerCase()
                  : card.text_en.toLowerCase()
                ).includes(event.target.value.toLowerCase())
              : '') ||
            (card.ashak
              ? card.ashak.includes(event.target.value.toLowerCase())
              : '')
          );
        }
      } else {
        return null;
      }
    });
  }

  public onRareClick(filterId: string): void {
    this.showRareHelp = false;
    this.rareFilters.map(filter => {
      filter.id === filterId
        ? (filter.checked = true)
        : (filter.checked = false);
    });
    this.filteredCards = this.filterCards(this.cards);
  }

  public onSearchFiltersChange(filter: Filter): void {
    filter.checked = !filter.checked;
    if (!this.searchFilters.some(fil => fil.checked)) {
      if (!filter.checked) {
        this.searchFilters.find(
          otherFilter => otherFilter.id !== filter.id
        ).checked = true;
      }
    }
  }

  public convertWord(word: string): string {
    switch (word) {
      case '_PHY_':
        return 'attaque(s) physique(s)';
      case '_MENT_':
        return 'attaque(s) mentale(s)';
      case '_+1DGT_':
        return '1 dégât';
      case '_+2DGT_':
        return '2 dégâts';
      case '_+3DGT_':
        return '3 dégâts';
      case '_ANT_':
        return 'jeton(s) anticipation(s)';
      case '_POISON_':
        return 'empoisonné.e';
      case '_1COST_':
        return "1 point d'action";
      case '_REUSSITE_':
        return 'réussite';
      case '_1SALVE_':
        return '1 salve';
      case '_2SALVE_':
        return '2 salves';
      case '_3SALVE_':
        return '3 salves';
      default:
        return null;
    }
  }

  public arrayFromText(text: string): Array<string> {
    if (text) {
      const wordRegex = /[\w'ê\u00C0-\u017F+,>.\-]+/g;
      const matches = text.match(wordRegex);
      return matches || [];
    } else {
      return null;
    }
  }

  public nextCard(): void {
    this.selectedCardIndex++;
    if (this.selectedCardIndex < this.filteredCards.length) {
      this.selectedCard = this.filteredCards[this.selectedCardIndex];
    } else if (this.selectedCardIndex === this.filteredCards.length) {
      this.selectedCard = this.filteredCards[0];
      this.selectedCardIndex = 0;
    }
  }

  public previousCard(): void {
    if (this.selectedCardIndex > 0) {
      console.log('ici');

      this.selectedCardIndex--;
      this.selectedCard = this.filteredCards[this.selectedCardIndex];
    } else if (this.selectedCardIndex === 0) {
      this.selectedCard = this.filteredCards[this.filteredCards.length - 1];
      this.selectedCardIndex = this.filteredCards.length - 1;
    }
  }

  public translateRare(rare: string): string {
    switch (rare) {
      case 'rare':
        return 'rare';
      case 'peu commune':
        return 'uncommon';
      case 'commune':
        return 'common';
      default:
        return rare;
    }
  }

  public translateType(type: string): string {
    switch (type) {
      case 'attaque':
        return 'attack';
      case 'tactique':
        return 'tactical';
      case 'competence':
        return 'skill';
      case 'guilde':
        return 'guild';
      case 'physique':
        return 'physical';
      case 'mentale':
        return 'psychic';
      case 'activable':
        return 'activatable';
      case 'passive':
        return 'permanent';
      case 'utilitaire':
        return 'utility';
      case 'defensive':
        return 'defensive';
      case 'mods':
        return 'mod';
      default:
        return type;
    }
  }

  private initCards(): void {
    this.http
      .get<Array<RivalsCard>>('assets/data/rivals-cards.json')
      .subscribe(cards => {
        this.cards = cards;
        this.filteredCards = this.filterCards(this.cards);
      });
  }

  private filterCards(cards: Array<RivalsCard>): Array<RivalsCard> {
    return cards.filter(
      card =>
        this.typeFilters.some(
          filter => filter.checked && filter.id === card.type
        ) &&
        this.rareFilters.some(
          rareFilter => rareFilter.checked && rareFilter.id === card.rare
        )
    );
  }

  public onTypeFilterChange(filterId: string): void {
    this.selectedCardIndex = 0;
    this.selectedCardIndex = 0;
    this.typeFilters.map(filter => {
      if (filter.id === filterId) {
        filter.checked = !filter.checked;
      }
      return filter;
    });
    this.filteredCards = this.filterCards(this.cards);
  }

  public onRareFilterChange(filterId: string): void {
    this.rareFilters.map(filter => {
      if (filter.id === filterId) {
        filter.checked = !filter.checked;
      }
      return filter;
    });
    this.filteredCards = this.filterCards(this.cards);
  }

  public clearSearch(): void {
    this.cardsSearched = [];
    this.search.nativeElement.value = null;
  }

  public onCardClick(card: RivalsCard, index: number): void {
    this.selectedCardIndex = index;
    this.selectedCard = card;
    this.showCardDetails = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.cardsSearched) {
      this.cardsSearched = [];
      this.isSearch = false;
    }
  }
}
