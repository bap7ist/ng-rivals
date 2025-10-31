import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
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
  fadeInOutFast,
  slideInBottomSlow,
  slideInTopSlow,
} from '../animations/animations';
import { verticalParallaxDirective } from '../directives/verticalParallax.directive';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { getAshak, getLanguage } from '../store/selectors/app.selectors';
import { SeoService } from '../core/seo.service';
import { Button2Component } from '../shared/components/button-2/button-2.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';
import { RecolteComponent } from './components/recolte/recolte.component';
import { DeckbuildingSectionComponent } from './components/deckbuilding-section/deckbuilding-section.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.scss'],
  animations: [fadeInOutFast, slideInTopSlow, slideInBottomSlow],
  imports: [
    verticalParallaxDirective,
    AsyncPipe,
    TranslateModule,
    NgClass,
    RecolteComponent,
    DeckbuildingSectionComponent,
    RouterLink
  ],
})
export class BoardgameComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  isInit: boolean;

  public iamBeginner = signal(false);

  windowHeight$: Observable<number>;
  viewHeight: number;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  private _languageService = inject(LanguageService);
    public isFrench = computed(() => this._languageService.currentLanguageChange() === 'fr');

  private routerSubscription: Subscription;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private _seoService = inject(SeoService);

  public step = signal(1);

  public combatStep = signal(1);

  private readonly route = inject(ActivatedRoute);

  public router = inject(Router);

  constructor(
    private store: Store,
    private observer: BreakpointObserver
  ) {
    effect(() => {
      const currentStep = this.step();
      this._updateUrlWithoutReload(currentStep);
    });
  }

  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
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

    this._updateStepFromUrl();
  }

  private _updateStepFromUrl(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const stepParam = params['step'];
        if (stepParam && !isNaN(Number(stepParam))) {
          const newStep = Number(stepParam);
          if (this.step() !== newStep) {
            this.step.set(newStep);
          }
        }
      });
  }

  private _updateUrlWithoutReload(step: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step },
      queryParamsHandling: 'merge',
      replaceUrl: true,
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

  public nextStep(): void {
    this.step.update(step => step + 1);
  }

  public goToStep(step: number): void {
    this.step.set(step);
  }

  public goToCombatStep(step: number): void {
    this.combatStep.set(step);
  }

  public previousCombatStep(): void {
    if (this.combatStep() > 1) 
    this.combatStep.update(step => step - 1);
  }

  public nextCombatStep(): void {
    if (this.combatStep() < 4) 
    this.combatStep.update(step => step + 1);
  }
}
