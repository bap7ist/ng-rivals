import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.component.html',
  styleUrls: ['./lore.component.scss'],
})
export class LoreComponent implements OnInit {
  ashak$: Observable<string>;
  isLoading: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ashak$ = this.store.select(getAshak);
  }

}
