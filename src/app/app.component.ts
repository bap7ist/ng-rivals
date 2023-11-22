import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  LOCALE_ID,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import {
  fadeInOutFast,
  fadeOut,
  slideInLeft,
  slideInTopFast,
} from './animations/animations';
import { getAshak } from './store/selectors/app.selectors';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInLeft, fadeInOutFast, slideInTopFast, fadeOut],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  currentRoute: string;
  selectedLanguage: string;

  constructor(
    private store: Store,
    private router: Router,
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    // this.selectedLanguage = languageService.language();
    console.log = (arg: string) => {
      if (arg.includes('hello world')) {
        console.warn('Le message a été détecté')
      }
    }
  }

  language: string;
  showLanguage: boolean;
  showPanel: boolean;
  loading: boolean;
  ashak$: Observable<string>;
  isLoading: boolean = true;

  showNavbar: boolean = false;

  unsubscribe$ = new Subject<void>();

  currentURL: string;
  private routerSubscription: Subscription;
  public currentURLSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        const currentRoute = this.route.root.firstChild;
        if (currentRoute) {
          this.showNavbar = currentRoute.snapshot.data['showNavBar'] !== false;
        }
      });

    this.loading = true;
    this.ashak$ = this.store.select(getAshak);
    this.showLanguage = false;
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentURLSubject.next(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:load')
  onLoad() {
    this.isLoading = false;
  }

  // selectLanguage(lang: string): void {
  //   this.store.dispatch(languageChoice({ language: lang }));
  //   this.getLanguage();
  //   this.showLanguage = !this.showLanguage;
  // }

  // getLanguage(): void {
  //   this.store
  //     .select(getLanguage)
  //     .pipe(take(1))
  //     .subscribe(lang => {
  //       this.language = lang;
  //     });
  // }
}
