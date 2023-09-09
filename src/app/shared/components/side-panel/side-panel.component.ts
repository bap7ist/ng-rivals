import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  fadeInOutFast,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [slideInLeft, slideInRight, fadeInOutFast],
})
export class SidePanelComponent implements OnInit {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Output() closePanel = new EventEmitter();

  links: Array<any>;
  medias: Array<any>;
  showAshakChoice: boolean

  constructor(private router: Router) {}

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closePanel.emit();
  }

  ngOnInit(): void {
    this.links = [
      {
        name: 'menu.pages.home',
        url: '/rivals',
        margin: '5',
      },
      {
        name: 'menu.pages.ashaks',
        url: '/ashaks',
        margin: '4',
      },
      {
        name: 'menu.pages.boardgame',
        url: '/gameplay',
        margin: '3',
      },
      {
        name: 'menu.pages.medias',
        url: '/medias/stories',
        margin: '2',
      },
    ];
    this.medias = [
      {
        name: 'kickstarter',
        link: '',
        show: false,
      },
      {
        name: 'discord',
        link: '',
        show: false,
      },
      {
        name: 'instagram',
        link: '',
        show: false,
      },
      {
        name: 'facebook',
        link: '',
        show: false,
      },
      {
        name: 'youtube',
        link: '',
        show: false,
      },
    ];
  }

  goToLink(url: string): void {
    this.router.navigate([url]);
    this.closePanel.emit();
  }

  goToMedia(url: string): void {
    this.closePanel.emit();
  }

  onReturnFromAshakChoice(): void {
    setTimeout(() => {
      this.showAshakChoice = false
    }, 500)
  }
}
