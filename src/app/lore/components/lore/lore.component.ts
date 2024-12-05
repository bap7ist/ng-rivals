import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-lore',
    templateUrl: './lore.component.html',
    styleUrls: ['./lore.component.scss'],
    imports: [RouterOutlet]
})
export class LoreComponent implements OnInit {
  ashak$: Observable<string>;
  isLoading: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak);
  }

}
