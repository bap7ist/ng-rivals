import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { fadeInOut } from '../animations/animations';
import { HorizontalParallaxDirective } from '../directives/horizontal-parallax.directive';
import { OpacityDirective } from '../directives/opacity.directive';
import { WidthDirective } from '../directives/width.directive';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { VideoModalComponent } from '../shared/components/modals/video-modal/video-modal.component';
import { ModalServiceService } from '../shared/services/modal-service.service';
import { getAshak, getNavigation } from '../store/selectors/app.selectors';
import { DescriptionComponent } from './components/description/description.component';
import { LandingComponent } from './components/landing/landing.component';
import { BoutiqueService } from '../shared/services/boutique.service';
import { DeckbuildComponent } from './components/deckbuild/deckbuild.component';
import { LoreComponent } from './components/lore/lore.component';
import { BattleComponent } from './components/battle/battle.component';
import { Lore2Component } from './components/lore-2/lore-2.component';
import { TilesComponent } from './components/tiles/tiles.component';
import { AshaksComponent } from './components/ashaks/ashaks.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
} from '@angular/animations';
import { AshaksMobileComponent } from "./components/ashaks/ashaks-mobile/ashaks-mobile.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInOut,
    trigger('slideAnimation', [
      transition(':increment', [
        style({ position: 'relative' }),
        group([
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(-100%)', opacity: 0 })
          ),
          query(
            ':enter',
            [
              style({ position: 'absolute', top: 0, right: '-100%' }),
              animate('300ms ease-out', style({ right: '0' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition(':decrement', [
        style({ position: 'relative' }),
        group([
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(100%)', opacity: 0 })
          ),
          query(
            ':enter',
            [
              style({ position: 'absolute', top: 0, left: '-100%' }),
              animate('300ms ease-out', style({ left: '0' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    LandingComponent,
    WidthDirective,
    HorizontalParallaxDirective,
    NgClass,
    OpacityDirective,
    VideoModalComponent,
    DescriptionComponent,
    FooterComponent,
    AsyncPipe,
    UpperCasePipe,
    DeckbuildComponent,
    LoreComponent,
    BattleComponent,
    Lore2Component,
    TranslateModule,
    AshaksComponent,
    ScrollingModule,
    AshaksMobileComponent
],
})
export class HomeComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  loading: boolean;
  actuIsHover: string;

  public step = 0;

  public boutiqueService = inject(BoutiqueService);

  readonly RIVALS: string = '/rivals';

  public badges = [
    {
      id: 1,
      name: 'home.battle.badge.1',
      image: '../../../../assets/img/br/logo_rivals.png',
    },
    {
      id: 2,
      name: 'home.battle.badge.2',
      image: '../../../../assets/img/br/logo_competence.png',
    },
    {
      id: 3,
      name: 'home.battle.badge.3',
      image: '../../../../assets/img/br/logo_pioche.png',
    },
    {
      id: 4,
      name: 'home.battle.badge.4',
      image: '../../../../assets/img/br/logo_anticipation.png',
    },
    {
      id: 5,
      name: 'home.battle.badge.5',
      image: '../../../../assets/img/br/logo_dead.png',
    },
  ];

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  actus: Array<{
    id: string;
    factor: number;
    name: string;
    type: string;
    descriptif: string;
    date?: string;
    url?: string;
    active?: boolean;
    boutique?: boolean;
  }> = [
    {
      id: 'janv2025',
      factor: -1,
      type: 'unkind.shop',
      name: 'home.actu.first_news.title',
      descriptif: 'home.actu.first_news.descriptif',
      date: 'home.actu.first_news.date',
      active: false,
      url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
    },
    {
      id: 'boutique',
      factor: 100,
      type: 'unkind.shop',
      name: 'home.actu.second_news.title',
      descriptif: 'home.actu.second_news.descriptif',
      date: 'home.actu.second_news.date',
      url: `https://www.utopiales.org/festival-international-de-science-fiction/`,
      active: true,
      boutique: true,
    },
    {
      id: 'lore_3',
      factor: 1,
      type: 'Lore',
      name: 'home.actu.third_news.title',
      descriptif: 'home.actu.third_news.descriptif',
      url: `#/${this.RIVALS}/medias/stories`,
      active: true,
    },
  ];

  scroll$: Observable<number>;
  opacity: string;
  windowWidth$: Observable<number>;
  windowHeight$: Observable<number>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  currentIndex = 0;

  animationState: string = '';

  slides: any[] = [];
  currentSlide: number = 0;
  slideState: 'current' | 'next' | 'previous' = 'current';

  direction: 'left' | 'right' = 'left';
  previousSlide = -1;

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartTime: number = 0;
  private readonly SWIPE_THRESHOLD = 50;
  private readonly TAP_THRESHOLD = 200; // milliseconds

  constructor(
    private store: Store,
    private observer: BreakpointObserver,
    private modalService: ModalServiceService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @ViewChild('histoire', { static: true }) histoire: ElementRef;
  @ViewChild('accueil', { static: true }) accueil: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    this.scroll$ = of(window.scrollY);
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.loading = true;
    this.ashak$ = this.store.select(getAshak);

    this.store
      .select(getNavigation)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(navigation => {
        if (navigation !== null || navigation !== undefined) {
          switch (navigation) {
            case 'histoire':
              this.histoire.nativeElement.scrollIntoView({
                behavior: 'smooth',
              });
              break;
            case 'accueil':
              this.accueil.nativeElement.scrollIntoView({ behavior: 'smooth' });
              break;
          }
        }
      });
  }

  public goToBoutique(): void {
    this.boutiqueService.setBoutiquePanel(true);
  }

  public nextStep(): void {
    if (this.step === this.actus.length - 1) return;
    this.step++;
    if (this.step >= this.actus.length) {
      this.step = 0;
    }
  }

  public previousStep(): void {
    if (this.step === 0) return;
    this.step--;
    if (this.step < 0) {
      this.step = this.actus.length - 1;
    }
  }

  public setStep(index: number) : void {
    this.step = index;
  }

  public goToActu(): void {
    if (this.actus[this.step].boutique) {
      this.goToBoutique();
    } else {
      window.open(this.actus[this.step].url, '_blank');
    }
  }

  getSlideState(index: number) {
    if (index === this.currentSlide) {
      return 'current';
    } else if (this.direction === 'left' && index === this.previousSlide) {
      return 'previous';
    } else if (this.direction === 'right' && index === this.previousSlide) {
      return 'next';
    }
    return this.direction === 'left' ? 'next' : 'previous';
  }

  openModal(modalTemplate: TemplateRef<any>, id: number): void {
    this.modalService
      .open(modalTemplate, { id: id })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(action => {
        console.log('modalAction', action);
      });
  }

  onReturnFromLoader(): void {
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.loading = false;
    }, 500);
    window.scrollTo({ top: 0 });
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartTime = Date.now();
  }

  onTouchMove(event: TouchEvent) {
    // On supprime le preventDefault() pour permettre le scroll naturel
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    const touchEndTime = Date.now();
    const swipeDistance = Math.abs(this.touchEndX - this.touchStartX);
    const touchDuration = touchEndTime - this.touchStartTime;

    if (swipeDistance > this.SWIPE_THRESHOLD) {
      // C'est un swipe
      if (this.touchEndX > this.touchStartX) {
        this.previousStep();
      } else {
        this.nextStep();
      }
    } else if (swipeDistance < 10 && touchDuration < this.TAP_THRESHOLD) {
      // C'est un tap rapide
      this.goToActu();
    }
  }
}
