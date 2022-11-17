import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import {
  fadeInOut,
  slideInLeft,
  slideInTopSlow,
} from 'src/app/animations/animations';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-ashak-board',
  templateUrl: './ashak-board.component.html',
  styleUrls: ['./ashak-board.component.scss'],
  animations: [slideInLeft, slideInTopSlow, fadeInOut],
})
export class AshakBoardComponent implements OnInit {
  ashak$: Observable<string>;
  windowHeight$: Observable<number>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  viewHeight: number;
  isInit: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    window.dispatchEvent(new Event('resize'));
    if (window.scrollY > 0.8 * this.viewHeight) {
      this.isInit = true;
    }
  }

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$.subscribe(
      (viewHeight) => (this.viewHeight = viewHeight)
    );
    this.ashak$ = this.store.select(getAshak);
  }

  goToWildtech(): void {
    setTimeout(() => {
      this.router.navigate(['../wildtech'], { relativeTo: this.route });
    }, 200);
  }

  initHeight() {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }
}
