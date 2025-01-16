import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs';
import {
  fadeInOut,
  slideInBottomSlow,
  slideInTopSlow,
} from '../animations/animations';
import { verticalParallaxDirective } from '../directives/verticalParallax.directive';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { getAshak, getLanguage } from '../store/selectors/app.selectors';
import { AshakBoardComponent } from './components/ashak-board/ashak-board.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.scss'],
  animations: [fadeInOut, slideInTopSlow, slideInBottomSlow],
  imports: [
    verticalParallaxDirective,
    NgClass,
    FooterComponent,
    AsyncPipe,
    TranslateModule,
    AshakBoardComponent,
    WildtechComponent,
  ],
})
export class BoardgameComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  isInit: boolean;

  windowHeight$: Observable<number>;
  viewHeight: number;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  isFrench$: Observable<string> = this.store.select(getLanguage);

  private routerSubscription: Subscription;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private _seoService = inject(SeoService);

  constructor(
    private router: Router,
    private store: Store,
    private observer: BreakpointObserver
  ) {}

  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    window.dispatchEvent(new Event('resize'));
    this.isInit = window.scrollY < 0.3 * this.viewHeight;
  }

  ngOnInit(): void {
    this._seoService.updateBoardGamePage({
      title: 'Règles du jeu',
      description:
        'Apprenez à jouer à Rivals. Guide complet des règles, mécaniques de deck-building, et stratégies pour maîtriser les Ashaks.',
      gameImage: 'https://unkindgames.com/assets/images/rules-guide.jpg',
      category: 'Game Rules',
    });
    window.scrollTo({ top: 0 });
    this.initHeight();
    this.windowHeight$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(viewHeight => (this.viewHeight = viewHeight));
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.isInit = true;
    }, 300);

    if (this.router.url === '/gameplay/wildtech') {
      window.scrollTo({ top: 2000 });
    }

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/gameplay/wildtech') {
          window.scrollTo({ top: 2000, behavior: 'smooth' });
        } else if (event.url === '/gameplay/ashak-board') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  initHeight() {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }
}
