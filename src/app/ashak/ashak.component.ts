import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { getAshak, getAshakUrl } from '../store/selectors/app.selectors';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { ashakUrl } from '../store/actions/app.actions';

@Component({
  selector: 'app-ashak',
  templateUrl: './ashak.component.html',
  styleUrls: ['./ashak.component.scss'],
  standalone: true,
  imports: [RouterLink, NgClass, RouterOutlet, AsyncPipe, TranslateModule],
})
export class AshakComponent implements OnInit {
  theme$: Observable<string>;
  ashaks: Array<string>;
  selectedAshak$: Observable<string>;

  showOptions: boolean;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  constructor(
    private store: Store,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.theme$ = this.store.select(getAshak);
    this.selectedAshak$ = this.store.select(getAshakUrl);
  }

  onRetourClick(): void {
    this.store.dispatch(ashakUrl({ ashakUrl: 'home' }));
  }
}
