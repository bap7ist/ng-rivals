import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  fadeInOut,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';

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
  scroll$: Observable<number>;

  front: boolean;
  opacity: string;
  y: string;
  maxHorizon: number;
  rotateState: string = '0';
  scrolling: number;

  cards: Array<any>;

  windowWidth$: Observable<number>;

  constructor() {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    let opa = (window.scrollY - 1285) / 4;
    this.opacity = (opa / 10 / 10).toString();
    this.rotation(window.scrollY);
  }

  @HostListener('window:resize')
  onResize() {
    this.windowWidth$ = of(window.innerWidth)
  }

  ngOnInit(): void {
    this.maxHorizon = -1402;
    this.windowWidth$ = of(window.innerWidth)
    this.initCards();
  }

  initCards(): void {
    this.windowWidth$.subscribe((windowWidth) => {
      this.cards = [
        {
          maxHorizonMinus: -(windowWidth + 80),
          ngIf: 2300,
          right: 340,
          flip: 3200,
          url: 'ATT_JenaipasFini',
        },
        {
          maxHorizonMinus: -(windowWidth + 58),
          ngIf: 2900,
          right: 540,
          flip: 3800,
          url: 'SCHEMA_Renaissance',
        },
        {
          maxHorizonMinus: -(windowWidth + 36),
          ngIf: 3500,
          right: 740,
          flip: 4400,
          url: 'TACT_Intuition',
        },
        {
          maxHorizonMinus: -(windowWidth + 14),
          ngIf: 4100,
          right: 940,
          flip: 5000,
          url: 'PERSO_pirateCybernetique',
        },
      ];
    });
  }

  rotation(scroll: number): void {
    let oldScrolling = this.scrolling;
    this.scrolling = scroll;
    let up = oldScrolling < this.scrolling;
    if (scroll > 2300 && scroll < 3200) {
      up ? this.rotating(1) : this.rotating(0);
    } else if (scroll > 3200 && scroll < 4100) {
      up ? this.rotating(2) : this.rotating(1);
    } else if (scroll > 4300 && scroll < 5000) {
      up ? this.rotating(3) : this.rotating(2);
    }
  }

  private rotating(level: number): void {
    this.rotateState = level.toString();
  }
}
