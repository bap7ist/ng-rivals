import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeInOutExtraFast, slideInTopFast } from 'src/app/animations/animations';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { Filter } from 'src/app/shared/models/Filter';
import { RivalsCard } from 'src/app/shared/models/RivalsCard';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FooterComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [slideInTopFast, fadeInOutExtraFast],
})
export class CardsComponent implements OnInit {
  cards: Array<RivalsCard> = [];
  filteredCards: Array<RivalsCard>;
  showCardDetails: boolean;
  selectedCard: RivalsCard;
  selectedCardIndex: number;
  zoom: boolean;

  test: string; //

  usedLanguage: string;

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
  ];

  rareFilters: Array<Filter> = [
    {
      id: 'schema',
      checked: false,
    },
    {
      id: 'rare',
      checked: true,
    },
    {
      id: 'peu commune',
      checked: true,
    },
    {
      id: 'commune',
      checked: true,
    },
    {
      id: 'base',
      checked: true,
    },
  ];

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(lang => {
      this.usedLanguage = lang.lang;
    });
    this.initCards();
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
      this.selectedCard = this.filteredCards[this.filteredCards.length-1];
      this.selectedCardIndex = this.filteredCards.length-1;
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

  public onCardClick(card: RivalsCard, index: number): void {
    this.selectedCardIndex = index;
    this.selectedCard = card;
    this.showCardDetails = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
