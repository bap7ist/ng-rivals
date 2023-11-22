import { AsyncPipe } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, ReplaySubject, fromEvent, map, takeUntil } from 'rxjs';
import {
  fadeInOut,
  slideInLeft,
  slideInTopSlow,
} from 'src/app/animations/animations';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { FreeDraggingDirective } from '../../../directives/free-dragging.directive';
import { HorizontalParallaxDirective } from '../../../directives/horizontal-parallax.directive';

@Component({
  selector: 'app-ashak-board',
  templateUrl: './ashak-board.component.html',
  styleUrls: ['./ashak-board.component.scss'],
  animations: [slideInLeft, slideInTopSlow, fadeInOut],
  standalone: true,
  imports: [
    HorizontalParallaxDirective,
    FreeDraggingDirective,
    AsyncPipe,
    TranslateModule,
  ],
})
export class AshakBoardComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  windowHeight$: Observable<number>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  viewHeight: number;
  isInit: boolean;
  showArrow: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    window.dispatchEvent(new Event('resize'));
    if (window.scrollY > 0.8 * this.viewHeight) {
      this.isInit = true;
      setTimeout(() => {
        this.showArrow = true;
      }, 700);
    }
  }

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(viewHeight => (this.viewHeight = viewHeight));
    this.ashak$ = this.store.select(getAshak);
  }

  goToWildtech(): void {
    setTimeout(() => {
      console.log('oruuuuus')
      this.router.navigate(['rivals/gameplay/wildtech']);
    }, 200);
  }

  initHeight() {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }
}
