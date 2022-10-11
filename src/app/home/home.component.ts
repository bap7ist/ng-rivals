import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { take, tap } from 'rxjs';
import { getAshak } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ashak: string;

  actus = [
    {
      name: "utopiales",
      descriptif : "home.utopiales.descriptif",
    },
    {
      name: "arttoplay",
      descriptif : "home.arttoplay.descriptif"
    },
    {
      name: "affiches",
      descriptif: "home.affiches.descriptif"
    }
  ]

  constructor(private translate: TranslateService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(getAshak)
      .pipe(
        tap((ashak) => {
          this.ashak = ashak;
          console.log(ashak);
        })
      )
      .subscribe();
  }
}
