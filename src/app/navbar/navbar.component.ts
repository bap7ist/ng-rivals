import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { navigation } from '../store/actions/app.actions';
import { getNavigation } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Output() showLanguage = new EventEmitter<boolean>();
  @Output() sidePanelOn = new EventEmitter<boolean>();
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Input() url$: Observable<string>;

  switchModal: boolean;
  switchPanel: boolean;
  links: Array<{ name: string; link: string; notUrl?: boolean }>;

  constructor(private store: Store) {}

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
  }

  goKS(): void {
    window.open('https://www.kickstarter.com/projects/unkind-games/rivals', '_blank');
  }

  ngAfterViewInit(): void {
    this.url$.subscribe((url) => this.setLinks(url));
  }

  // goToSection(target: string): void {
  //   this.store.dispatch(navigation({ navigation: target }));
  //   if (target !== 'accueil') {
  //     let link = this.links.find((link) => link.name === target);
  //     link.name = 'accueil';
  //     link.link = 'accueil';
  //   } else {
  //     let link = this.links.find((link) => link.name === target);
  //     link.name = 'histoire';
  //     link.link = 'histoire';
  //     link.notUrl = true;
  //   }
  // }

  private setLinks(url: string): void {
    if (url != null || url != undefined) {
      if (url !== '/') {
        const link2 = this.links.find(
          (link) => link.name === 'medias' || link.name === 'accueil'
        );
        link2.name = 'accueil';
        link2.link = '/';
        link2.notUrl = false;
      }
      if (url.startsWith('/gameplay') && !url.endsWith('wildtech')) {
        const link = this.links.find(
          (link) => link.name === 'jeu' || link.name === 'gameplay'
        );
        link.name = 'wildtech';
        link.link = '#/gameplay/wildtech';
      } else if (url === '/gameplay/wildtech') {
        const link = this.links.find(
          (link) => link.name === 'wildtech' || link.name === 'jeu'
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
