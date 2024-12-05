import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener } from '@angular/core';
import { map } from 'rxjs';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { AsyncPipe } from '@angular/common';
import { HeightDirective } from '../../../directives/height.directive';
import { WidthDirective } from '../../../directives/width.directive';

interface pledge {
  path: string;
  name: string;
  text: string;
  composants: Array<{ name: string }>;
  price: number;
}
[];

@Component({
    selector: 'app-kickstarter',
    templateUrl: './kickstarter.component.html',
    styleUrls: ['./kickstarter.component.scss'],
    imports: [
        WidthDirective,
        HeightDirective,
        AsyncPipe,
        TruncatePipe,
    ]
})
export class KickstarterComponent {
  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.showPledge = false;
    }
  }

  chapters = [
    {
      name: 'Intro',
      element: '#intro',
    },

    {
      name: 'Récompenses',
      element: '#recompense',
    },
    {
      name: 'Gameplay',
      element: '#gameplay',
    },
    {
      name: 'Vidéos',
      element: '#videos',
    },
    {
      name: 'Contenu de la boite',
      element: '#contenu',
    },
    {
      name: 'Livraison',
      element: '#shipping',
    },
    {
      name: 'Stretch Goals',
      element: '#stretch',
    },
    {
      name: 'Les Ashaks',
      element: '#ashaks',
    },
    {
      name: 'Photos',
      element: '#photos',
    },
    {
      name: "L'Univers",
      element: '#univers',
    },
    {
      name: 'Qui sommes-nous ?',
      element: '#nous',
    },
  ];

  pledges: Array<pledge> = [
    {
      path: 'core_box',
      name: 'core box',
      text: "La boîte standard. Tout ce dont vous avez besoin pour jouer à Rivals et en profiter. C'est parfait si vous voulez simplement voir ce que le jeu a à offrir. De quoi profiter de Rivals à 2 à 6 joueurs.",
      composants: [
        {
          name: 'Tous les stretch goals débloqués',
        },
      ],
      price: 50,
    },
    {
      path: 'deluxe_box',
      name: 'deluxe edition',
      text: "L'édition de luxe est destinée aux joueurs recherchant un confort de jeu amélioré et de l'exclusivité.",
      composants: [
        {
          name: 'Tous les composants Core Box',
        },
        {
          name: 'Tous les stretch goals débloqués',
        },
        {
          name: '250 protèges-cartes avec illustration KSE',
        },
        {
          name: 'Tapis de jeu Wildtech KSE',
        },
      ],
      price: 80,
    },
    {
      path: 'legend_box',
      name: 'legend',
      text: 'Une boîte exlusive Kickstarter. Le meilleur de la qualité avec des tuiles acryliques.',
      composants: [
        { name: 'Tous les composants Deluxe' },
        {
          name: 'Tous les stretch goals débloqués',
        },
        {
          name: 'Plateau Interface',
        },
        {
          name: 'Plateau Schéma',
        },
        {
          name: 'Boite exclusive',
        },
        {
          name: 'Tuiles Acryliques',
        },
      ],
      price: 120,
    },
  ];

  showPledge: boolean;
  selectedPledge: pledge;

  constructor(
    private elementRef: ElementRef,
    private observer: BreakpointObserver
  ) {}

  public scrollToElement(el: string) {
    const element = this.elementRef.nativeElement.querySelector(el);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public ashakGo(ashak: string): void {
    const url = `#/ashaks/${ashak}`;
    window.open(url, '_blank');
  }

  public openPledge(pledge: pledge): void {
    this.showPledge = true;
    this.selectedPledge = pledge;
  }
}
