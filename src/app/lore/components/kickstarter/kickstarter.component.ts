import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener } from '@angular/core';
import { map } from 'rxjs';

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
      name: 'Gameplay',
      element: '#gameplay',
    },
    {
      name: 'Vidéos',
      element: '#videos',
    },
    {
      name: 'Les Ashaks',
      element: '#ashaks',
    },
    {
      name: 'Contenu de la boite',
      element: '#contenu',
    },
    {
      name: 'Stretch Goals',
      element: '#stretch',
    },
    {
      name: 'Récompenses',
      element: '#recompense',
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
      text: 'La boite standard. Elle contient tout ce dont vous avez besoin pour jouer à Rivals. ',
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
      text: "Inclus la core box et d'autres trucs sympas.",
      composants: [
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
      path: 'legend_box_early',
      name: 'Early Bird legend',
      text: 'La boite standard. Elle contient tout ce dont vous avez besoin pour jouer à Rivals. ',
      composants: [
        {
          name: 'Composants de l\édition Deluxe',
        },
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
      price: 100,
    },
    {
      path: 'legend_box',
      name: 'legend',
      text: 'La boite standard. Elle contient tout ce dont vous avez besoin pour jouer à Rivals. ',
      composants: [
        {
          name: 'Composants de l\'édition Deluxe',
        },
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
