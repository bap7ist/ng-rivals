import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { fadeInOut, slideInBottomSlow, slideInRight } from 'src/app/animations/animations';
import { ashak } from 'src/app/shared/models/ashak';
import { AshakService } from 'src/app/shared/services/ashak.service';
import { ashakUrl } from 'src/app/store/actions/app.actions';
import { __param } from 'tslib';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    slideInBottomSlow,
    fadeInOut,
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
export class HeroComponent implements OnInit {
  ashak: any;

  animationSwitch: boolean;
  selectedAshak: ashak;
  showPass: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private ashakService: AshakService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.ashak = Object.values(param).toString();
      this.store.dispatch(ashakUrl({ ashakUrl: this.ashak }));
      this.fetchAshakByName(this.ashak);
      this.animationSwitch = !this.animationSwitch;
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        this.showPass = true;
      }, 1300);
    });
  }

  fetchAshakByName(ashak: string): void {
    this.ashakService.fetchByName(ashak).subscribe((ashak) => {
      this.selectedAshak = ashak;
    });
  }
}
