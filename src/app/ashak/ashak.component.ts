import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { getAshak, getAshakUrl } from '../store/selectors/app.selectors';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ashak',
  templateUrl: './ashak.component.html',
  styleUrls: ['./ashak.component.scss'],
})
export class AshakComponent implements OnInit {
  theme$: Observable<string>;
  ashaks: Array<string>;
  selectedAshak$: Observable<string>;

  showOptions: boolean;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  constructor(
    private store: Store,
    private observer: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.theme$ = this.store.select(getAshak);
    this.initAshaks();
    this.selectedAshak$ = this.store.select(getAshakUrl);
  }

  public openOptions(): void {
    this.showOptions = !this.showOptions;
  }

  initAshaks(): void {
    this.ashaks = [
      'qikaa',
      'atmos',
      'gyaleis',
      'renko',
      'orus',
      'yosh',
      'xhan',
    ];
  }
}
