import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { social } from '../../models/social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  socials: Array<social>;

  ashak$: Observable<string>

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak)
    this.fetchSocialMedia().subscribe((socials) => {
      this.socials = socials
    })
  }

  fetchSocialMedia(): Observable<Array<social>> {
    return this.http.get('assets/data/socials.json') as Observable<Array<social>>;
  }
}
