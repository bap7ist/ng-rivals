import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInFast, slideInLeft, slideInRight } from 'src/app/animations/animations';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [slideInLeft, slideInRight]

})
export class SidePanelComponent implements OnInit {

  @Input() ashak: string;
  @Output() closePanel = new EventEmitter()

  links : Array<any>
  medias: Array<any>

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.links = [
      {
        name: 'menu.pages.home',
        url: '/',
        margin: '5',
      },
      {
        name: 'menu.pages.ashaks',
        url: '/ashak',
        margin: '4',
      },
      {
        name: 'menu.pages.boardgame',
        url: '/boardgame',
        margin: '3',
      }
    ]
    this.medias = [
      {
        name:"kickstarter",
        link: '',
        show: false
      },
      {
        name:"discord",
        link: '',
        show: false
      },
      {
        name:"instagram",
        link: '',
        show: false
      },
      {
        name:"facebook",
        link: '',
        show: false
      },
      {
        name:"youtube",
        link: '',
        show: false
      }
    ]
  }

  goToLink(url: string): void {
    this.router.navigate([url])
    this.closePanel.emit()
  }

  goToMedia(url: string):void {
    this.closePanel.emit()
  }

}
