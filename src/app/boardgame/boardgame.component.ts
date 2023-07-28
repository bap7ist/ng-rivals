import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {
  fromEvent,
  map,
  Observable,
  ReplaySubject,
  Subscription,
  takeUntil,
} from 'rxjs';
import {
  fadeInOut,
  slideInBottomSlow,
  slideInTopSlow,
} from '../animations/animations';
import { getAshak } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.scss'],
  animations: [fadeInOut, slideInTopSlow, slideInBottomSlow],
})
export class BoardgameComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  isInit: boolean;

  windowHeight$: Observable<number>;
  viewHeight: number;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  animation1: AnimationOptions = {
    path: '/assets/animations/qikaa_wildtech_walking.json',
  };
  animation2: AnimationOptions = {
    path: '/assets/animations/use-skill-card.json',
  };
  animation3: AnimationOptions = {
    path: '/assets/animations/use-ant.json',
  };
  animation4: AnimationOptions = {
    path: '/assets/animations/cards_anim.json',
  };
  animation5: AnimationOptions = {
    path: '/assets/animations/use-mod.json',
  };
  animation6: AnimationOptions = {
    path: '/assets/animations/zone.json',
  };
  animation7: AnimationOptions = {
    path: '/assets/animations/Play-TableTop-Simulator.json',
  };

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  private routerSubscription: Subscription;

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
    window.scrollTo({ top: 0 });
    this.initHeight();
    this.windowHeight$.subscribe(
      (viewHeight) => (this.viewHeight = viewHeight)
    );
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.isInit = true;
    }, 300);

    if (this.router.url === '/gameplay/wildtech') {
      window.scrollTo({ top: 2000 });
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
