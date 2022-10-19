import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fadeIn, fadeInOut, slideInLeft } from 'src/app/animations/animations';

@Component({
  selector: 'app-battleroyale',
  templateUrl: './battleroyale.component.html',
  styleUrls: ['./battleroyale.component.scss'],
  animations: [slideInLeft]
})
export class BattleroyaleComponent implements OnInit {

  tiles : Array<any>
  scroll$ : Observable<number>
  
  @Input() ashak: string

  constructor() { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
  }

  ngOnInit(): void {
    this.tiles = [
      {
        x: '0%',
        y: '-10%',
        id: '1',
        face: false,
        hover: false
      },
      {
        x: '14.9%',
        y: '-10%',
        id: '2',
        face: false,
        hover: false
      },
      {
        x: '29.8%',
        y: '-10%',
        id: '3',
        face: false,
        hover: false
      },
      {
        x: '3.7%',
        y: '2.8%',
        id: '4',
        spin: true,
        face: false,
        hover: false
      },
      {
        x: '18.6%',
        y: '2.8%',
        id: '5',
        spin: true,
        face: false,
        hover: false
      },
      {
        x: '33.5%',
        y: '2.8%',
        id: '6',
        spin: true,
        face: true,
        hover: false
      },
      {
        x: '11.1%',
        y: '9.3%',
        id: '7',
        face: false,
        hover: false
      },
      {
        x: '26%',
        y: '9.3%',
        id: '8',
        face: false,
        hover: false
      },
    ]
  }

}
