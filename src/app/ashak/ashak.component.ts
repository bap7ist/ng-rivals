import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fadeInOut } from '../animations/animations';
import { getAshak, getAshakUrl } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-ashak',
  templateUrl: './ashak.component.html',
  styleUrls: ['./ashak.component.scss'],
})
export class AshakComponent implements OnInit {
  theme$: Observable<string>;

  ashaks: Array<string>;

  selectedAshak$: Observable<string>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.theme$ = this.store.select(getAshak);
    this.initAshaks();
    this.selectedAshak$ = this.store.select(getAshakUrl);
  }

  initAshaks(): void {
    this.ashaks = ['qikaa', 'atmos', 'orus', 'xhan', 'renko', 'gyaleis'];
  }
}
