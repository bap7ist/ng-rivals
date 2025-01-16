import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { RouterOutlet } from '@angular/router';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.component.html',
  styleUrls: ['./lore.component.scss'],
  imports: [RouterOutlet],
})
export class LoreComponent implements OnInit {
  ashak$: Observable<string>;
  isLoading: boolean = true;

  private _seoService = inject(SeoService);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this._seoService.updateBoardGamePage({
      title: 'Histoire et Lore',
      description:
        "Découvrez l'univers riche de Rivals. Explorez l'histoire des Ashaks et les mystères qui entourent leur monde.",
      category: 'Game Lore',
    });
    this.ashak$ = this.store.select(getAshak);
  }
}
