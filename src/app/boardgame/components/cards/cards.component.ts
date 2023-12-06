import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { RivalsCard } from 'src/app/shared/models/RivalsCard';
import { CardComponent } from './card/card.component';
import { HttpClient } from '@angular/common/http';
import { Filter } from 'src/app/shared/models/Filter';
import { slideInTopFast } from 'src/app/animations/animations';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FooterComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [slideInTopFast]
})
export class CardsComponent implements OnInit {
  cards: Array<RivalsCard> = [];
  filteredCards: Array<RivalsCard>;
  showCardDetails: boolean;
  selectedCard: RivalsCard;

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
      checked: false,
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
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initCards();
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

  public onCardClick(card: RivalsCard): void {
    this.selectedCard = card;
    this.showCardDetails = true;
    window.scrollTo({ top: 0, behavior : 'smooth'})
  }
}
