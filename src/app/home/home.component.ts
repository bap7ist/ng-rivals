import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take, tap } from 'rxjs';
import { fadeInFast, fadeInOut } from '../animations/animations';
import { getAshak } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
  ashak$: Observable<string>;
  loading: boolean
  actuIsHover : string

  actus = [
    {
      id: "utopiales",
      factor : -1,
      name: "home.actu.utopiales.title",
      descriptif : "home.actu.utopiales.descriptif",
      date : "home.actu.utopiales.date",
      url: "https://www.utopiales.org/"
    },
    {
      id : "arttoplay",
      factor : 100,
      name: "home.actu.arttoplay.title",
      descriptif : "home.actu.arttoplay.descriptif",
      date : "home.actu.arttoplay.date",
      url: "https://www.art-to-play.fr/"
    },
    {
      id : "affiches",
      factor : 1,
      name: "home.actu.affiches.title",
      descriptif: "home.actu.affiches.descriptif",
      url: "/"
    }
  ]

  constructor(private translate: TranslateService, private store: Store) {}

  ngOnInit(): void {
      this.loading = true
      this.ashak$ = this.store.select(getAshak)
  }

  onReturnFromLoader(): void {
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onMouseEnter(actuName: string):void {
    this.actuIsHover = actuName
  }

  onMouseLeave(): void {
    this.actuIsHover = ''
  }
}
