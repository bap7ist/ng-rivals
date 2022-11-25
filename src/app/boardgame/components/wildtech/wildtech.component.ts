import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  fadeInOut,
  fadeInOutFast,
  slideInLeft,
} from 'src/app/animations/animations';
import { tile } from 'src/app/shared/models/tile';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-wildtech',
  templateUrl: './wildtech.component.html',
  styleUrls: ['./wildtech.component.scss'],
  animations: [fadeInOut, slideInLeft, fadeInOutFast],
})
export class WildtechComponent implements OnInit {
  ashak$: Observable<string>;

  centerShow: boolean;
  textShow: boolean;
  grabToken: boolean;
  tileDetails: {
    resources: any;
    position: {
      x: number;
      y: number;
    };
  };
  init: number;
  showDetails: boolean;

  tiles: Array<tile>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak);
    this.init = 0;
    this.initWildTech();
    this.initTiles();
    this.showTile();
  }

  initWildTech(): void {
    setTimeout(() => {
      this.init = 1;
      // this.step1();
    }, 2400);
  }

  // step1(): void {
  //   setInterval(() => {
  //     this.tiles[2].hover = !this.tiles[2].hover;
  //   }, 800);
  // }

  showTile(): void {
    setTimeout(() => {
      this.centerShow = true;
    }, 1000);
    setTimeout(() => {
      this.textShow = true;
    }, 1500);
    this.tiles.forEach((tile) => {
      setTimeout(() => {
        tile.show = true;
      }, tile.time);
    });
  }

  initTiles(): void {
    this.tiles = [
      {
        id: '1',
        x: 0,
        y: 5,
        flipped: false,
        spinned: false,
        line: false,
        show: false,
        time: 100,
        hover: false,
        resources: {
          crystal: true,
          resine: true,
          observatory: true,
          volcano: false,
          lake: false,
          interface: false,
        },
      },
      {
        id: '2',
        x: 16.3,
        y: 5,
        flipped: true,
        show: false,
        spinned: false,
        line: false,
        time: 200,
        hover: false,
        resources: {
          resine: true,
          interface: true,
          volcano: true,
          lake: false,
          observatory: false,
          crystal: false,
        },
      },
      {
        id: '3',
        x: 32.6,
        y: 5,
        flipped: false,
        show: false,
        time: 300,
        spinned: false,
        line: false,
        hover: false,
        resources: {
          resine: true,
          crystal: true,
          interface: true,
          observatory: false,
          lake: false,
          volcano: false,
        },
      },
      {
        id: '4',
        x: 8.15,
        y: -2.2,
        flipped: true,
        spinned: true,
        line: false,
        show: false,
        time: 400,
        hover: false,
        resources: {
          volcano: false,
          crystal: false,
          interface: false,
          resine: true,
          observatory: true,
          lake: true,
        },
      },
      {
        id: '5',
        x: 24.5,
        y: -2.2,
        flipped: true,
        spinned: true,
        line: false,
        show: false,
        time: 500,
        hover: false,
        resources: {
          crystal: false,
          lake: false,
          volcano: false,
          resine: true,
          observatory: true,
          interface: true,
        },
      },
      {
        id: '6',
        x: 40.9,
        y: -2.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 600,
        hover: false,
        resources: {
          lake: false,
          observatory: false,
          interface: false,
          resine: true,
          crystal: true,
          volcano: true,
        },
      },
      {
        id: '7',
        x: 49,
        y: 5,
        flipped: false,
        show: false,
        line: false,
        spinned: false,
        time: 700,
        hover: false,
        resources: {
          resine: false,
          volcano: false,
          lake: false,
          crystal: true,
          observatory: true,
          interface: true,
        },
      },
      {
        id: '8',
        x: 8.1,
        y: 33.4,
        flipped: false,
        show: false,
        spinned: false,
        line: false,
        time: 800,
        hover: false,
        resources: {
          resine: false,
          volcano: false,
          observatory: false,
          crystal: true,
          interface: true,
          lake: true,
        },
      },
      {
        id: '9',
        x: -20.7,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 900,
        hover: false,
        resources: {
          crystal: false,
          resine: false,
          observatory: false,
          volcano: false,
          lake: false,
          interface: false,
        },
      },
      {
        id: '10',
        x: 0.1,
        y: 26.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 1000,
        hover: false,
        resources: {
          resine: false,
          lake: false,
          volcano: false,
          crystal: true,
          interface: true,
          observatory: true,
        },
      },
      {
        id: '11',
        x: 16.3,
        y: 26.2,
        flipped: false,
        spinned: true,
        line: false,
        show: false,
        time: 1100,
        hover: false,
        resources: {
          volcano: false,
          observatory: false,
          interface: false,
          resine: true,
          crystal: true,
          lake: true,
        },
      },
      {
        id: '12',
        x: 32.6,
        y: 26.2,
        flipped: false,
        spinned: true,
        show: false,
        line: false,
        time: 1200,
        hover: false,
        resources: {
          observatory: false,
          lake: false,
          volcano: false,
          resine: true,
          crystal: true,
          interface: true,
        },
      },
      {
        id: '13',
        x: 3.9,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 1300,
        hover: false,
        resources: {
          crystal: false,
          observatory: false,
          volcano: false,
          resine: true,
          interface: true,
          lake: true,
        },
      },
      {
        id: '14',
        x: 36.6,
        y: 19.1,
        flipped: false,
        line: true,
        spinned: false,
        show: false,
        time: 1400,
        hover: false,
        resources: {
          crystal: false,
          observatory: false,
          lake: false,
          resine: true,
          interface: true,
          volcano: true,
        },
      },
      {
        id: '15',
        x: 24.4,
        y: 33.4,
        flipped: false,
        show: false,
        line: false,
        spinned: false,
        time: 1500,
        hover: false,
        resources: {
          resine: false,
          volcano: false,
          lake: false,
          crystal: true,
          interface: true,
          observatory: true,
        },
      },
    ];
  }

  goBack(): void {
    this.router.navigate(['/gameplay/ashak-board']);
  }

  tileClick(tile: any) {
    if (tile.flipped) {
      this.tileDetails = {
        resources: tile.resources,
        position: {
          x: tile.x + 17,
          y: tile.y + 5,
        },
      };
      this.showDetails = true;
    } else {
      tile.flipped = true;
      this.showDetails = false;
    }
  }
}
