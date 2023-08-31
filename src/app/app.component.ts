import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  LOCALE_ID,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subscription,
  take,
} from 'rxjs';
import {
  fadeInOutFast,
  fadeOut,
  slideInLeft,
  slideInTopFast,
} from './animations/animations';
import { languageChoice } from './store/actions/app.actions';
import { getAshak, getLanguage } from './store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInLeft, fadeInOutFast, slideInTopFast, fadeOut],
})
export class AppComponent implements OnInit, OnDestroy {
  currentRoute: string;

  constructor(
    private store: Store,
    private router: Router,
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  language: string;
  showLanguage: boolean;
  showPanel: boolean;
  loading: boolean;
  ashak$: Observable<string>;
  isLoading: boolean = true;

  showNavbar: boolean = false;

  currentURL: string;
  private routerSubscription: Subscription;
  public currentURLSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  languages = [
    {
      name: 'Français',
      id: 'fr',
    },
    {
      name: 'English',
      id: 'en',
    },
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.root.firstChild;
        if (currentRoute) {
          this.showNavbar = currentRoute.snapshot.data['showNavBar'] !== false;
        }
      });

    this.loading = true;
    this.ashak$ = this.store.select(getAshak);
    // this.selectLanguage(this.locale === 'fr-FR' ? 'fr' : 'en'); // for production
    if (localStorage.getItem('language') !== null) {
      this.selectLanguage(localStorage.getItem('language'));
    } else {
      this.selectLanguage('fr');
    }
    this.showLanguage = false;

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentURLSubject.next(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:load')
  onLoad() {
    this.isLoading = false;
  }

  selectLanguage(lang: string): void {
    this.store.dispatch(languageChoice({ language: lang }));
    this.getLanguage();
    this.showLanguage = !this.showLanguage;
  }

  getLanguage(): void {
    this.store
      .select(getLanguage)
      .pipe(take(1))
      .subscribe((lang) => {
        this.language = lang;
      });
  }
}
