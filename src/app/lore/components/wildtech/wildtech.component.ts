import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoreElementsService } from 'src/app/shared/services/lore-elements.service';
import { getAshak } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-wildtech',
  templateUrl: './wildtech.component.html',
  styleUrls: ['./wildtech.component.scss'],
})
export class WildtechComponent implements OnInit, OnDestroy {
  theme$: Observable<string>;

  elements: Array<any>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private elementService: LoreElementsService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.theme$ = this.store.select(getAshak);
    this.fetchElements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((elements) => (this.elements = elements));
  }

  fetchElements(): Observable<Array<any>> {
    return this.elementService.fetchByName('wildtech');
  }
}
