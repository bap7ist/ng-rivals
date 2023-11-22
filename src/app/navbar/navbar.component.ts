import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() showLanguage = new EventEmitter<boolean>();
  @Output() sidePanelOn = new EventEmitter<boolean>();
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Input() url$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  switchModal: boolean;
  switchPanel: boolean;
  links: Array<{ name: string; link: string; notUrl?: boolean }>;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.links = [
      {
        name: 'medias',
        link: '#/medias/stories',
      },
      {
        name: 'jeu',
        link: '#/gameplay',
      },
      {
        name: 'ashaks',
        link: '#/ashaks/home',
      },
    ];

    this.url$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(url => this.setLinks(url));
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
      console.log('url : ', url);
      if (url === '/rivals' || url === '/') {
        const link = this.links.find(
          link => link.name === 'accueil' || link.name === 'medias'
        );

        link.name = 'medias';
        link.link = '#/medias/stories';
      } else if (url !== '/rivals') {
        const link2 = this.links.find(
          link => link.name === 'medias' || link.name === 'accueil'
        );
        link2.name = 'accueil';
        link2.link = '#/rivals';
        link2.notUrl = false;
      }
      if (url.startsWith('/gameplay') && !url.endsWith('wildtech')) {
        const link = this.links.find(
          link => link.name === 'jeu' || link.name === 'gameplay'
        );
        link.name = 'wildtech';
        link.link = '#/gameplay/wildtech';
      } else if (url === '/gameplay/wildtech') {
        const link = this.links.find(
          link => link.name === 'wildtech' || link.name === 'jeu'
        );
        link.name = 'gameplay';
        link.link = '#/gameplay/ashak-board';
      }
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
}
