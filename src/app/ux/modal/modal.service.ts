import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export type ModalResult = string | boolean | null;

export interface ModalButton {
  label: string;
  value: ModalResult;  // La valeur qui sera émise quand ce bouton est cliqué
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface ModalConfig {
  title: string;
  message: string;
  buttons?: ModalButton[];
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<{
    isOpen: boolean;
    config?: ModalConfig;
  }>({ isOpen: false });

  private modalResult = new Subject<ModalResult>();
  
  modalState$ = this.modalState.asObservable();

  public show$(config: ModalConfig): Observable<ModalResult> {
    this.modalState.next({ isOpen: true, config });
    return this.modalResult.asObservable();
  }

  public close(result: ModalResult = null) {
    this.modalState.next({ isOpen: false });
    this.modalResult.next(result);
    this.modalResult.complete();
    // Créer un nouveau Subject pour la prochaine modale
    this.modalResult = new Subject<ModalResult>();
  }
}
