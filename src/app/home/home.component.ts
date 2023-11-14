import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { fadeInOut } from '../animations/animations';
import { getAshak, getNavigation } from '../store/selectors/app.selectors';
import { ModalServiceService } from '../shared/services/modal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut],
})
export class HomeComponent implements OnInit, OnDestroy {
  ashak$: Observable<string>;
  loading: boolean;
  actuIsHover: string;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  actus: Array<{
    id: string;
    factor: number;
    name: string;
    descriptif: string;
    date?: string;
    url?: string;
  }> = [
    {
      id: 'backerkit',
      factor: -1,
      name: 'home.actu.first_news.title',
      descriptif: 'home.actu.first_news.descriptif',
      date: 'home.actu.first_news.date',
      url: 'https://rivals-unkindgames.backerkit.com/hosted_preorders/',
    },
    {
      id: 'phae',
      factor: 100,
      name: 'home.actu.second_news.title',
      descriptif: 'home.actu.second_news.descriptif',
      date: 'home.actu.second_news.date',
      url: '#/ashaks/phae',
    },
    {
      id: 'lore',
      factor: 1,
      name: 'home.actu.third_news.title',
      descriptif: 'home.actu.third_news.descriptif',
      url: '/#/medias/stories',
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
      .subscribe((navigation) => {
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

  openModal(modalTemplate: TemplateRef<any>, id: number): void {
    this.modalService
      .open(modalTemplate, { id: id })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
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
