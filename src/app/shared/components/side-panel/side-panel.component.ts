import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  fadeInOutFast,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { social } from '../../models/social';
import { TranslateModule } from '@ngx-translate/core';
import { AshakChoiceComponent } from '../ashak-choice/ashak-choice.component';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
    animations: [slideInLeft, slideInRight, fadeInOutFast],
    standalone: true,
    imports: [AshakChoiceComponent, TranslateModule],
})
export class SidePanelComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Output() closePanel = new EventEmitter();

  links: Array<any>;
  medias: Array<social>;
  showAshakChoice: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private http: HttpClient) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
    this.http
      .get<Array<social>>('assets/data/socials.json')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((socials) => {
        this.medias = socials;
        socials.map((social) => {
          social.show = false;
        });
      });
  }

  goToLink(url: string): void {
    this.router.navigate([url]);
    this.closePanel.emit();
  }

  goToMedia(url: string): void {
    window.open(url, '_blank')
    this.closePanel.emit();
  }

  onReturnFromAshakChoice(): void {
    setTimeout(() => {
      this.showAshakChoice = false;
    }, 500);
  }
}
