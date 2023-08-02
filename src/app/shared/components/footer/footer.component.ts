import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { social } from '../../models/social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  socials: Array<social>;

  ashak$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak);
    this.fetchSocialMedia()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((socials) => {
        this.socials = socials;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchSocialMedia(): Observable<Array<social>> {
    return this.http.get('assets/data/socials.json') as Observable<
      Array<social>
    >;
  }
}
