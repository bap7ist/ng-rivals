import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { fromEvent, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import {
  fadeInOut,
  fadeInOutFast,
  slideInBottomSlow,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { getNavigation } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-battleroyale',
  templateUrl: './battleroyale.component.html',
  styleUrls: ['./battleroyale.component.scss'],
  animations: [slideInLeft, fadeInOutFast, fadeInOut],
})
export class BattleroyaleComponent implements OnInit, OnDestroy {
  tiles: Array<any>;
  scroll$: Observable<number>;
  tokenMove: string;
  cancelAnimation: boolean;
  viewHeight: number;

  options: AnimationOptions = {
    path: '/assets/animations/full_game.json',
  };

  windowHeight$: Observable<number>;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() ashak: string;
  @Input() isMobile: boolean;

  constructor(private router: Router, private store: Store) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    if (!this.cancelAnimation && !this.isMobile) {
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
    this.windowHeight$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((height) => (this.viewHeight = height));
    window.dispatchEvent(new Event('resize'));
    this.tokenMove = '42%';
    this.initTiles();
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  initTiles(): void {
    if (!this.isMobile) {
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
    } else {
      this.tiles = [
        {
          x: '0%',
          y: '-20%',
          id: '1',
          face: false,
        },
        {
          x: '33%',
          y: '-20%',
          id: '2',
          face: true,
        },
        {
          x: '25%',
          y: '8.5%',
          id: '5',
          spin: true,
          face: false,
        },
        {
          x: '58.33%',
          y: '8.5%',
          id: '6',
          spin: true,
          face: false,
        },
        {
          x: '8.6%',
          y: '23%',
          id: '7',
          face: false,
        },
        {
          x: '41.5%',
          y: '23%',
          id: '8',
          face: false,
        },
      ];
    }
  }

  initHeight() {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }

  goToWildtech(): void {
    this.router.navigate(['/gameplay/wildtech']);
  }

  goToAshaks(): void {
    this.router.navigate(['/ashaks/home']);
  }
}
