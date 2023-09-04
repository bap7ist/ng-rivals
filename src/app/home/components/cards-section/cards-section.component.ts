import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  Observable,
  of,
  ReplaySubject,
  takeUntil,
} from 'rxjs';
import {
  fadeInOut,
  fadeInOutFast,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { WindowSizeService } from 'src/app/shared/services/window-size.service';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss'],
  animations: [
    slideInLeft,
    slideInRight,
    fadeInOut,
    fadeInOutFast,
    trigger('rotate', [
      state('1', style({ transform: 'rotate(45deg)' })),
      state('2', style({ transform: 'rotate(90deg)' })),
      state('3', style({ transform: 'rotate(135deg)' })),
      state('4', style({ transform: 'rotate(180deg)' })),
      transition('0 => 1', animate('800ms ease-out')),
      transition('1 => 2', animate('800ms ease-out')),
      transition('2 => 3', animate('800ms ease-out')),
    ]),
  ],
})
export class CardsSectionComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;

  front: boolean;
  opacity: string;
  y: string;
  maxHorizon: number;
  rotateState: string = '0';
  scrolling: number;

  windowWidth$: Observable<number>;
  windowHeight$: Observable<number>;

  scroll$: Observable<number>;

  // Elements scroll
  gameplayElementsScroll: number;
  setLeft: number;
  cardsAnimationDone: boolean;

  cards: Array<any>;

  windowSize = { width: 0, height: 0 };

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    this.rotation(window.scrollY);
    window.dispatchEvent(new Event('resize'));
    let opa = (window.scrollY - 1.5 * this.windowSize.height) / 4;
    this.opacity = (opa / 100).toString();
    if (window.scrollY > 7 * this.windowSize.height) {
      this.cardsAnimationDone = true;
    }
    if (window.scrollY < 2.25 * this.windowSize.height) {
      this.cardsAnimationDone = false;
    }
  }

  ngOnInit(): void {
    this.windowSizeService.windowSize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((size) => {
        this.windowSize = size;
        this.initCards(this.windowSize);
      });
  }

  initCards(size: { width: number; height: number }): void {
    if (!this.isMobile) {
      this.cards = [
        {
          // maxHorizonMinus: -(size.width + 50),
          ngIf: 2.74 * size.height,
          right: 'card1',
          flip: 3.6 * size.height,
          url: 'ATT_JenaipasFini',
          name: 'home.gameplay.cards.pas.fini.name',
          descriptif: 'home.gameplay.cards.pas.fini.descriptif',
          descriptif2: 'home.gameplay.cards.pas.fini.descriptif2',
          color: 'white',
        },
        {
          // maxHorizonMinus: -(size.width + 58),
          ngIf: 3.45 * size.height,
          right: 'card2',
          flip: 4.3 * size.height,
          url: 'SCHEMA_Renaissance',
          name: 'home.gameplay.cards.renaissance.name',
          descriptif: 'home.gameplay.cards.renaissance.descriptif',
          color: '#3a4042',
        },
        {
          // maxHorizonMinus: -(size.width + 36),
          ngIf: 4.5 * size.height,
          right: 'card3',
          flip: 5 * size.height,
          url: 'TACT_Intuition',
          name: 'home.gameplay.cards.intuition.name',
          descriptif: '',
          color: '#3a4042',
        },
        {
          // maxHorizonMinus: -(size.width + 14),
          ngIf: 5.1 * size.height,
          right: 'card4',
          flip: 5.4 * size.height,
          url: 'magmaganda',
          name: 'home.gameplay.cards.magmaganda.name',
          descriptif: 'home.gameplay.cards.magmaganda.descriptif',
          color: 'white',
        },
        {
          // maxHorizonMinus: -(size.width + 50),
          ngIf: 5.7 * size.height,
          right: 'card5',
          flip: 6 * size.height,
          url: 'PERSO_pirateCybernetique',
          name: 'home.gameplay.cards.pirate.cybernetique.name',
          descriptif: 'home.gameplay.cards.pirate.cybernetique.descriptif',
          color: '#3a4042',
        },
        {
          // maxHorizonMinus: -(size.width + 50),
          ngIf: 6.3 * size.height,
          right: 'card6',
          flip: 6.6 * size.height,
          url: 'double_blaster',
          name: 'home.gameplay.cards.double_blaster.name',
          descriptif: 'home.gameplay.cards.double_blaster.descriptif',
          color: 'white',
        },
        {
          // maxHorizonMinus: -(size.width + 50),
          ngIf: 6.9 * size.height,
          right: 'card7',
          flip: 7.3 * size.height,
          url: 'retour_flammes',
          name: 'home.gameplay.cards.retour_flammes.name',
          descriptif: 'home.gameplay.cards.retour_flammes.descriptif',
          color: '#3a4042',
        },
      ];
    } else {
      this.cards = [
        {
          flip: 1.8 * size.height,
          url: 'ATT_JenaipasFini',
        },
        {
          flip: 1.9 * size.height,
          url: 'SCHEMA_Renaissance',
        },
        {
          flip: 2 * size.height,
          url: 'TACT_Intuition',
        },
      ];
    }
  }

  public scrollToEnd(): void {
    window.scrollTo({ top: 6.5 * this.windowSize.height, behavior: 'smooth' });
  }

  rotation(scroll: number): void {
    let oldScrolling = this.scrolling;
    this.scrolling = scroll;
    let up = oldScrolling < this.scrolling;
    if (
      scroll > 3.8 * this.windowSize.height &&
      scroll < 4.52 * this.windowSize.height
    ) {
      up ? this.rotating(1) : this.rotating(0);
    } else if (
      scroll > 4.52 * this.windowSize.height &&
      scroll < 5.23 * this.windowSize.height
    ) {
      up ? this.rotating(2) : this.rotating(1);
    } else if (
      scroll > 5.23 * this.windowSize.height &&
      scroll < 5.95 * this.windowSize.height
    ) {
      up ? this.rotating(3) : this.rotating(2);
    } else if (
      scroll > 5.95 * this.windowSize.height &&
      scroll < 6.1 * this.windowSize.height
    ) {
      up ? this.rotating(4) : this.rotating(3);
    }
  }

  private rotating(level: number): void {
    this.rotateState = level.toString();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cardsAnimationDone = false;
  }
}
