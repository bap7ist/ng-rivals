import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  fadeInOut,
  fadeInOutFast,
  slideInLeft,
  slideInRight,
  slideInTopSlow,
} from 'src/app/animations/animations';
import { card } from 'src/app/shared/models/card';
import { tile } from 'src/app/shared/models/tile';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-wildtech',
  templateUrl: './wildtech.component.html',
  styleUrls: ['./wildtech.component.scss'],
  animations: [
    fadeInOut,
    slideInTopSlow,
    slideInLeft,
    fadeInOutFast,
    slideInRight,
    trigger('growFromTop', [
      transition(':enter', [
        style({
          height: '0%',
        }),
        animate(
          '300ms',
          style({
            height: '20%',
          })
        ),
      ]),
    ]),
  ],
})
export class WildtechComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;

  centerShow: boolean;
  textShow: boolean;
  grabToken: boolean;
  interval: any;
  tileDetails: {
    tileId: string;
    resources: any;
    position: {
      x: number;
      y: number;
    };
  };
  isCollecting: boolean;
  step: number;
  showDetails: boolean;
  nextStep: number;
  showResources: boolean;
  showResourcePanel: boolean;
  cards: Array<card>;
  showCards: boolean;
  cardPicked: number;
  cardsInHand = new Array<card>();
  showHand: boolean;
  showMoreDetails: boolean;
  detailsUnit: string;
  moveTokenButton: boolean;

  unitDetails = {
    id: 'crystal',
    description: 'lore.elements.description',
  };

  collectedResources = {
    cristal: 0,
    resine: 0,
    anticipation: 0,
    cartes: 0,
  };

  tiles: Array<tile>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.cancelTuto();
  }

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak);
    this.step = 0;
    this.initWildTech();
    this.initTiles();
    this.showTile();
  }

  moveToken(): void {
    this.moveTokenButton = true;
    this.releaseToken();
  }

  showUnitDetails(unit: string): void {
    this.showMoreDetails = true;
    this.detailsUnit = unit;
  }

  fetchCards(): Observable<Array<card>> {
    return this.http.get('assets/data/cards.json') as Observable<Array<card>>;
  }

  cancelTuto(): void {
    this.step = 5;
    clearInterval(this.interval);
    this.tiles.forEach((tile) => (tile.hover = false));
  }

  initWildTech(): void {
    setTimeout(() => {
      this.step = 1;
      this.step1();
    }, 2200);
  }

  step1(): void {
    this.interval = setInterval(() => {
      this.tiles[2].hover = !this.tiles[2].hover;
    }, 700);
  }

  step2(): void {
    this.step = 2;
    clearInterval(this.interval);
    setTimeout(() => {
      this.nextStep = 2;
    }, 400);
  }

  step3(): void {
    this.step = 3;
    this.step1();
    setTimeout(() => {
      this.nextStep = 3;
    }, 400);
  }

  step4(): void {
    this.step = 4;
    clearInterval(this.interval);
    setTimeout(() => {
      this.nextStep = 4;
    }, 400);
  }

  showTile(): void {
    setTimeout(() => {
      this.centerShow = true;
    }, 1000);
    setTimeout(() => {
      this.textShow = true;
    }, 1500);

    this.tiles.forEach((tile) => {
      setTimeout(() => {
        tile.show = true;
      }, tile.time);
    });
  }

  initTiles(): void {
    this.tiles = [
      {
        id: '1',
        x: 0,
        y: 5,
        flipped: false,
        spinned: false,
        line: false,
        show: false,
        time: 100,
        hover: false,
        dry: false,
        resources: {
          crystal: true,
          resine: true,
          observatory: true,
          volcano: false,
          lake: false,
          interface: false,
        },
      },
      {
        id: '2',
        x: 16.3,
        y: 5,
        flipped: true,
        show: false,
        spinned: false,
        line: false,
        time: 200,
        hover: false,
        dry: false,
        resources: {
          resine: true,
          interface: true,
          volcano: true,
          lake: false,
          observatory: false,
          crystal: false,
        },
      },
      {
        id: '3',
        x: 32.6,
        y: 5,
        flipped: false,
        show: false,
        time: 300,
        spinned: false,
        line: false,
        hover: false,
        dry: false,
        resources: {
          resine: true,
          crystal: true,
          interface: true,
          observatory: false,
          lake: false,
          volcano: false,
        },
      },
      {
        id: '4',
        x: 8.15,
        y: -2.2,
        flipped: true,
        spinned: true,
        line: false,
        show: false,
        time: 400,
        hover: false,
        dry: false,
        resources: {
          volcano: false,
          crystal: false,
          interface: false,
          resine: true,
          observatory: true,
          lake: true,
        },
      },
      {
        id: '5',
        x: 24.5,
        y: -2.2,
        flipped: true,
        spinned: true,
        line: false,
        show: false,
        time: 500,
        hover: false,
        dry: false,
        resources: {
          crystal: false,
          lake: false,
          volcano: false,
          resine: true,
          observatory: true,
          interface: true,
        },
      },
      {
        id: '6',
        x: 40.9,
        y: -2.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 600,
        hover: false,
        dry: false,
        resources: {
          lake: false,
          observatory: false,
          interface: false,
          resine: true,
          crystal: true,
          volcano: true,
        },
      },
      {
        id: '7',
        x: 49,
        y: 5,
        flipped: false,
        show: false,
        line: false,
        spinned: false,
        time: 700,
        hover: false,
        dry: false,
        resources: {
          resine: false,
          volcano: false,
          lake: false,
          crystal: true,
          observatory: true,
          interface: true,
        },
      },
      {
        id: '8',
        x: 8.1,
        y: 33.4,
        flipped: false,
        show: false,
        spinned: false,
        line: false,
        time: 800,
        hover: false,
        dry: false,
        resources: {
          resine: false,
          volcano: false,
          observatory: false,
          crystal: true,
          interface: true,
          lake: true,
        },
      },
      {
        id: '9',
        x: -20.7,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 900,
        hover: false,
        dry: false,
        resources: {
          crystal: false,
          resine: false,
          observatory: false,
          volcano: false,
          lake: false,
          interface: false,
        },
      },
      {
        id: '10',
        x: 0.1,
        y: 26.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 1000,
        hover: false,
        dry: false,
        resources: {
          resine: false,
          lake: false,
          volcano: false,
          crystal: true,
          interface: true,
          observatory: true,
        },
      },
      {
        id: '11',
        x: 16.3,
        y: 26.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 1100,
        hover: false,
        dry: false,
        resources: {
          volcano: false,
          observatory: false,
          interface: false,
          resine: true,
          crystal: true,
          lake: true,
        },
      },
      {
        id: '12',
        x: 32.6,
        y: 26.2,
        flipped: false,
        spinned: true,
        show: false,
        line: false,
        time: 1200,
        hover: false,
        dry: false,
        resources: {
          observatory: false,
          lake: false,
          volcano: false,
          resine: true,
          crystal: true,
          interface: true,
        },
      },
      {
        id: '13',
        x: 3.9,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 1300,
        hover: false,
        dry: false,
        resources: {
          crystal: false,
          observatory: false,
          volcano: false,
          resine: true,
          interface: true,
          lake: true,
        },
      },
      {
        id: '14',
        x: 36.6,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 1400,
        hover: false,
        dry: false,
        resources: {
          crystal: false,
          observatory: false,
          lake: false,
          resine: true,
          interface: true,
          volcano: true,
        },
      },
      {
        id: '15',
        x: 24.4,
        y: 33.4,
        flipped: false,
        show: false,
        line: false,
        spinned: false,
        time: 1500,
        hover: false,
        dry: false,
        resources: {
          resine: false,
          volcano: false,
          lake: false,
          crystal: true,
          interface: true,
          observatory: true,
        },
      },
    ];
  }

  goBack(): void {
    this.router.navigate(['/gameplay/ashak-board']);
  }

  grabbingToken(): void {
    this.grabToken = true;
    this.showDetails = false;
  }

  releaseToken(): void {
    this.grabToken = false;
    if (this.step === 2) {
      this.step3();
    }
  }

  recolte(tileDetails: any): void {
    if (tileDetails.resources.interface) {
      let card1 = Math.floor(Math.random() * 14);
      let card2 = Math.floor(Math.random() * 14);
      while (card1 === card2) {
        card2 = Math.floor(Math.random() * 14);
      }
      console.log(card1);
      console.log(card2);
      this.fetchCards()
        .pipe(
          map((cards) =>
            cards.filter((card) => card.id === card1 || card.id === card2)
          ),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((cards) => {
          this.cards = cards;
        });
      setTimeout(() => {
        this.showCards = true;
      }, 1000);
    }
    this.step = 5;
    this.showDetails = false;
    this.isCollecting = true;
    setTimeout(() => {
      this.showResourcePanel = true;
      this.tiles.find((tile) => tile.id === tileDetails.tileId).dry = true;
    }, 200);
    setTimeout(() => {
      if (tileDetails.resources.resine) {
        this.collectedResources.resine++;
      }
      if (tileDetails.resources.crystal) {
        this.collectedResources.cristal++;
      }
      if (
        tileDetails.resources.observatory &&
        this.collectedResources.anticipation < 3
      ) {
        this.collectedResources.anticipation++;
      }
      this.showResources = false;
    }, 1000);
    setTimeout(() => {
      this.showResourcePanel = false;
    }, 3000);
  }

  stepClick(tile: any) {
    this.tileClick(tile);
    tile.hover = false;
  }

  tileClick(tile: any) {
    if (tile.dry) {
      return;
    }
    if (this.step === 1 && tile.id === '3') {
      this.step2();
    }
    if (tile.flipped && this.step > 2) {
      this.tileDetails = {
        tileId: tile.id,
        resources: tile.resources,
        position: {
          x: tile.x + 17,
          y: tile.y + 5,
        },
      };
      if (this.step < 5) {
        this.step4();
      }
      this.showDetails = true;
      this.showResources = true;
      setTimeout(() => {
        this.isCollecting = false;
      }, 200);
    } else {
      if (this.step > 3 || tile.id === '3') {
        tile.flipped = true;
        this.showDetails = false;
      }
    }
  }

  pickCard(card: card): void {
    this.cardPicked = card.id;
    this.cardsInHand.push(card);
    setTimeout(() => {
      this.showCards = false;
    }, 200);
    setTimeout(() => {
      this.cardPicked = 16;
    }, 500);
  }
}
