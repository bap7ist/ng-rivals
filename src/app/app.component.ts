import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import {
  fadeInOutFast,
  fadeOut,
  slideInLeft,
  slideInTopFast,
} from './animations/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SidePanelComponent } from './shared/components/side-panel/side-panel.component';
import { getAshak } from './store/selectors/app.selectors';
import { BoutiqueService } from './shared/services/boutique.service';
import { AlertComponent } from './ux/alert/alert.component';
import { ModalComponent } from './ux/modal/modal.component';
import { MobileMenuComponent } from './shared/components/mobile-menu/mobile-menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInLeft, fadeInOutFast, slideInTopFast, fadeOut],
    imports: [
        LoaderComponent,
        NavbarComponent,
        // SidePanelComponent,
        RouterOutlet,
        AsyncPipe,
        AlertComponent,
        ModalComponent,
        MobileMenuComponent
    ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  currentRoute: string;
  selectedLanguage: string;

  public boutiqueService = inject(BoutiqueService);

  public menuOpen = signal<boolean>(false);

  public boutiquePanelPosition$ = this.boutiqueService.isActive$;

  constructor(
    private store: Store,
    private router: Router,
    private observer: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

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
}
