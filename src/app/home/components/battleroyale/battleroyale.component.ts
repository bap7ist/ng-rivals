import { Component, HostListener, Input, OnInit } from '@angular/core';
import { fromEvent, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import {
  fadeInOut,
  fadeInOutFast,
  slideInLeft,
} from 'src/app/animations/animations';

@Component({
  selector: 'app-battleroyale',
  templateUrl: './battleroyale.component.html',
  styleUrls: ['./battleroyale.component.scss'],
  animations: [slideInLeft, fadeInOutFast, fadeInOut],
})
export class BattleroyaleComponent implements OnInit {
  tiles: Array<any>;
  scroll$: Observable<number>;
  tokenMove: string;
  cancelAnimation: boolean;
  viewHeight: number;

  windowHeight$: Observable<number>;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() ashak: string;

  constructor() {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    if (!this.cancelAnimation) {
      if (window.scrollY < 6.6 * this.viewHeight) {
        this.tokenMove = '42%';
        this.tiles[2].face = false;
        this.tiles[4].face = false;
        this.tiles[7].face = false;
      }
      if (window.scrollY >= 6.6 * this.viewHeight) {
        this.tokenMove = '34.5%';
      }
      if (window.scrollY >= 6.6 * this.viewHeight) {
        this.tiles[2].face = true;
        this.tiles[4].face = true;
        this.tiles[7].face = true;
      }
    }
  }

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$.subscribe((height) => (this.viewHeight = height));
    window.dispatchEvent(new Event('resize'));
    this.tokenMove = '42%';
    this.initTiles();
  }

  initTiles(): void {
    this.tiles = [
      {
        x: '0%',
        y: '-10%',
        id: '1',
        face: false,
        hover: false,
      },
      {
        x: '14.9%',
        y: '-10%',
        id: '2',
        face: false,
        hover: false,
      },
      {
        x: '29.8%',
        y: '-10%',
        id: '3',
        face: false,
        hover: false,
      },
      {
        x: '3.7%',
        y: '2.8%',
        id: '4',
        spin: true,
        face: false,
        hover: false,
      },
      {
        x: '18.6%',
        y: '2.8%',
        id: '5',
        spin: true,
        face: false,
        hover: false,
      },
      {
        x: '33.5%',
        y: '2.8%',
        id: '6',
        spin: true,
        face: true,
        hover: false,
      },
      {
        x: '11.1%',
        y: '9.3%',
        id: '7',
        face: false,
        hover: false,
      },
      {
        x: '26%',
        y: '9.3%',
        id: '8',
        face: false,
        hover: false,
      },
    ];
  }

  initHeight() {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }
}
