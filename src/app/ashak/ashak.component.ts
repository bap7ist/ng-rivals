import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { getAshak, getAshakUrl } from '../store/selectors/app.selectors';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { ashakUrl } from '../store/actions/app.actions';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-ashak',
  templateUrl: './ashak.component.html',
  styleUrls: ['./ashak.component.scss'],
  imports: [NgClass, RouterOutlet, AsyncPipe, TranslateModule],
})
export class AshakComponent implements OnInit {
  theme$: Observable<string>;
  ashaks: Array<string>;
  selectedAshak$: Observable<string>;

  showOptions: boolean;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  private _seoService = inject(SeoService);

  constructor(
    private store: Store,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.theme$ = this.store.select(getAshak);
    this.selectedAshak$ = this.store.select(getAshakUrl);

    this._seoService.updateBoardGamePage({
      title: 'Ashaks',
      description: 'Choose your Ashak and start your journey in the WildTech',
      gameImage: 'assets/images/game-cover.jpg',
      category: 'Characters',
    });
  }

  onRetourClick(): void {
    this.store.dispatch(ashakUrl({ ashakUrl: 'home' }));
  }
}
