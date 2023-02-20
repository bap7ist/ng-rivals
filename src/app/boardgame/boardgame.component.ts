import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { fromEvent, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
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
export class BoardgameComponent implements OnInit {
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

  constructor(private store: Store, private observer: BreakpointObserver) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    window.dispatchEvent(new Event('resize'));
    this.isInit = window.scrollY < 0.3 * this.viewHeight;
  }

  ngOnInit(): void {
    window.scrollTo({top: 0})
    this.initHeight();
    this.windowHeight$.subscribe(
      (viewHeight) => (this.viewHeight = viewHeight)
    );
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.isInit = true;
    }, 300);
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
