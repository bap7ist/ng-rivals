import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HeightDirective } from '../directives/height.directive';
import { WidthDirective } from '../directives/width.directive';
import { LanguageSwitchComponent } from '../shared/components/language-switch/language-switch.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    WidthDirective,
    HeightDirective,
    LanguageSwitchComponent,
    TranslateModule,
    RouterModule,
    UpperCasePipe
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() showLanguage = new EventEmitter<boolean>();
  @Output() sidePanelOn = new EventEmitter<boolean>();
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Input() url$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;

  switchModal: boolean;
  switchPanel: boolean;
  links: Array<{ name: string; link: string; notUrl?: boolean }>;

  readonly RIVALS: string = '/rivals';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initCountDown();
    this.links = [
      {
        name: 'medias',
        link: `${this.RIVALS}/medias/stories`,
      },
      {
        name: 'gameplay',
        link: `${this.RIVALS}/gameplay`,
      },
      {
        name: 'ashaks',
        link: `${this.RIVALS}/ashaks/home`,
      },
    ];

    this.url$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(url => this.setLinks(url));
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goKS(): void {
    window.open('https://discord.com/invite/TaNkhRuBzS', '_blank');
  }

  public goToUnkind(): void {
    this.router.navigateByUrl('/ug');
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
