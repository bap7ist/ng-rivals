import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Button2Component } from 'src/app/shared/components/button-2/button-2.component';

interface Card {
  id: number;
  path: string;
}

@Component({
  selector: 'app-lore-2',
  imports: [NgClass, Button2Component, AsyncPipe, TranslateModule],
  templateUrl: './lore-2.component.html',
  styleUrl: './lore-2.component.scss',
})
export class Lore2Component implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  public isMobile = input<boolean>();

  isWideScreen$ = this.breakpointObserver
    .observe(['(min-width: 1900px)'])
    .pipe(map(result => result.matches));

  public cards: Card[] = [
    { id: 1, path: 'card_1.jpg' },
    { id: 2, path: 'card_2.jpg' },
    { id: 3, path: 'card_3.jpg' },
    { id: 4, path: 'card_4.jpg' },
    { id: 5, path: 'card_5.jpg' },
    { id: 6, path: 'card_6.jpg' },
    { id: 7, path: 'card_7.jpg' },
    { id: 8, path: 'card_8.jpg' },
    { id: 9, path: 'card_9.jpg' },
    { id: 10, path: 'card_10.jpg' },
    { id: 11, path: 'card_11.jpg' },
    { id: 12, path: 'card_12.jpg' },
    { id: 13, path: 'card_13.jpg' },
    { id: 14, path: 'card_14.jpg' },
    { id: 15, path: 'card_15.jpg' },
    { id: 16, path: 'card_16.jpg' },
    { id: 17, path: 'card_17.jpg' },
    { id: 18, path: 'card_18.jpg' },
    { id: 19, path: 'card_19.jpg' },
    { id: 20, path: 'card_20.jpg' },
    { id: 21, path: 'card_21.jpg' },
    { id: 22, path: 'card_22.jpg' },
    { id: 23, path: 'card_23.jpg' },
    { id: 24, path: 'card_24.jpg' },
    { id: 25, path: 'card_25.jpg' },
    { id: 26, path: 'card_35.jpg' },
    { id: 27, path: 'card_34.jpg' },
    { id: 28, path: 'card_32.jpg' },
    { id: 29, path: 'card_25.jpg' },
    { id: 30, path: 'card_30.jpg' },
    { id: 31, path: 'card_31.jpg' },
    { id: 32, path: 'card_33.jpg' },
    { id: 33, path: 'card_36.jpg' },
    { id: 34, path: 'card_36.jpg' },
    { id: 35, path: 'card_37.jpg' },
    { id: 36, path: 'card_38.jpg' },
    { id: 37, path: 'card_16.jpg' },
    { id: 38, path: 'card_16.jpg' },
    { id: 39, path: 'card_16.jpg' },
  ];

  public ngOnInit(): void {}
}
