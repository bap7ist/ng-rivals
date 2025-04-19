import { Component, computed, effect, input, signal } from '@angular/core';
import {
  fadeInOutExtraFast,
  slideInRight,
  slideInTopFast,
  slideInTopSlow,
} from 'src/app/animations/animations';

interface Resource {
  crystal: number;
  resin: number;
  cards: number;
}

@Component({
  selector: 'app-recolte',
  imports: [],
  templateUrl: './recolte.component.html',
  styleUrl: './recolte.component.scss',
  animations: [fadeInOutExtraFast, slideInRight, slideInTopFast],
})
export class RecolteComponent {
  public tileHover = false;

  public resources = signal<Resource>({ crystal: 0, resin: 0, cards: 0 });

  public isTileClicked = signal(false);

  public dryOut = signal(false);

  public constructor() {
    effect(() => {
      if (this.isTileClicked()) {
        setTimeout(() => {
          this.isTileClicked.set(false);
          this.dryOut.set(false);
        }, 4000);
        setTimeout(() => {
          this.dryOut.set(true);
        }, 2000)
      }
    });
  }

  public tileClick(tile: number) {
    if (this.isTileClicked()) {
      return;
    }
    this.isTileClicked.set(true);
    switch (tile) {
      case 1:
        this.resources.set({
          crystal: 1,
          cards: 4,
          resin: 1,
        });
        break;
      case 2:
        this.resources.set({
          crystal: 3,
          cards: 2,
          resin: 1,
        });
        break;
      case 3:
        this.resources.set({
          crystal: 1,
          cards: 2,
          resin: 3,
        });
        break;
    }
  }
}
