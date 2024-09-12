import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  fromEvent,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  takeUntil,
} from 'rxjs';
import { fadeInOut, fadeInOutExtraFast } from 'src/app/animations/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgStyle, UpperCasePipe } from '@angular/common';
import { HeightDirective } from '../../../directives/height.directive';
import { WidthDirective } from '../../../directives/width.directive';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { verticalParallaxDirective } from '../../../directives/verticalParallax.directive';

@Component({
    selector: 'app-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
    animations: [fadeInOut, fadeInOutExtraFast],
    standalone: true,
    imports: [
        verticalParallaxDirective,
        ButtonComponent,
        WidthDirective,
        HeightDirective,
        NgStyle,
        UpperCasePipe,
        TranslateModule,
    ],
})
export class DescriptionComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  increaseOpacity: string;
  decreaseOpacity: string;
  showGame: boolean;
  translateX: string;
  translateY: string;
  viewHeight: number;
  scroll$: Observable<number>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  lines: Array<{
    text: string;
    img: string;
  }>;

  windowHeight$: Observable<number>;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    if (window.scrollY > 0.4 * this.viewHeight) {
      this.increaseOpacity = ((window.scrollY * 0.2) / 100 - 1.3).toString();
    }
    if (window.scrollY < 1.3 * this.viewHeight) {
      this.translateX = ((window.scrollY * -5) / 10).toString();
      this.translateY = ((window.scrollY * -4) / 10).toString();
    }
  }

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((height) => {
        this.viewHeight = height;
      });
    window.dispatchEvent(new Event('resize'));

    this.lines = [
      {
        text: 'lines.players',
        img: '2To6',
      },
      {
        text: 'lines.age',
        img: '14plus',
      },
      {
        text: 'lines.time',
        img: 'time',
      },
      {
        text: 'lines.br',
        img: 'battleroyale',
      },
      {
        text: 'lines.deck',
        img: 'deckbuilding',
      },
      {
        text: 'lines.ressource',
        img: 'ressource',
      },
      {
        text: 'lines.map',
        img: 'map-evo',
      },
    ];
  }

  initHeight(): void {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.unsubscribe$),
      map((e: any) => e.target.innerHeight)
    );
  }

  goToGameplay(): void {
    this.router.navigate(['rivals/gameplay']);
  }
}
