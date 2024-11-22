import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  private isActiveSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isActive$: Observable<boolean> = this.isActiveSubject.asObservable();

  constructor() {}

  setBoutiquePanel(value: boolean): void {
    this.isActiveSubject.next(value);
  }

  getBoutiquePanelPosition(): boolean {
    return this.isActiveSubject.getValue();
  }
}
