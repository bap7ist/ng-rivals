import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common';
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
import { BattleroyaleComponent } from './components/battleroyale/battleroyale.component';
import { CardsSectionComponent } from './components/cards-section/cards-section.component';
import { DescriptionComponent } from './components/description/description.component';
import { LandingComponent } from './components/landing/landing.component';
import { UniversComponent } from './components/univers/univers.component';
import { BoutiqueService } from '../shared/services/boutique.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut],
  standalone: true,
  imports: [
    LandingComponent,
    WidthDirective,
    HorizontalParallaxDirective,
    NgClass,
    OpacityDirective,
    VideoModalComponent,
    DescriptionComponent,
    CardsSectionComponent,
    BattleroyaleComponent,
    UniversComponent,
    FooterComponent,
    AsyncPipe,
    UpperCasePipe,
    TranslateModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  loading: boolean;
  actuIsHover: string;

  public boutiqueService = inject(BoutiqueService);

  readonly RIVALS: string = '/rivals';

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  actus: Array<{
    id: string;
    factor: number;
    name: string;
    descriptif: string;
    date?: string;
    url?: string;
    active?: boolean;
    boutique?: boolean;
  }> = [
    {
      id: 'noel',
      factor: -1,
      name: 'home.actu.first_news.title',
      descriptif: 'home.actu.first_news.descriptif',
      date: 'home.actu.first_news.date',
      active: false,
      url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
    },
    {
      id: 'boutique',
      factor: 100,
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
}
