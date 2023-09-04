import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import {
  blurInOut,
  fadeInOut,
  letterSpacing,
  slideInRight,
} from 'src/app/animations/animations';
import { ashak } from 'src/app/shared/models/ashak';
import { AshakService } from 'src/app/shared/services/ashak.service';
import { ashakUrl } from 'src/app/store/actions/app.actions';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { __param } from 'tslib';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    blurInOut,
    slideInRight,
    fadeInOut,
    letterSpacing,
    trigger('trueFalseAnimation', [
      transition('false => true', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 })),
      ]),
      transition('true => false', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 })),
      ]),
    ]),
    trigger('opacitySlowTrue', [
      transition('false => true', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
      transition('true => false', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
    ]),
    trigger('blur', [
      transition('false => true', [
        style({ filter: 'blur(4px)' }),
        animate(700, style({ filter: 'blur(0px)' })),
      ]),
      transition('true => false', [
        style({ filter: 'blur(4px)' }),
        animate(700, style({ filter: 'blur(0px)' })),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  ashak: any;

  theme$: Observable<string>;

  animationSwitch: boolean;
  selectedAshak: ashak;
  skillActive: boolean;

  ashakNotFound: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ashaks = ['qikaa', 'atmos', 'xhan', 'orus', 'gyaleis', 'renko', 'yosh'];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private ashakService: AshakService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((param) => {
      this.ashak = Object.values(param).toString();
      this.store.dispatch(ashakUrl({ ashakUrl: this.ashak }));
      this.fetchAshakByName(this.ashak);
      this.animationSwitch = !this.animationSwitch;
      this.ashakNotFound = this.checkAshak();
      window.scrollTo({ top: 0 });
    });
    this.theme$ = this.store.select(getAshak);
  }

  fetchAshakByName(ashak: string): void {
    this.ashakService
      .fetchByName(ashak)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ashak) => {
        this.selectedAshak = ashak;
      });
  }

  checkAshak(): boolean {
    return this.ashaks.filter((ashak) => ashak === this.ashak).length === 0;
  }
}
