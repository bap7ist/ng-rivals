import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { LanguageSwitchComponent } from '../shared/components/language-switch/language-switch.component';
import { Store } from '@ngrx/store';
import { ashakUrl } from '../store/actions/app.actions';
import { fadeIn, growFromTop, slideInRight } from '../animations/animations';
import { AuthService } from '../pages/login/services/auth.service';
import { NotificationsService } from '../pages/admin/services/notifications.service';
import { Notification } from '../shared/models/notifications';

export interface Link {
  name: string;
  link: string;
  notUrl?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [LanguageSwitchComponent, TranslateModule, RouterModule],
  animations: [growFromTop]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() showLanguage = new EventEmitter<boolean>();
  @Output() sidePanelOn = new EventEmitter<boolean>();
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Input() url$: Observable<string>;

  private _authService = inject(AuthService);

  public user = this._authService.user;

  public isAuthenticated = this._authService.isAuthenticated;

  public notifications = inject(NotificationsService);

  private unsubscribe$: Subject<void> = new Subject<void>();

  public latestNotifications = signal<Notification[] | null>(null);

  public showMenu = signal(false);

  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;

  switchModal: boolean;
  switchPanel: boolean;
  links: Link[];

  readonly RIVALS: string = '/rivals';

  private _notificationsService = inject(NotificationsService);


  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.fetchNotifications();
    this.initCountDown();
    this.links = [
      {
        name: 'gameplay',
        link: `${this.RIVALS}/gameplay`,
      },
      {
        name: 'cards',
        link: `${this.RIVALS}/gameplay/cards`,
      },
      {
        name: 'ashaks',
        link: `${this.RIVALS}/ashaks/home`,
      },
      {
        name: 'medias',
        link: `${this.RIVALS}/medias/stories`,
      },
      {
        name: 'rules',
        link: `${this.RIVALS}/gameplay/rules`,
      },
    ];
  }

  public logout(): void {
    this._authService.logout();
  }

  private fetchNotifications(): void {
    if (this.isAuthenticated()) {
      this.notifications.getUnreadNotifications$().pipe(take(1)).subscribe(notifications => {
        this.latestNotifications.set(notifications);
      });
    }
  }

  private initCountDown(): void {
    // Définissez la date cible
    const targetDate = new Date('12/12/2023 12:00 PM');

    // Mettez à jour le compte à rebours chaque seconde
    setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      // Calculez les jours, heures, minutes et secondes restants
      this.daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hoursLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutesLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
    }, 1000);
  }

  onClickLink(link: Link): void {
    if (link.name === 'ashaks') {
      this.store.dispatch(ashakUrl({ ashakUrl: 'home' }));
    }
    this.router.navigate([link.link]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goKS(): void {
    window.open('https://discord.com/invite/TaNkhRuBzS', '_blank');
  }

  private setLinks(url: string): void {
    if (url != null || url != undefined) {
      if (url.endsWith(this.RIVALS)) {
        const link = this.links.find(
          link => link.name === 'accueil' || link.name === 'medias'
        );
        link.name = 'medias';
        link.link = `${this.RIVALS}/medias/stories`;
      } else if (!url.endsWith(this.RIVALS)) {
        const link = this.links.find(
          link => link.name === 'medias' || link.name === 'accueil'
        );
        link.name = 'accueil';
        link.link = this.RIVALS;
      }
      // if (
      //   url.startsWith(`${this.RIVALS}/gameplay`) &&
      //   !url.endsWith('wildtech')
      // ) {
      //   const link = this.links.find(
      //     link => link.name === 'jeu' || link.name === 'gameplay'
      //   );
      //   link.name = 'wildtech';
      //   link.link = `${this.RIVALS}/gameplay/wildtech`;
      // } else if (url === `${this.RIVALS}/gameplay/wildtech`) {
      //   const link = this.links.find(
      //     link => link.name === 'wildtech' || link.name === 'jeu'
      //   );
      //   link.name = 'gameplay';
      //   link.link = `${this.RIVALS}/gameplay`;
      // }
    }
  }

  public goToNotification(notification: Notification): void {
    console.log(notification);
    this._notificationsService.markAsRead$(notification._id).subscribe();
    this.latestNotifications.update(notifications => notifications.filter(n => n._id !== notification._id));
    this.router.navigate(
      ['/admin/cartes'], 
      { 
        queryParams: { 
          cardId: notification.card._id,
          comment: true 
        } 
      }
    );
  }

  showModal(): void {
    this.switchModal = !this.switchModal;
    this.showLanguage.emit(this.switchModal);
  }

  openSidePanel(): void {
    this.switchPanel = !this.switchPanel;
    this.sidePanelOn.emit(this.switchPanel);
  }

  public goToSection(link: string): void {
    console.log(link);
  }
}
