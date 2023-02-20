import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoreElementsService } from 'src/app/shared/services/lore-elements.service';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-wildtech',
  templateUrl: './wildtech.component.html',
  styleUrls: ['./wildtech.component.scss'],
})
export class WildtechComponent implements OnInit {
  theme$: Observable<string>;

  elements: Array<any>;

  constructor(
    private store: Store,
    private elementService: LoreElementsService
  ) {}

  ngOnInit(): void {
    this.theme$ = this.store.select(getAshak);
    this.fetchElements().subscribe((elements) => (this.elements = elements));
  }

  fetchElements(): Observable<Array<any>> {
    return this.elementService.fetchByName('wildtech');
  }
}
