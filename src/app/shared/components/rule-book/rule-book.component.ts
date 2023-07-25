import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-book',
  templateUrl: './rule-book.component.html',
  styleUrls: ['./rule-book.component.scss'],
})
export class RuleBookComponent implements OnInit {
  currentPageState: 'front' | 'back' = 'front';

  pages: Array<{
    id: number;
    imgPage1: string;
    imgPage2: string;
  }> = [
    {
      id: 0,
      imgPage1: '../../../../assets/img/rule_book/page1.png',
      imgPage2: '../../../../assets/img/rule_book/page2.png',
    },
    {
      id: 1,
      imgPage1: '../../../../assets/img/rule_book/page3.png',
      imgPage2: '../../../../assets/img/rule_book/page4.png',
    },
    {
      id: 2,
      imgPage1: '../../../../assets/img/rule_book/page5.png',
      imgPage2: '../../../../assets/img/rule_book/page6.png',
    },
    {
      id: 3,
      imgPage1: '../../../../assets/img/rule_book/page7.png',
      imgPage2: '../../../../assets/img/rule_book/page8.png',
    },
    {
      id: 4,
      imgPage1: '../../../../assets/img/rule_book/page9.png',
      imgPage2: '../../../../assets/img/rule_book/page10.png',
    },
    {
      id: 5,
      imgPage1: '../../../../assets/img/rule_book/page11.png',
      imgPage2: '../../../../assets/img/rule_book/page12.png',
    },
    {
      id: 6,
      imgPage1: '../../../../assets/img/rule_book/page13.png',
      imgPage2: '../../../../assets/img/rule_book/page14.png',
    },
    {
      id: 7,
      imgPage1: '../../../../assets/img/rule_book/page15.png',
      imgPage2: '../../../../assets/img/rule_book/page16.png',
    },
    {
      id: 8,
      imgPage1: '../../../../assets/img/rule_book/page17.png',
      imgPage2: '../../../../assets/img/rule_book/page18.png',
    },
    {
      id: 9,
      imgPage1: '../../../../assets/img/rule_book/page19.png',
      imgPage2: '../../../../assets/img/rule_book/page20.png',
    },
    {
      id: 19,
      imgPage1: '../../../../assets/img/rule_book/page21.png',
      imgPage2: '../../../../assets/img/rule_book/page22.png',
    },
  ];

  currentIndex = 0;

  isTransitioning: boolean = false;

  @Input() width: number;

  get height(): number {
    return this.width / 2.83;
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next(): void {
    if (this.currentIndex < this.pages.length - 1) {
      this.currentIndex++;
    }
  }

  ngOnInit() {}
}
