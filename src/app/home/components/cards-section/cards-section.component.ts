import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { fromEvent, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import {
  fadeInOut,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss'],
  animations: [
    slideInLeft,
    slideInRight,
    fadeInOut,
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
export class CardsSectionComponent implements OnInit {
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

  viewWidth: number;
  viewHeight: number;

  // Elements scroll
  gameplayElementsScroll: number;
  setLeft: number;

  cards: Array<any>;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    this.rotation(window.scrollY);
    window.dispatchEvent(new Event('resize'));
    let opa = (window.scrollY - 1.5 * this.viewHeight) / 4;
    this.opacity = (opa / 100).toString();
  }

  ngOnInit(): void {
    this.initWidthHeight();
    combineLatest([this.windowWidth$, this.windowHeight$]).subscribe(
      ([windowWith, windowHeight]) => {
        this.viewWidth = windowWith;
        this.viewHeight = windowHeight;
      }
    );
    window.dispatchEvent(new Event('resize'));
    this.initCards(this.viewHeight, this.viewWidth);
  }

  initWidthHeight() {
    this.windowWidth$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerWidth)
    );
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }

  initCards(height: number, width: number): void {
    if (!this.isMobile) {
      this.cards = [
        {
          maxHorizonMinus: -(width + 80),
          ngIf: 2.74 * height,
          right: Math.round(0.23 * width),
          flip: 3.8 * height,
          url: 'ATT_JenaipasFini',
        },
        {
          maxHorizonMinus: -(width + 58),
          ngIf: 3.45 * height,
          right: Math.round(0.367 * width),
          flip: 4.52 * height,
          url: 'SCHEMA_Renaissance',
        },
        {
          maxHorizonMinus: -(width + 36),
          ngIf: 4.16 * height,
          right: Math.round(0.5 * width),
          flip: 5.23 * height,
          url: 'TACT_Intuition',
        },
        {
          maxHorizonMinus: -(width + 14),
          ngIf: 4.88 * height,
          right: Math.round(0.64 * width),
          flip: 5.95 * height,
          url: 'PERSO_pirateCybernetique',
        },
      ];
    } else {
      this.cards = [
        {
          flip: 1.9 * height,
          url: 'ATT_JenaipasFini',
        },
        {
          flip: 2 * height,
          url: 'SCHEMA_Renaissance',
        },
        {
          flip: 2.1 * height,
          url: 'TACT_Intuition',
        },
      ];
    }
  }

  rotation(scroll: number): void {
    let oldScrolling = this.scrolling;
    this.scrolling = scroll;
    let up = oldScrolling < this.scrolling;
    if (scroll > 3.8 * this.viewHeight && scroll < 4.52 * this.viewHeight) {
      up ? this.rotating(1) : this.rotating(0);
    } else if (
      scroll > 4.52 * this.viewHeight &&
      scroll < 5.23 * this.viewHeight
    ) {
      up ? this.rotating(2) : this.rotating(1);
    } else if (
      scroll > 5.23 * this.viewHeight &&
      scroll < 5.95 * this.viewHeight
    ) {
      up ? this.rotating(3) : this.rotating(2);
    } else if (
      scroll > 5.95 * this.viewHeight &&
      scroll < 6.1 * this.viewHeight
    ) {
      up ? this.rotating(4) : this.rotating(3);
    }
  }

  private rotating(level: number): void {
    this.rotateState = level.toString();
  }
}
