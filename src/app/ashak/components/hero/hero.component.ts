import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import {
  blurInOut,
  fadeInOut,
  letterSpacing,
  slideInBottomSlow,
  slideInRight,
  slideInTopFast,
  slideInTopSlow,
} from 'src/app/animations/animations';
import { AshakService } from 'src/app/shared/services/ashak.service';
import { ashakUrl } from 'src/app/store/actions/app.actions';
import { getAshak, getAshakUrl } from 'src/app/store/selectors/app.selectors';
import { HorizontalParallaxDirective } from '../../../directives/horizontal-parallax.directive';
import { verticalParallaxDirective } from '../../../directives/verticalParallax.directive';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { BoardComponent } from './components/board/board.component';
import { Ashak } from 'src/app/shared/models/Ashak';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    slideInTopFast,
    blurInOut,
    slideInRight,
    fadeInOut,
    letterSpacing,
    trigger('trueFalseAnimation', [
      transition('false => true', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 })),
      ]),
      transition('true => false', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 })),
      ]),
    ]),
    trigger('opacitySlowTrue', [
      transition('false => true', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
      transition('true => false', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
    ]),
    trigger('blur', [
      transition('false => true', [
        style({ filter: 'blur(4px)' }),
        animate(700, style({ filter: 'blur(0px)' })),
      ]),
      transition('true => false', [
        style({ filter: 'blur(4px)' }),
        animate(700, style({ filter: 'blur(0px)' })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    verticalParallaxDirective,
    NgClass,
    HorizontalParallaxDirective,
    AsyncPipe,
    TranslateModule,
    BoardComponent,
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  ashak: any;

  chosenAshak = '';

  theme$: Observable<string>;

  animationSwitch: boolean;
  selectedAshak: Ashak;
  skillActive: boolean;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  ashakNotFound: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ashaks = [
    'atmos',
    'xhan',
    'orus',

    'qikaa',
    'phae',

    'yosh',
    'gyaleis',
    'renko',
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private ashakService: AshakService,
    private observer: BreakpointObserver,
    private location: Location
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(param => {
      this.ashak = Object.values(param).toString();
      this.store.dispatch(ashakUrl({ ashakUrl: this.ashak }));
      this.fetchAshakByName(this.ashak);
      this.animationSwitch = !this.animationSwitch;
      this.ashakNotFound = this.checkAshak();
      window.scrollTo({ top: 0 });
    });
    this.theme$ = this.store.select(getAshak);
    this.store
      .select(getAshakUrl)
      .pipe(
        tap(ashak => {
          this.ashak = ashak;
          this.fetchAshakByName(this.ashak);
          this.animationSwitch = !this.animationSwitch;
          this.location.go('/rivals/ashaks/' + ashak);
          this.ashakNotFound = this.checkAshak();
        })
      )
      .subscribe();
  }

  public onAshakClick(ashak: string): void {
    this.store.dispatch(ashakUrl({ ashakUrl: ashak }));
  }


  fetchAshakByName(ashak: string): void {
    this.ashakService
      .fetchByName(ashak)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(ashak => {
        this.selectedAshak = ashak;
      });
  }

  checkAshak(): boolean {
    return this.ashaks.filter(ashak => ashak === this.ashak).length === 0;
  }
}
